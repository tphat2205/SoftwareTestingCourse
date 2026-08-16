#!/usr/bin/env python3
"""
JTL Log Analyzer — Performance Test Results Analysis Tool
=========================================================
Reads JMeter .jtl log files (CSV format) and computes performance metrics.

Usage:
    python analyze_jtl.py <path_to_jtl_file> [options]

Options:
    --output    Output format: markdown (default), json, csv
    --chart     Generate response time chart (requires matplotlib)
    --baseline  Path to baseline JSON file for regression check
    --threshold Regression threshold factor (default: 1.2 = 20%)
    --skip-pct  Skip first N% of data as warm-up (default: 0)

Examples:
    python analyze_jtl.py results/load_results.jtl
    python analyze_jtl.py results/load_results.jtl --output json --chart
    python analyze_jtl.py results/load_results.jtl --baseline baselines/load.json --threshold 1.2
"""

import argparse
import json
import sys
import os
from datetime import datetime

try:
    import pandas as pd
    import numpy as np
except ImportError:
    print("ERROR: pandas and numpy are required. Install with: pip install pandas numpy")
    sys.exit(1)


def load_jtl(filepath, skip_pct=0):
    """Load and parse a JTL file."""
    if not os.path.exists(filepath):
        print(f"ERROR: File not found: {filepath}")
        sys.exit(1)

    df = pd.read_csv(filepath)

    # Normalize column names (some JTL versions use different casing)
    df.columns = df.columns.str.strip()

    # Convert success column to boolean
    if 'success' in df.columns:
        df['success'] = df['success'].astype(str).str.lower() == 'true'

    # Skip warm-up data if specified
    if skip_pct > 0:
        skip_count = int(len(df) * skip_pct / 100)
        df = df.iloc[skip_count:].reset_index(drop=True)
        print(f"Skipped first {skip_count} rows ({skip_pct}%) as warm-up data.")

    return df


def compute_metrics(df):
    """Compute all performance metrics from the dataframe."""
    metrics = {}

    # --- Response Time Metrics ---
    elapsed = df['elapsed']
    metrics['response_time'] = {
        'avg': round(elapsed.mean(), 2),
        'median_p50': round(elapsed.median(), 2),
        'p90': round(elapsed.quantile(0.90), 2),
        'p95': round(elapsed.quantile(0.95), 2),
        'p99': round(elapsed.quantile(0.99), 2),
        'min': int(elapsed.min()),
        'max': int(elapsed.max()),
        'std_dev': round(elapsed.std(), 2),
    }

    # --- Throughput ---
    if 'timeStamp' in df.columns:
        duration_ms = df['timeStamp'].max() - df['timeStamp'].min()
        duration_sec = duration_ms / 1000 if duration_ms > 0 else 1
        metrics['throughput'] = {
            'total_requests': len(df),
            'duration_sec': round(duration_sec, 2),
            'requests_per_sec': round(len(df) / duration_sec, 2),
        }
    else:
        metrics['throughput'] = {
            'total_requests': len(df),
            'duration_sec': None,
            'requests_per_sec': None,
        }

    # --- Error Rate ---
    if 'success' in df.columns:
        error_count = df[~df['success']].shape[0]
        success_count = df[df['success']].shape[0]
        metrics['errors'] = {
            'total_errors': int(error_count),
            'total_success': int(success_count),
            'error_rate_pct': round(error_count / len(df) * 100, 2) if len(df) > 0 else 0,
        }
    else:
        metrics['errors'] = {'total_errors': 0, 'total_success': len(df), 'error_rate_pct': 0}

    # --- Error Breakdown by Response Code ---
    if 'responseCode' in df.columns and 'success' in df.columns:
        error_df = df[~df['success']]
        if len(error_df) > 0:
            breakdown = error_df.groupby('responseCode').size().to_dict()
            metrics['error_breakdown'] = {str(k): int(v) for k, v in breakdown.items()}
        else:
            metrics['error_breakdown'] = {}
    else:
        metrics['error_breakdown'] = {}

    # --- Bandwidth ---
    if 'bytes' in df.columns and metrics['throughput']['duration_sec']:
        total_bytes = df['bytes'].sum()
        metrics['bandwidth'] = {
            'total_bytes': int(total_bytes),
            'total_kb': round(total_bytes / 1024, 2),
            'kb_per_sec': round((total_bytes / 1024) / metrics['throughput']['duration_sec'], 2),
        }
    else:
        metrics['bandwidth'] = {'total_bytes': 0, 'total_kb': 0, 'kb_per_sec': 0}

    # --- Latency (if available) ---
    if 'Latency' in df.columns:
        latency = df['Latency']
        metrics['latency'] = {
            'avg': round(latency.mean(), 2),
            'p95': round(latency.quantile(0.95), 2),
            'max': int(latency.max()),
        }
    else:
        metrics['latency'] = None

    # --- Connect Time (if available) ---
    if 'Connect' in df.columns:
        connect = df['Connect']
        metrics['connect_time'] = {
            'avg': round(connect.mean(), 2),
            'max': int(connect.max()),
        }
    else:
        metrics['connect_time'] = None

    # --- Concurrent Users Over Time ---
    if 'allThreads' in df.columns:
        metrics['concurrency'] = {
            'max_threads': int(df['allThreads'].max()),
            'avg_threads': round(df['allThreads'].mean(), 2),
        }
    else:
        metrics['concurrency'] = None

    return metrics


def compute_time_series(df, window_sec=10):
    """Compute metrics over time windows."""
    if 'timeStamp' not in df.columns:
        return None

    start_ts = df['timeStamp'].min()
    df = df.copy()
    df['time_window'] = ((df['timeStamp'] - start_ts) // (window_sec * 1000)) * window_sec

    series = df.groupby('time_window').agg(
        avg_response=('elapsed', 'mean'),
        p95_response=('elapsed', lambda x: x.quantile(0.95)),
        request_count=('elapsed', 'count'),
        error_count=('success', lambda x: (~x).sum()),
    ).reset_index()

    series['error_rate'] = series['error_count'] / series['request_count'] * 100
    series['rps'] = series['request_count'] / window_sec

    return series.round(2).to_dict('records')


def format_markdown(metrics, filepath, time_series=None):
    """Format metrics as a Markdown report."""
    rt = metrics['response_time']
    tp = metrics['throughput']
    er = metrics['errors']
    bw = metrics['bandwidth']

    lines = [
        f"## Performance Analysis: `{os.path.basename(filepath)}`",
        f"",
        f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"",
        f"### Summary",
        f"",
        f"| Metric | Value |",
        f"|--------|-------|",
        f"| Total Requests | {tp['total_requests']:,} |",
        f"| Duration | {tp['duration_sec']}s |",
        f"| Throughput | {tp['requests_per_sec']} req/s |",
        f"| Error Rate | {er['error_rate_pct']}% ({er['total_errors']:,} errors) |",
        f"| Bandwidth | {bw['kb_per_sec']} KB/s |",
        f"",
        f"### Response Time (ms)",
        f"",
        f"| Metric | Value |",
        f"|--------|-------|",
        f"| Average | {rt['avg']}ms |",
        f"| Median (P50) | {rt['median_p50']}ms |",
        f"| P90 | {rt['p90']}ms |",
        f"| P95 | {rt['p95']}ms |",
        f"| P99 | {rt['p99']}ms |",
        f"| Min | {rt['min']}ms |",
        f"| Max | {rt['max']}ms |",
        f"| Std Dev | {rt['std_dev']}ms |",
    ]

    if metrics.get('latency'):
        lat = metrics['latency']
        lines.extend([
            f"",
            f"### Latency (ms)",
            f"",
            f"| Metric | Value |",
            f"|--------|-------|",
            f"| Average | {lat['avg']}ms |",
            f"| P95 | {lat['p95']}ms |",
            f"| Max | {lat['max']}ms |",
        ])

    if metrics.get('concurrency'):
        cc = metrics['concurrency']
        lines.extend([
            f"",
            f"### Concurrency",
            f"",
            f"| Metric | Value |",
            f"|--------|-------|",
            f"| Max Active Threads | {cc['max_threads']} |",
            f"| Avg Active Threads | {cc['avg_threads']} |",
        ])

    if metrics['error_breakdown']:
        lines.extend([
            f"",
            f"### Error Breakdown",
            f"",
            f"| Response Code | Count |",
            f"|--------------|-------|",
        ])
        for code, count in sorted(metrics['error_breakdown'].items()):
            lines.append(f"| {code} | {count:,} |")

    return "\n".join(lines)


def check_regression(metrics, baseline_path, threshold_factor=1.2):
    """Check for p95 regression against baseline."""
    if not os.path.exists(baseline_path):
        print(f"WARNING: Baseline file not found: {baseline_path}")
        return None

    with open(baseline_path, 'r') as f:
        baseline = json.load(f)

    current_p95 = metrics['response_time']['p95']
    baseline_p95 = baseline.get('response_time', {}).get('p95', 0)

    if baseline_p95 == 0:
        print("WARNING: Baseline p95 is 0, skipping regression check.")
        return None

    threshold = baseline_p95 * threshold_factor
    is_regression = current_p95 > threshold
    deviation_pct = ((current_p95 - baseline_p95) / baseline_p95) * 100

    result = {
        'current_p95': current_p95,
        'baseline_p95': baseline_p95,
        'threshold': round(threshold, 2),
        'threshold_factor': threshold_factor,
        'is_regression': is_regression,
        'deviation_pct': round(deviation_pct, 2),
    }

    if is_regression:
        print(f"⚠️  REGRESSION DETECTED: p95 = {current_p95}ms (baseline: {baseline_p95}ms, "
              f"threshold: {threshold}ms, deviation: +{deviation_pct:.1f}%)")
    else:
        print(f"✅ Performance OK: p95 = {current_p95}ms (baseline: {baseline_p95}ms, "
              f"threshold: {threshold}ms, deviation: {deviation_pct:+.1f}%)")

    return result


def generate_chart(df, output_path='response_time_chart.png'):
    """Generate a response time over time chart."""
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
    except ImportError:
        print("WARNING: matplotlib not installed. Skipping chart generation.")
        print("Install with: pip install matplotlib")
        return

    if 'timeStamp' not in df.columns:
        print("WARNING: No timeStamp column found. Skipping chart generation.")
        return

    df = df.copy()
    start_ts = df['timeStamp'].min()
    df['elapsed_sec'] = (df['timeStamp'] - start_ts) / 1000

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 8), sharex=True)

    # Response Time over Time
    ax1.scatter(df['elapsed_sec'], df['elapsed'], alpha=0.3, s=2, color='steelblue')

    # Add rolling average
    window = max(1, len(df) // 100)
    rolling_avg = df['elapsed'].rolling(window=window, min_periods=1).mean()
    ax1.plot(df['elapsed_sec'], rolling_avg, color='red', linewidth=1.5, label='Rolling Average')

    ax1.set_ylabel('Response Time (ms)')
    ax1.set_title('Response Time Over Time')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Active Threads over Time
    if 'allThreads' in df.columns:
        ax2.plot(df['elapsed_sec'], df['allThreads'], color='green', linewidth=1)
        ax2.set_ylabel('Active Threads')
    else:
        # Show RPS instead
        df['time_bucket'] = (df['elapsed_sec'] // 5) * 5
        rps = df.groupby('time_bucket').size() / 5
        ax2.bar(rps.index, rps.values, width=4, color='green', alpha=0.7)
        ax2.set_ylabel('Requests/sec')

    ax2.set_xlabel('Time (seconds)')
    ax2.set_title('Load Profile Over Time')
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"Chart saved to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description='JTL Log Analyzer for Performance Testing')
    parser.add_argument('jtl_file', help='Path to the .jtl log file')
    parser.add_argument('--output', choices=['markdown', 'json', 'csv'],
                        default='markdown', help='Output format (default: markdown)')
    parser.add_argument('--chart', action='store_true',
                        help='Generate response time chart')
    parser.add_argument('--chart-output', default=None,
                        help='Chart output path (default: <jtl_basename>_chart.png)')
    parser.add_argument('--baseline', default=None,
                        help='Path to baseline JSON file for regression check')
    parser.add_argument('--threshold', type=float, default=1.2,
                        help='Regression threshold factor (default: 1.2 = 20%%)')
    parser.add_argument('--skip-pct', type=float, default=0,
                        help='Skip first N%% of data as warm-up (default: 0)')
    parser.add_argument('--save-baseline', default=None,
                        help='Save current metrics as baseline to this JSON file')

    args = parser.parse_args()

    print(f"Loading JTL file: {args.jtl_file}")
    df = load_jtl(args.jtl_file, skip_pct=args.skip_pct)
    print(f"Loaded {len(df):,} records.")

    print("\nComputing metrics...")
    metrics = compute_metrics(df)

    # Output
    if args.output == 'json':
        print(json.dumps(metrics, indent=2, ensure_ascii=False))
    elif args.output == 'csv':
        rt = metrics['response_time']
        tp = metrics['throughput']
        er = metrics['errors']
        print("metric,value")
        for key, val in rt.items():
            print(f"response_time_{key},{val}")
        for key, val in tp.items():
            print(f"throughput_{key},{val}")
        for key, val in er.items():
            print(f"errors_{key},{val}")
    else:
        report = format_markdown(metrics, args.jtl_file)
        print("\n" + report)

    # Chart
    if args.chart:
        chart_output = args.chart_output or os.path.splitext(args.jtl_file)[0] + '_chart.png'
        generate_chart(df, chart_output)

    # Baseline save
    if args.save_baseline:
        with open(args.save_baseline, 'w') as f:
            json.dump(metrics, f, indent=2, ensure_ascii=False)
        print(f"\nBaseline saved to: {args.save_baseline}")

    # Regression check
    if args.baseline:
        print("\nChecking for regression...")
        regression = check_regression(metrics, args.baseline, args.threshold)
        if regression and regression['is_regression']:
            sys.exit(1)

    return metrics


if __name__ == '__main__':
    main()
