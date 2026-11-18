// Champ image du backoffice : aperçu, lien, et bouton « Choisir une image »
// qui ouvre la Médiathèque (images déjà envoyées + envoi d'une nouvelle).
import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'

const MAX_MB = 8
const btn = {
  padding: '.55rem 1rem', borderRadius: 9, border: '1.5px solid #bae6fd', background: '#eff6ff',
  color: '#0369a1', fontWeight: 600, fontSize: '.82rem', cursor: 'pointer', whiteSpace: 'nowrap',
}

export async function uploadImage(file) {
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return { error: 'Format non supporté. Utilisez JPG, PNG, WEBP ou GIF.' }
  if (file.size > MAX_MB * 1024 * 1024) return { error: `Image trop lourde (${MAX_MB} Mo maximum).` }
  const body = new FormData()
  body.append('file', file, file.name)
  const { data, error } = await api('/admin/media/images', { method: 'POST', body })
  return error ? { error } : { url: data.url }
}

function Picker({ onPick, onClose }) {
  const [files, setFiles] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const input = useRef(null)

  useEffect(() => {
    api('/admin/media/images').then(({ data, error }) => {
      if (error) setError(error)
      setFiles(data || [])
    })
  }, [])

  async function upload(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true); setError('')
    const { url, error } = await uploadImage(file)
    setBusy(false)
    if (error) setError(error)
    else onPick(url)
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,.6)', zIndex: 1200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)',
    }}>
      <div style={{ background: '#fff', borderRadius: 18, width: '100%', maxWidth: 760, maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,.25)' }}>
        <div style={{ padding: '1.1rem 1.4rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a', flex: 1 }}>
            <i className="fas fa-images" style={{ color: '#0284C7', marginRight: '.5rem' }} />Choisir une image
          </h3>
          <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} style={{ display: 'none' }} />
          <button type="button" onClick={() => input.current?.click()} disabled={busy}
            style={{ ...btn, background: '#0369a1', color: '#fff', border: 'none' }}>
            {busy ? <><i className="fas fa-spinner fa-spin" /> Envoi…</> : <><i className="fas fa-upload" /> Envoyer depuis l’ordinateur</>}
          </button>
          <button type="button" onClick={onClose} style={{ ...btn, background: '#f1f5f9', color: '#334155', border: 'none' }}>Fermer</button>
        </div>
        {error && <p style={{ margin: '.75rem 1.4rem 0', color: '#b91c1c', fontSize: '.84rem' }}><i className="fas fa-exclamation-triangle" /> {error}</p>}
        <div style={{ padding: '1.1rem 1.4rem', overflow: 'auto' }}>
          {files === null ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}><i className="fas fa-spinner fa-spin" /> Chargement…</p>
          ) : files.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Aucune image dans la Médiathèque. Envoyez-en une avec le bouton ci-dessus.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '.75rem' }}>
              {files.map(f => (
                <button key={f.name} type="button" onClick={() => onPick(f.url)} title={f.name}
                  style={{ padding: 0, border: '2px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: '#f8fafc', aspectRatio: '4 / 3' }}>
                  <img src={f.url} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ImageField({ value, onChange, inputStyle }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
        {value && (
          <img src={value} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0', flexShrink: 0 }}
            onError={e => { e.target.style.visibility = 'hidden' }} onLoad={e => { e.target.style.visibility = 'visible' }} />
        )}
        <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="https://… ou choisissez une image"
          style={{ ...inputStyle, flex: 1, minWidth: 0 }} />
        <button type="button" onClick={() => setOpen(true)} style={btn}><i className="fas fa-image" /> Choisir</button>
        {value && (
          <button type="button" onClick={() => onChange('')} title="Retirer l’image"
            style={{ ...btn, background: '#fef2f2', color: '#dc2626', border: '1.5px solid #fecaca', padding: '.55rem .7rem' }}>
            <i className="fas fa-times" />
          </button>
        )}
      </div>
      {open && <Picker onClose={() => setOpen(false)} onPick={url => { onChange(url); setOpen(false) }} />}
    </div>
  )
}
