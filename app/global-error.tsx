'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff'
        }}>
          <h2>Something went wrong!</h2>
          <p style={{ 
            marginTop: '1rem', 
            color: '#ff6b6b', 
            maxWidth: '600px',
            fontSize: '0.9rem',
            wordBreak: 'break-word'
          }}>
            {error?.message || 'Unknown error'}
          </p>
          {error?.digest && (
            <p style={{ marginTop: '0.5rem', color: '#888', fontSize: '0.8rem' }}>
              Digest: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#e50914',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
