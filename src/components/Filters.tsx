import { useEffect, useState } from 'react'
import type { DashboardFilters, Metadata, TuitionBand } from '../types'
import { BAND_LABELS, BAND_ORDER, DEFAULT_FILTERS } from '../utils/tuition'

interface Props {
  filters: DashboardFilters
  metadata: Metadata
  onChange: (next: DashboardFilters) => void
}

export function Filters({ filters, metadata, onChange }: Props) {
  const [query, setQuery] = useState(filters.schoolQuery)

  useEffect(() => setQuery(filters.schoolQuery), [filters.schoolQuery])
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query !== filters.schoolQuery) onChange({ ...filters, schoolQuery: query })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query, filters, onChange])

  function set<K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <section className="filters" aria-label="대시보드 필터">
      <Filter label="기준연도">
        <select value={filters.year} onChange={(e) => set('year', e.target.value === 'ALL' ? 'ALL' : Number(e.target.value) as 2025 | 2026)}>
          <option value="ALL">전체 연도</option>
          {metadata.years.map((year) => <option key={year} value={year}>{year}년</option>)}
        </select>
      </Filter>
      <Filter label="학교유형">
        <select value={filters.schoolType} onChange={(e) => set('schoolType', e.target.value)}>
          <option value="ALL">전체 학교유형</option>
          {metadata.schoolTypes.map((value) => <option key={value}>{value}</option>)}
        </select>
      </Filter>
      <Filter label="설립구분">
        <select value={filters.establishment} onChange={(e) => set('establishment', e.target.value)}>
          <option value="ALL">전체 설립구분</option>
          {metadata.establishments.map((value) => <option key={value}>{value}</option>)}
        </select>
      </Filter>
      <Filter label="지역">
        <select value={filters.region} onChange={(e) => set('region', e.target.value)}>
          <option value="ALL">전체 지역</option>
          {metadata.regions.map((value) => <option key={value}>{value}</option>)}
        </select>
      </Filter>
      <Filter label="등록금 구간">
        <select value={filters.tuitionBand} onChange={(e) => set('tuitionBand', e.target.value as TuitionBand | 'ALL')}>
          <option value="ALL">전체 구간</option>
          {BAND_ORDER.map((value) => <option key={value} value={value}>{BAND_LABELS[value]}</option>)}
        </select>
      </Filter>
      <Filter label="학교명 검색">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="예: 서울, 사이버" />
      </Filter>
      <Filter label="정렬">
        <select value={filters.sort} onChange={(e) => set('sort', e.target.value as DashboardFilters['sort'])}>
          <option value="TUITION_DESC">등록금 높은 순</option>
          <option value="TUITION_ASC">등록금 낮은 순</option>
          <option value="SCHOOL_NAME_ASC">학교명 가나다순</option>
        </select>
      </Filter>
      <Filter label="0원 공시">
        <select value={filters.includeZeroTuition ? 'include' : 'exclude'} onChange={(e) => set('includeZeroTuition', e.target.value === 'include')}>
          <option value="exclude">제외</option>
          <option value="include">포함</option>
        </select>
      </Filter>
      <Filter label="표 표시 개수">
        <select value={filters.pageSize} onChange={(e) => set('pageSize', Number(e.target.value) as DashboardFilters['pageSize'])}>
          {[20, 50, 100, 300].map((value) => <option key={value} value={value}>{value}개</option>)}
        </select>
      </Filter>
      <div className="filter-field filter-action">
        <button type="button" onClick={() => { setQuery(''); onChange(DEFAULT_FILTERS) }}>필터 초기화</button>
      </div>
    </section>
  )
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="filter-field"><span>{label}</span>{children}</label>
}
