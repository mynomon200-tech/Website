import { getSessionId } from '@/lib/session';
import { db } from '@/lib/db';
import { PETS, isPetId } from '@/lib/pets';
import { PetSprite } from '@/components/PetSprite';
import { LogoutButton } from '@/components/LogoutButton';
import { redirect } from 'next/navigation';
export default async function Home() {
 const id=await getSessionId(); if(!id) redirect('/login');
 const {data:user}=await db().from('players').select('username,starter_pet').eq('id',id).maybeSingle();
 if(!user) redirect('/login'); if(!isPetId(user.starter_pet)) redirect('/choose-pet');
 const pet=PETS.find(p=>p.id===user.starter_pet)!;
 return <main className="home-page"><header className="home-nav"><div className="logo"><span className="logo-icon">✿</span> mini<span>nexo</span></div><div className="home-user">@{user.username} <LogoutButton/></div></header>
 <section className="home-panel"><span className="step-label">✦ DEIN NEUER BESTER FREUND</span><h1>Willkommen, <em>{user.username}!</em></h1><p>Dein MiniNexo-Abenteuer hat gerade begonnen.</p><div className="owned-pet"><div className="owned-pet-art" style={{background:pet.aura}}><PetSprite pet={pet.id} size={220}/></div><div><span className="pet-type">DEIN STARTER-PET · {pet.type.toUpperCase()}</span><h2>{pet.name}</h2><p>{pet.description}</p><div className="coming-soon">♡ Ihr seid jetzt ein Team!</div></div></div><p className="next-text">Als Nächstes kommen Profile, Freunde und das Wirtschaftssystem. ✨</p></section></main>;
}
