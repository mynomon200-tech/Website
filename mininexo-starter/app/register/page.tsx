import { AuthForm } from '@/components/AuthForm';
import { getSessionId } from '@/lib/session';
import { redirect } from 'next/navigation';
export default async function Register() { if(await getSessionId()) redirect('/home'); return <AuthForm mode="register"/>; }
