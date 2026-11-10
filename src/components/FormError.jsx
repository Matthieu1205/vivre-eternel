export default function FormError({ message }) {
  if (!message) return null
  return (
    <p role="alert" style={{
      margin: '0 0 1rem', padding: '.75rem 1rem', borderRadius: 10,
      background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '.86rem',
    }}>
      <i className="fas fa-exclamation-triangle" style={{ marginRight: '.4rem' }} />{message}
    </p>
  )
}
