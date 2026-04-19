'use client';

export default function AuthCallbackPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#FFF9F9',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
      <p style={{ color: '#888', fontSize: 16 }}>Autentificare în curs...</p>
      <p style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>
        Poți închide această fereastră dacă nu ești redirecționat automat.
      </p>
    </div>
  );
}
