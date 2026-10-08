'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="error-page" role="alert">
    <h1>something went wrong</h1>
    <button type="button" onClick={reset}>try again →</button>
  </main>
}
