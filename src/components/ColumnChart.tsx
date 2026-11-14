interface Item {
  label: string
  value: number
  count?: number
  color?: string
}

export function ColumnChart({
  items,
  valueFormatter = (value) => value.toFixed(0),
  onSelect,
}: {
  items: Item[]
  valueFormatter?: (value: number) => string
  onSelect?: (label: string) => void
}) {
  if (!items.length || items.every((item) => !Number.isFinite(item.value))) {
    return <div className="empty-state">표시할 데이터가 없습니다.</div>
  }
  const max = Math.max(...items.map((item) => Number.isFinite(item.value) ? item.value : 0))
  return (
    <div className="column-chart">
      {items.map((item) => (
        <button
          className="column-item"
          key={item.label}
          type="button"
          disabled={!onSelect}
          onClick={() => onSelect?.(item.label)}
          title={`${item.label}: ${valueFormatter(item.value)}${item.count !== undefined ? `, ${item.count}개` : ''}`}
        >
          <span className="column-value">{valueFormatter(item.value)}</span>
          <span className="column-space">
            <span className="column-fill" style={{
              height: `${Math.max(2, item.value / Math.max(1, max) * 100)}%`,
              background: item.color ?? '#2f5597',
            }} />
          </span>
          <span className="column-label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
