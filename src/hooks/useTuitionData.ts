import { useEffect, useState } from 'react'
import type { Metadata, TuitionChangeRecord, TuitionRecord } from '../types'

interface TuitionDataState {
  records: TuitionRecord[]
  changes: TuitionChangeRecord[]
  metadata: Metadata | null
  loading: boolean
  error: string | null
}

export function useTuitionData(): TuitionDataState & { reload: () => void } {
  const [state, setState] = useState<TuitionDataState>({
    records: [],
    changes: [],
    metadata: null,
    loading: true,
    error: null,
  })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const [recordResponse, changeResponse, metadataResponse] = await Promise.all([
          fetch('./data/tuition-records.json', { signal: controller.signal }),
          fetch('./data/tuition-changes.json', { signal: controller.signal }),
          fetch('./data/metadata.json', { signal: controller.signal }),
        ])
        if (!recordResponse.ok || !changeResponse.ok || !metadataResponse.ok) {
          throw new Error('등록금 데이터를 불러오지 못했습니다.')
        }
        const [records, changes, metadata] = await Promise.all([
          recordResponse.json() as Promise<TuitionRecord[]>,
          changeResponse.json() as Promise<TuitionChangeRecord[]>,
          metadataResponse.json() as Promise<Metadata>,
        ])
        setState({ records, changes, metadata, loading: false, error: null })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        }))
      }
    }
    void load()
    return () => controller.abort()
  }, [reloadKey])

  return { ...state, reload: () => setReloadKey((value) => value + 1) }
}
