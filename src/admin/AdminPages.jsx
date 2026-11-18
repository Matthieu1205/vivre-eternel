// « Pages du site » et « Coordonnées & réseaux » : modification des textes,
// images et listes de chaque page et sous-onglet du site public.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { mergeSection, refreshContent } from '../lib/content'
import { GROUPS, SECTIONS } from '../content/sections'
import ImageField from './ImageField'

const input = {
  width: '100%', padding: '.7rem .9rem', border: '1.5px solid #e2e8f0', borderRadius: 10,
  fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff',
}
const labelStyle = { fontSize: '.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: '.08em' }
const helpStyle = { margin: '-.15rem 0 .45rem', fontSize: '.75rem', color: '#94a3b8' }
const smallBtn = { padding: '.35rem .65rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer', fontSize: '.75rem' }

/** Valeur vide pour un nouvel élément d'une liste de fiches. */
const blankItem = fields => Object.fromEntries(fields.map(f => [f.name, f.type === 'list' ? [] : '']))

/** <input type="datetime-local"> attend « AAAA-MM-JJTHH:MM » en heure locale. */
function toLocalInput(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function Field({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return <textarea value={value ?? ''} onChange={e => onChange(e.target.value)} rows={Math.min(12, Math.max(3, String(value ?? '').split('\n').length + 1))}
        style={{ ...input, resize: 'vertical', lineHeight: 1.6 }} />
    case 'list':
      return <textarea value={(value || []).join('\n')} rows={Math.max(3, (value || []).length + 1)}
        onChange={e => onChange(e.target.value.split('\n'))}
        onBlur={e => onChange(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
        style={{ ...input, resize: 'vertical', lineHeight: 1.6 }} />
    case 'image':
      return <ImageField value={value} onChange={onChange} inputStyle={input} />
    case 'datetime':
      return <input type="datetime-local" value={toLocalInput(value)} style={input}
        onChange={e => onChange(e.target.value ? new Date(e.target.value).toISOString() : '')} />
    case 'select':
      return (
        <select value={value ?? field.options[0]} onChange={e => onChange(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )
    case 'items':
      return <ItemsField field={field} value={value || []} onChange={onChange} />
    default:
      return <input type={field.type === 'url' ? 'url' : 'text'} value={value ?? ''} onChange={e => onChange(e.target.value)} style={input} />
  }
}

function ItemsField({ field, value, onChange }) {
  const [open, setOpen] = useState(null)
  const update = (i, name, v) => onChange(value.map((it, j) => (j === i ? { ...it, [name]: v } : it)))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= value.length) return
    const next = [...value]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(open === i ? j : open === j ? i : open)
  }
  const remove = i => {
    if (!window.confirm('Supprimer cet élément ?')) return
    onChange(value.filter((_, j) => j !== i))
    setOpen(null)
  }
  const add = () => { onChange([...value, blankItem(field.fields)]); setOpen(value.length) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      {value.map((item, i) => {
        const title = item[field.itemLabel] || item[field.fields[0].name] || `Élément ${i + 1}`
        return (
          <div key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, background: open === i ? '#f8fafc' : '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.55rem .75rem' }}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)}
                style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.88rem', fontWeight: 600, color: '#0f172a', padding: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <i className={`fas fa-chevron-${open === i ? 'down' : 'right'}`} style={{ fontSize: '.7rem', color: '#94a3b8', marginRight: '.5rem' }} />
                {item.icon && <i className={item.icon} style={{ color: '#0284C7', marginRight: '.45rem' }} />}
                {String(title).slice(0, 90)}
              </button>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={smallBtn} title="Monter"><i className="fas fa-arrow-up" /></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} style={smallBtn} title="Descendre"><i className="fas fa-arrow-down" /></button>
              <button type="button" onClick={() => remove(i)} style={{ ...smallBtn, color: '#dc2626', borderColor: '#fecaca' }} title="Supprimer"><i className="fas fa-trash-alt" /></button>
            </div>
            {open === i && (
              <div style={{ padding: '0 .9rem 1rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                {field.fields.map(sub => (
                  <div key={sub.name}>
                    <label style={labelStyle}>{sub.label}</label>
                    {sub.help && <p style={helpStyle}>{sub.help}</p>}
                    <Field field={sub} value={item[sub.name]} onChange={v => update(i, sub.name, v)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
      <button type="button" onClick={add}
        style={{ alignSelf: 'flex-start', padding: '.5rem 1rem', borderRadius: 9, border: '1.5px dashed #93c5fd', background: '#eff6ff', color: '#0369a1', fontWeight: 600, fontSize: '.82rem', cursor: 'pointer' }}>
        <i className="fas fa-plus" /> Ajouter
      </button>
    </div>
  )
}

/** Nettoie les listes (lignes vides) avant l'enregistrement. */
function clean(fields, values) {
  const out = {}
  for (const f of fields) {
    let v = values[f.name]
    if (f.type === 'list') v = (v || []).map(s => String(s).trim()).filter(Boolean)
    if (f.type === 'items') v = (v || []).map(it => clean(f.fields, it)).filter(it => Object.values(it).some(x => (Array.isArray(x) ? x.length : String(x ?? '').trim())))
    out[f.name] = v ?? ''
  }
  return out
}

function SectionEditor({ sectionKey, stored, onSaved }) {
  const section = SECTIONS[sectionKey]
  const [form, setForm] = useState(() => mergeSection(sectionKey, stored))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [dirty, setDirty] = useState(false)

  // Après un enregistrement ou un retour au texte d'origine.
  useEffect(() => { setForm(mergeSection(sectionKey, stored)); setDirty(false) }, [sectionKey, stored])

  useEffect(() => {
    if (!dirty) return
    const warn = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const set = (name, v) => { setForm(f => ({ ...f, [name]: v })); setDirty(true); setMessage(null) }

  async function save() {
    setSaving(true); setMessage(null)
    const valeur = clean(section.fields, form)
    const { error } = await api(`/admin/contenus/${sectionKey}`, { method: 'PUT', body: { valeur } })
    setSaving(false)
    if (error) { setMessage({ type: 'error', text: error }); return }
    setDirty(false)
    setMessage({ type: 'ok', text: 'Enregistré. Le site affiche maintenant ces textes.' })
    refreshContent()
    onSaved(sectionKey, valeur)
  }

  async function reset() {
    if (!window.confirm('Remettre le texte d’origine pour toute cette section ? Vos modifications seront perdues.')) return
    setSaving(true)
    const { error } = await api(`/admin/contenus/${sectionKey}`, { method: 'DELETE' })
    setSaving(false)
    if (error) { setMessage({ type: 'error', text: error }); return }
    refreshContent()
    onSaved(sectionKey, undefined)
    setMessage({ type: 'ok', text: 'Texte d’origine rétabli.' })
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,.06)', padding: '1.5rem 1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{section.label}</h2>
          {section.help && <p style={{ margin: '.3rem 0 0', fontSize: '.82rem', color: '#64748b' }}>{section.help}</p>}
        </div>
        {stored && (
          <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 20, padding: '.25rem .7rem' }}>
            <i className="fas fa-pen" /> Modifié
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {section.fields.map(f => (
          <div key={f.name}>
            <label style={labelStyle}>{f.label}</label>
            {f.help && <p style={helpStyle}>{f.help}</p>}
            <Field field={f} value={form[f.name]} onChange={v => set(f.name, v)} />
          </div>
        ))}
      </div>

      {message && (
        <p style={{
          margin: '1.25rem 0 0', padding: '.7rem 1rem', borderRadius: 10, fontSize: '.85rem',
          background: message.type === 'ok' ? '#ecfdf5' : '#fef2f2', color: message.type === 'ok' ? '#047857' : '#b91c1c',
          border: `1px solid ${message.type === 'ok' ? '#a7f3d0' : '#fecaca'}`,
        }}>
          <i className={message.type === 'ok' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} /> {message.text}
        </p>
      )}

      <div style={{ position: 'sticky', bottom: 0, background: '#fff', display: 'flex', gap: '.75rem', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
        {stored && (
          <button type="button" onClick={reset} disabled={saving}
            style={{ padding: '.7rem 1.2rem', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: '.85rem' }}>
            <i className="fas fa-undo" /> Texte d’origine
          </button>
        )}
        <button type="button" onClick={save} disabled={saving || !dirty}
          style={{
            padding: '.7rem 1.6rem', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem',
            cursor: saving || !dirty ? 'not-allowed' : 'pointer', color: '#fff',
            background: saving || !dirty ? '#93c5fd' : 'linear-gradient(135deg,#0c1f3f,#0369a1)',
          }}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</> : <><i className="fas fa-check" /> Enregistrer</>}
        </button>
      </div>
    </div>
  )
}

/**
 * @param {'pages'|'general'} mode  « general » = Coordonnées & réseaux uniquement
 */
export default function AdminPages({ mode = 'pages' }) {
  const groups = useMemo(() => GROUPS.filter(g => (mode === 'general' ? g.id === 'general' : g.id !== 'general')), [mode])
  const keys = useMemo(() => Object.keys(SECTIONS).filter(k => groups.some(g => g.id === SECTIONS[k].group)), [groups])
  const [params, setParams] = useSearchParams()
  const current = keys.includes(params.get('s')) ? params.get('s') : keys[0]
  const [stored, setStored] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/public/contenus').then(({ data, error }) => {
      if (error) setError(error)
      setStored(data || {})
    })
  }, [])

  const onSaved = (key, valeur) => setStored(s => {
    const next = { ...s }
    if (valeur === undefined) delete next[key]
    else next[key] = valeur
    return next
  })

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%)', borderRadius: 20, padding: '1.5rem 2rem',
        marginBottom: '1.5rem', boxShadow: '0 6px 28px rgba(2,132,199,.22)', color: '#fff',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800 }}>
          <i className={mode === 'general' ? 'fas fa-address-book' : 'fas fa-file-alt'} style={{ marginRight: '.6rem' }} />
          {mode === 'general' ? 'Coordonnées & réseaux' : 'Pages du site'}
        </h1>
        <p style={{ margin: '.3rem 0 0', color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>
          {mode === 'general'
            ? 'Téléphones, email, adresse, WhatsApp et réseaux sociaux, repris sur tout le site.'
            : 'Choisissez une page puis un onglet. Tant que rien n’est modifié, le site garde son texte d’origine.'}
        </p>
      </div>

      {error && <p style={{ color: '#b91c1c', marginBottom: '1rem' }}><i className="fas fa-exclamation-triangle" /> Chargement impossible : {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <nav style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,.06)', padding: '.75rem', position: 'sticky', top: '1rem' }}>
          {groups.map(g => (
            <div key={g.id} style={{ marginBottom: '.5rem' }}>
              {mode !== 'general' && (
                <p style={{ margin: '.5rem .5rem .3rem', fontSize: '.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  <i className={g.icon} style={{ marginRight: '.4rem' }} />{g.label}
                </p>
              )}
              {keys.filter(k => SECTIONS[k].group === g.id).map(k => (
                <button key={k} type="button" onClick={() => setParams({ s: k })}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%', textAlign: 'left',
                    padding: '.5rem .75rem', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: '.85rem',
                    background: k === current ? '#e0f2fe' : 'transparent', color: k === current ? '#0369a1' : '#334155',
                    fontWeight: k === current ? 700 : 500,
                  }}>
                  <span style={{ flex: 1 }}>{SECTIONS[k].label}</span>
                  {stored?.[k] && <i className="fas fa-circle" style={{ fontSize: '.4rem', color: '#10b981' }} title="Modifié" />}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {stored === null ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}><i className="fas fa-spinner fa-spin" /> Chargement…</div>
        ) : (
          <SectionEditor key={current} sectionKey={current} stored={stored[current]} onSaved={onSaved} />
        )}
      </div>
    </div>
  )
}
