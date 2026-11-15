import { ChoosePet } from '@/components/ChoosePet';
import { getSessionId } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
export default async function Choose() {
 const id = await getSessionId(); if(!id) redirect('/login');
 const { data:user } = await db().from('players').select('username,starter_pet').eq('id',id).maybeSingle();
 if(!user) redirect('/login'); if(user.starter_pet) redirect('/home');
 return <ChoosePet username={user.username}/>;
}
