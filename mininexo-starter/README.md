# MiniNexo – Login + Starter-Pets

Erste lauffähige Next.js-Version mit:
- Registrieren mit **Benutzername und Passwort (keine E-Mail)**
- Login / Logout mit signierter HttpOnly-Session (7 Tage)
- Drei Starter-Pets: Momo, Fluff, Ember
- **Einmalige, dauerhaft gespeicherte** Pet-Auswahl
- Nach dem Login erscheint das gewählte Pet
- Responsive UI, eigene SVG-Pixel-Sprites

## 1. Supabase anlegen
1. Auf https://supabase.com ein kostenloses Projekt anlegen.
2. Im **SQL Editor** den Inhalt von `supabase/schema.sql` ausführen.
3. Unter **Project Settings → API Keys** den **Secret Key** (z. B. `sb_secret_…`) kopieren. **Nie öffentlich weitergeben!**
4. Die Project URL kopieren.

## 2. Umgebungsvariablen
`.env.example` nach `.env.local` kopieren und Werte setzen:
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SECRET_KEY=sb_secret_xxx
SESSION_SECRET=zufaellige-geheime-zeichenfolge-mindestens-32-zeichen
```
`SESSION_SECRET` kannst du mit `openssl rand -hex 32` erzeugen.

## 3. Lokal starten
Benötigt Node.js 20 oder neuer.
```
npm install
npm run dev
```
Danach http://localhost:3000 öffnen.

## 4. Auf Vercel bereitstellen
1. Projekt in ein GitHub-Repository laden (keine `.env.local` hochladen).
2. In Vercel das Repository importieren.
3. Unter **Settings → Environment Variables** exakt dieselben drei Variablen hinterlegen.
4. Deploy ausführen. Danach kann das bestehende Domain-Mapping von mininexo.de genutzt werden.

## Wichtige Grenzen für ein öffentliches Spiel
- Ohne E-Mail ist eine automatische Passwort-Wiederherstellung aktuell nicht möglich.
- Vor einem öffentlichen Launch **Rate-Limiting, Bot-/Spam-Schutz, Monitoring und einen sicheren Account-Recovery-Prozess** hinzufügen. Die Demo schützt Passwörter durch bcrypt und Sessions durch signierte HttpOnly-Cookies, enthält aber noch kein Rate-Limiting.
- Secret Key gehört ausschließlich auf den Server, niemals in `NEXT_PUBLIC_*`.
- Das Starter-Pet lässt sich nur einmal auswählen; die Datenbank verhindert bei parallelen Requests ein Überschreiben.
- Noch keine Shops, Chats oder Freunde: Das ist bewusst nur Version 1.
