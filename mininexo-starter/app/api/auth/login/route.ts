import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { setSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!/^[a-z0-9_]{3,20}$/.test(username) || !password || password.length > 128)
      return NextResponse.json({ error: 'Benutzername oder Passwort falsch.' }, { status: 401 });
    const { data, error } = await db().from('players').select('id,password_hash,starter_pet').eq('username', username).maybeSingle();
    if (error) throw error;
    if (!data || !(await compare(password, data.password_hash)))
      return NextResponse.json({ error: 'Benutzername oder Passwort falsch.' }, { status: 401 });
    await setSession(data.id);
    return NextResponse.json({ ok: true, redirect: data.starter_pet ? '/home' : '/choose-pet' });
  } catch (error) { console.error('Login error', error); return NextResponse.json({ error: 'Login gerade nicht möglich.' }, { status: 500 }); }
}
