import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'MiniNexo – Deine Pixel-Pets', description: 'Adoptiere dein erstes Pixel-Pet.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="de"><body>{children}</body></html>; }
