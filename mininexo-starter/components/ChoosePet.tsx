'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { PETS, type PetId } from '@/lib/pets';
import { PetSprite } from './PetSprite';
export function ChoosePet({ username }: { username: string }) {
 const [selected,setSelected] = useState<PetId>('momo');
 const [loading,setLoading] = useState(false);
 const [error,setError] = useState('');
 const router = useRouter();
 async function adopt() {
  setError(''); setLoading(true);
  try {
   const res = await fetch('/api/pet', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pet:selected})});
   const json = await res.json();
   if(!res.ok) throw new Error(json.error || 'Fehler beim Speichern');
   router.replace('/home'); router.refresh();
  } catch(err) { setError(err instanceof Error?err.message:'Fehler beim Speichern'); setLoading(false); }
 }
 return <main className="pet-page"><div className="topline"><div className="logo"><span className="logo-icon">✿</span> mini<span>nexo</span></div><span className="user-pill">Hi, {username} 👋</span></div>
  <div className="choose-main"><span className="step-label"><Sparkles size={14}/> SCHRITT 1 VON 1</span><h1>Wähle deinen ersten <em>Freund.</em></h1><p>Jedes Abenteuer beginnt mit einem Begleiter. Wen nimmst du mit?</p>
   <div className="pet-grid">{PETS.map(p=><button key={p.id} onClick={()=>setSelected(p.id)} type="button" className={`pet-card ${selected===p.id?'selected':''}`} style={{'--pet-accent':p.color,'--pet-glow':p.aura} as React.CSSProperties}>
    <div className="pet-check">{selected===p.id?<Check size={14}/>:null}</div><div className="pet-visual"><span className="pet-sparkle">✳</span><PetSprite pet={p.id} size={158}/></div>
    <div className="pet-details"><span className="pet-type">{p.type.toUpperCase()}</span><h3>{p.name}</h3><span className="pet-kind">{p.kind}</span><p>{p.description}</p></div>
   </button>)}</div>
   {error&&<p role="alert" className="error">{error}</p>}
   <div className="adopt-footer"><span>Deine Wahl ist dauerhaft ♡</span><button type="button" className="primary-btn adopt-button" disabled={loading} onClick={adopt}>{loading?'Wird gespeichert...':`${PETS.find(p=>p.id===selected)?.name} adoptieren`} <ArrowRight size={18}/></button></div>
  </div></main>;
}
