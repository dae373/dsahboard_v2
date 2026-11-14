import type { GroupStat } from '../types'

interface Props {
  items: GroupStat[]
  color?: string
  onSelect?: (label: string) => void
  emptyText?: string
}

export function HorizontalBarChart({
  items,
  color = '#2f5597',
  onSelect,
  emptyText = '표시할 데이터가 없습니다.',
}: Props) {
  if (!items.length) return <div className="empty-state">{emptyText}</div>
  const sorted = [...items].sort((a, b) => a.value - b.value)
  const max = Math.max(...sorted.map((item) => item.value))
  return (
    <div className="horizontal-chart">
      {sorted.map((item) => (
        <button
          type="button"
          className="bar-row"
          key={item.label}
          onClick={() => onSelect?.(item.label)}
          disabled={!onSelect}
          title={`${item.label}: ${(item.value / 1_000_000).toFixed(2)}백만원, ${item.count}개`}
        >
          <span className="bar-label">{item.label}</span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${Math.max(2, item.value / max * 100)}%`, background: color }} />
          </span>
          <span className="bar-value">{(item.value / 1_000_000).toFixed(2)} <small>({item.count})</small></span>
        </button>
      ))}
    </div>
  )
}
