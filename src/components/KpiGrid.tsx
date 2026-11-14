import { formatMillion } from '../utils/tuition'

interface Props {
  count: number
  mean: number
  median: number
  min?: { value: number; school: string }
  max?: { value: number; school: string }
  changeRate: number
}

export function KpiGrid({ count, mean, median, min, max, changeRate }: Props) {
  const changeText = Number.isFinite(changeRate)
    ? `${changeRate >= 0 ? '+' : ''}${changeRate.toFixed(2)}%`
    : '-'
  return (
    <section className="kpi-grid" aria-label="핵심 지표">
      <Kpi label="기관·캠퍼스 수" value={`${count.toLocaleString()}개`} sub="현재 필터 기준" />
      <Kpi label="평균 등록금" value={formatMillion(mean)} sub="기관 단순평균" />
      <Kpi label="중앙값" value={formatMillion(median)} sub="극단값 영향 완화" />
      <Kpi label="최저 등록금" value={min ? formatMillion(min.value) : '-'} sub={min?.school ?? '-'} />
      <Kpi label="최고 등록금" value={max ? formatMillion(max.value) : '-'} sub={max?.school ?? '-'} />
      <Kpi label="동일기관 평균 증감률" value={changeText} sub="2025→2026" />
    </section>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <article className="kpi-card">
      <span className="kpi-label">{label}</span>
      <strong className="kpi-value">{value}</strong>
      <span className="kpi-sub" title={sub}>{sub}</span>
    </article>
  )
}
