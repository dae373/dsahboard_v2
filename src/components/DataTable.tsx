import type { TuitionRecord } from '../types'
import { BAND_LABELS, formatWon } from '../utils/tuition'

export function DataTable({ records, total }: { records: TuitionRecord[]; total: number }) {
  return (
    <section className="table-card">
      <div className="section-heading">
        <h2>학교별 상세 목록</h2>
        <span>총 {total.toLocaleString()}개 중 {records.length.toLocaleString()}개 표시</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>연도</th><th>학교</th><th>학교유형</th><th>설립</th><th>지역</th>
              <th>등록금</th><th>인문사회</th><th>자연과학</th><th>예체능</th>
              <th>공학</th><th>의학</th><th>구간</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="center">{record.year}</td>
                <td title={record.schoolName}>{record.schoolName}</td>
                <td><span className="badge">{record.schoolType}</span></td>
                <td className="center">{record.establishment}</td>
                <td className="center">{record.region}</td>
                <Money value={record.tuition} strong />
                <Money value={record.humanities} />
                <Money value={record.naturalScience} />
                <Money value={record.artsSports} />
                <Money value={record.engineering} />
                <Money value={record.medicine} />
                <td>{BAND_LABELS[record.tuitionBand]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!records.length && <div className="empty-state">조건에 맞는 학교가 없습니다.</div>}
      </div>
    </section>
  )
}

function Money({ value, strong = false }: { value: number; strong?: boolean }) {
  return <td className="number">{strong ? <strong>{formatWon(value)}</strong> : value > 0 ? formatWon(value) : '-'}</td>
}
