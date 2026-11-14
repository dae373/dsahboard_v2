import type {
  DashboardFilters,
  GroupStat,
  TuitionBand,
  TuitionChangeRecord,
  TuitionRecord,
} from '../types'

export const BAND_LABELS: Record<TuitionBand, string> = {
  UNDER_3M: '300만원 미만',
  BETWEEN_3M_5M: '300~500만원',
  BETWEEN_5M_7M: '500~700만원',
  BETWEEN_7M_9M: '700~900만원',
  OVER_9M: '900만원 이상',
  ZERO_REPORTED: '0원 공시',
}

export const BAND_ORDER: TuitionBand[] = [
  'UNDER_3M',
  'BETWEEN_3M_5M',
  'BETWEEN_5M_7M',
  'BETWEEN_7M_9M',
  'OVER_9M',
  'ZERO_REPORTED',
]

export const DEFAULT_FILTERS: DashboardFilters = {
  year: 2026,
  schoolType: 'ALL',
  establishment: 'ALL',
  region: 'ALL',
  tuitionBand: 'ALL',
  schoolQuery: '',
  includeZeroTuition: false,
  sort: 'TUITION_DESC',
  pageSize: 50,
}

export function average(values: number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : NaN
}

export function median(values: number[]): number {
  if (!values.length) return NaN
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function formatWon(value: number): string {
  return Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '-'
}

export function formatMillion(value: number): string {
  return Number.isFinite(value) ? `${(value / 1_000_000).toFixed(2)}백만원` : '-'
}

export function matchesDimensions(
  record: Pick<TuitionRecord, 'schoolType' | 'establishment' | 'region' | 'schoolName'>,
  filters: DashboardFilters,
): boolean {
  const query = filters.schoolQuery.trim().toLocaleLowerCase('ko-KR')
  return (
    (filters.schoolType === 'ALL' || record.schoolType === filters.schoolType) &&
    (filters.establishment === 'ALL' || record.establishment === filters.establishment) &&
    (filters.region === 'ALL' || record.region === filters.region) &&
    (!query || record.schoolName.toLocaleLowerCase('ko-KR').includes(query))
  )
}

export function filterRecords(
  records: TuitionRecord[],
  filters: DashboardFilters,
  ignoreYear = false,
): TuitionRecord[] {
  return records.filter((record) => {
    if (!ignoreYear && filters.year !== 'ALL' && record.year !== filters.year) return false
    if (!matchesDimensions(record, filters)) return false
    if (filters.tuitionBand !== 'ALL' && record.tuitionBand !== filters.tuitionBand) return false
    if (!filters.includeZeroTuition && record.tuition <= 0) return false
    return true
  })
}

export function filterChanges(
  records: TuitionChangeRecord[],
  filters: DashboardFilters,
): TuitionChangeRecord[] {
  return records.filter((record) => matchesDimensions(record, filters))
}

export function groupAverage(
  records: TuitionRecord[],
  key: keyof Pick<TuitionRecord, 'schoolType' | 'establishment' | 'region'>,
): GroupStat[] {
  const groups = new Map<string, number[]>()
  records.forEach((record) => {
    if (record.tuition <= 0) return
    const label = String(record[key])
    const values = groups.get(label) ?? []
    values.push(record.tuition)
    groups.set(label, values)
  })
  return [...groups.entries()].map(([label, values]) => ({
    label,
    value: average(values),
    count: values.length,
  }))
}

export function sortRecords(records: TuitionRecord[], filters: DashboardFilters): TuitionRecord[] {
  const result = [...records]
  if (filters.sort === 'TUITION_ASC') result.sort((a, b) => a.tuition - b.tuition)
  if (filters.sort === 'TUITION_DESC') result.sort((a, b) => b.tuition - a.tuition)
  if (filters.sort === 'SCHOOL_NAME_ASC') {
    result.sort((a, b) => a.schoolName.localeCompare(b.schoolName, 'ko'))
  }
  return result
}

export function filtersFromUrl(): DashboardFilters {
  const params = new URLSearchParams(window.location.search)
  const yearValue = params.get('year')
  const sizeValue = Number(params.get('pageSize'))
  return {
    ...DEFAULT_FILTERS,
    year: yearValue === '2025' ? 2025 : yearValue === 'ALL' ? 'ALL' : 2026,
    schoolType: params.get('schoolType') || 'ALL',
    establishment: params.get('establishment') || 'ALL',
    region: params.get('region') || 'ALL',
    tuitionBand: (params.get('tuitionBand') as DashboardFilters['tuitionBand']) || 'ALL',
    schoolQuery: params.get('q') || '',
    includeZeroTuition: params.get('zero') === '1',
    sort: (params.get('sort') as DashboardFilters['sort']) || 'TUITION_DESC',
    pageSize: ([20, 50, 100, 300].includes(sizeValue) ? sizeValue : 50) as DashboardFilters['pageSize'],
  }
}

export function syncFiltersToUrl(filters: DashboardFilters): void {
  const params = new URLSearchParams()
  params.set('year', String(filters.year))
  if (filters.schoolType !== 'ALL') params.set('schoolType', filters.schoolType)
  if (filters.establishment !== 'ALL') params.set('establishment', filters.establishment)
  if (filters.region !== 'ALL') params.set('region', filters.region)
  if (filters.tuitionBand !== 'ALL') params.set('tuitionBand', filters.tuitionBand)
  if (filters.schoolQuery) params.set('q', filters.schoolQuery)
  if (filters.includeZeroTuition) params.set('zero', '1')
  if (filters.sort !== 'TUITION_DESC') params.set('sort', filters.sort)
  if (filters.pageSize !== 50) params.set('pageSize', String(filters.pageSize))
  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
}
