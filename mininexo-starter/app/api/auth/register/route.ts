import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';
import { setSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!/^[a-z0-9_]{3,20}$/.test(username)) return NextResponse.json({ error: 'Benutzername: 3–20 Zeichen, nur a–z, 0–9 oder _.' }, { status: 400 });
    if (password.length < 8 || password.length > 128) return NextResponse.json({ error: 'Passwort: 8–128 Zeichen.' }, { status: 400 });
    const password_hash = await hash(password, 12);
    const { data, error } = await db().from('players').insert({ username, password_hash }).select('id').single();
    if (error?.code === '23505') return NextResponse.json({ error: 'Dieser Benutzername ist schon vergeben.' }, { status: 409 });
    if (error || !data) throw error || new Error('Anlegen fehlgeschlagen');
    await setSession(data.id);
    return NextResponse.json({ ok: true, redirect: '/choose-pet' });
  } catch (error) { console.error('Registration error', error); return NextResponse.json({ error: 'Registrierung fehlgeschlagen. Bitte später erneut versuchen.' }, { status: 500 }); }
}
