export function LoadingView() {
  return (
    <main className="status-page" aria-live="polite">
      <div className="spinner" />
      <h2>등록금 데이터를 불러오는 중입니다.</h2>
    </main>
  )
}

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <main className="status-page" role="alert">
      <h2>데이터를 불러오지 못했습니다.</h2>
      <p>{message}</p>
      <button type="button" onClick={onRetry}>다시 시도</button>
    </main>
  )
}
