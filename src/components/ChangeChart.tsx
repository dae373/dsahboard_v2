import type { TuitionChangeRecord } from '../types'

export function ChangeChart({ records }: { records: TuitionChangeRecord[] }) {
  if (!records.length) return <div className="empty-state">비교 가능한 동일기관 데이터가 없습니다.</div>
  const sorted = [...records].sort((a, b) => b.changeRate - a.changeRate)
  const selected = [...sorted.slice(0, 6), ...sorted.slice(-6)].sort((a, b) => a.changeRate - b.changeRate)
  const maxAbs = Math.max(...selected.map((item) => Math.abs(item.changeRate)), 1)
  return (
    <div className="change-chart">
      {selected.map((item) => (
        <div className="change-row" key={`${item.schoolName}-${item.schoolType}`}>
          <span className="change-school" title={item.schoolName}>{item.schoolName}</span>
          <span className="change-track">
            <span className="change-center" />
            {item.changeRate >= 0 ? (
              <span className="change-positive" style={{ width: `${item.changeRate / maxAbs * 50}%` }} />
            ) : (
              <span className="change-negative" style={{ width: `${Math.abs(item.changeRate) / maxAbs * 50}%` }} />
            )}
          </span>
          <strong className={item.changeRate >= 0 ? 'text-up' : 'text-down'}>
            {item.changeRate >= 0 ? '+' : ''}{item.changeRate.toFixed(2)}%
          </strong>
        </div>
      ))}
    </div>
  )
}
