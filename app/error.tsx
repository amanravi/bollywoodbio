'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a1810 0%, #081410 35%, #070f0c 65%, #050b08 100%)',
      color: '#eaeaea'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        marginBottom: '1rem',
        background: 'linear-gradient(180deg, #ffd700, #b8860b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '2px'
      }}>
        Something went wrong!
      </h2>
      <button
        onClick={reset}
        style={{
          marginTop: '1rem',
          padding: '0.8rem 2rem',
          background: 'linear-gradient(180deg, #ffd700, #b8860b)',
          color: '#161006',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '1.5px',
          textTransform: 'uppercase' as const,
        }}
      >
        Try again
      </button>
    </div>
  )
}
