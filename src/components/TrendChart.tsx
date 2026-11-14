interface Props {
  means: number[]
  medians: number[]
}

export function TrendChart({ means, medians }: Props) {
  const values = [...means, ...medians].filter(Number.isFinite)
  if (!values.length) return <div className="empty-state">표시할 데이터가 없습니다.</div>
  const min = Math.min(...values) * 0.94
  const max = Math.max(...values) * 1.06
  const y = (value: number) => 170 - ((value - min) / Math.max(1, max - min)) * 125
  const x = [90, 310]
  const points = (series: number[]) => series.map((value, index) => `${x[index]},${y(value)}`).join(' ')

  return (
    <div className="svg-chart">
      <svg viewBox="0 0 400 220" role="img" aria-label="2025년과 2026년 평균 및 중앙값 등록금 추이">
        {[45, 85, 125, 165].map((lineY) => <line key={lineY} x1="55" x2="350" y1={lineY} y2={lineY} className="grid-line" />)}
        <polyline points={points(means)} fill="none" stroke="#2f5597" strokeWidth="5" />
        <polyline points={points(medians)} fill="none" stroke="#ed7d31" strokeWidth="5" />
        {[2025, 2026].map((year, index) => (
          <g key={year}>
            <text x={x[index]} y="205" textAnchor="middle" className="axis-label">{year}</text>
            <circle cx={x[index]} cy={y(means[index])} r="7" fill="#2f5597" />
            <circle cx={x[index]} cy={y(medians[index])} r="7" fill="#ed7d31" />
            <text x={x[index]} y={y(means[index]) - 13} textAnchor="middle" className="chart-label">
              {(means[index] / 1_000_000).toFixed(2)}
            </text>
            <text x={x[index]} y={y(medians[index]) + 23} textAnchor="middle" className="chart-label">
              {(medians[index] / 1_000_000).toFixed(2)}
            </text>
          </g>
        ))}
        <g transform="translate(115,15)">
          <circle cx="0" cy="0" r="5" fill="#2f5597" /><text x="10" y="4" className="legend">평균</text>
          <circle cx="90" cy="0" r="5" fill="#ed7d31" /><text x="100" y="4" className="legend">중앙값</text>
        </g>
      </svg>
    </div>
  )
}
