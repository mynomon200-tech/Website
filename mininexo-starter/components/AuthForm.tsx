'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, PawPrint } from 'lucide-react';
export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
 const router = useRouter();
 const [username,setUsername] = useState('');
 const [password,setPassword] = useState('');
 const [show,setShow] = useState(false);
 const [loading,setLoading] = useState(false);
 const [error,setError] = useState('');
 async function submit(e: FormEvent) {
  e.preventDefault(); setError(''); setLoading(true);
  try {
   const response = await fetch(`/api/auth/${mode}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username,password}) });
   const data = await response.json();
   if(!response.ok) throw new Error(data.error || 'Etwas ist schiefgelaufen.');
   router.replace(data.redirect); router.refresh();
  } catch (err) { setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.'); }
  finally { setLoading(false); }
 }
 const register = mode === 'register';
 return <main className="auth-layout">
   <section className="auth-aside"><div className="logo logo-light"><span className="logo-icon"><PawPrint size={20}/></span> mini<span>nexo</span></div>
    <div className="aside-content"><div className="eyebrow">DEINE KLEINE PIXEL-WELT</div><h1>Große Freundschaften.<br/><em>Kleine Pfoten.</em></h1><p>Adoptiere dein erstes Pixel-Pet und starte deine Geschichte.</p>
     <div className="pet-trio"><div className="emoji-pet">🌱</div><div className="emoji-pet">☁️</div><div className="emoji-pet">🔥</div></div>
    </div><div className="aside-bottom">✦ Ein neues Abenteuer wartet auf dich.</div>
   </section>
   <section className="auth-content"><div className="mobile-logo logo"><span className="logo-icon"><PawPrint size={18}/></span> mini<span>nexo</span></div>
    <div className="auth-card"><span className="tiny-star">✳</span><div className="eyebrow dark">{register ? 'DEIN ABENTEUER BEGINNT' : 'SCHÖN, DASS DU WIEDER DA BIST'}</div>
     <h2>{register ? 'Erstelle deinen Account' : 'Willkommen zurück!'}</h2><p className="muted">{register ? 'Nur ein Benutzername und Passwort. Keine E-Mail nötig.' : 'Melde dich an und besuche deinen kleinen Begleiter.'}</p>
     <form onSubmit={submit} className="auth-form">
      <label htmlFor="username">Benutzername</label><input id="username" autoComplete="username" placeholder="z. B. pixelhero" minLength={3} maxLength={20} pattern="[A-Za-z0-9_]+" value={username} onChange={e=>setUsername(e.target.value)} required />
      <label htmlFor="password">Passwort</label><div className="password-wrap"><input id="password" type={show ? 'text':'password'} autoComplete={register?'new-password':'current-password'} placeholder={register?'Mindestens 8 Zeichen':'Dein Passwort'} minLength={register?8:undefined} value={password} onChange={e=>setPassword(e.target.value)} required /><button className="reveal" type="button" onClick={()=>setShow(!show)} aria-label={show?'Passwort verbergen':'Passwort anzeigen'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
      {error && <p role="alert" className="error">{error}</p>}
      <button className="primary-btn" disabled={loading} type="submit">{loading?'Einen Moment...':register?'Account erstellen':'Einloggen'} <ArrowRight size={18}/></button>
     </form>
     <div className="auth-switch">{register?'Du hast schon einen Account?':'Noch kein Account?'} <Link href={register?'/login':'/register'}>{register?'Einloggen':'Jetzt registrieren'}</Link></div>
     {register&&<p className="auth-hint">Ohne E-Mail ist eine automatische Passwort-Wiederherstellung noch nicht möglich.</p>}
    </div><footer className="small-footer">© MiniNexo · Made for tiny adventures</footer>
   </section>
  </main>;
}
