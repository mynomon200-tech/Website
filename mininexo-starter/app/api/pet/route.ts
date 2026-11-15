import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { isPetId } from '@/lib/pets';
export async function POST(request: Request) {
  try {
    const id = await getSessionId();
    if (!id) return NextResponse.json({ error: 'Bitte zuerst anmelden.' }, { status: 401 });
    const { pet } = await request.json();
    if (!isPetId(pet)) return NextResponse.json({ error: 'Ungültiges Pet.' }, { status: 400 });
    // atomare Einmalauswahl: kein Überschreiben nach erstem Speichern
    const { data, error } = await db().from('players').update({ starter_pet: pet }).eq('id', id).is('starter_pet', null).select('id').maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Starter-Pet wurde bereits gewählt.' }, { status: 409 });
    return NextResponse.json({ ok: true, redirect: '/home' });
  } catch (error) { console.error('Pet selection error', error); return NextResponse.json({ error: 'Pet konnte nicht gespeichert werden.' }, { status: 500 }); }
}
