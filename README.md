# MiniNexo – HTML-Demo

Einfaches Projekt ohne Backend und ohne Datenbank: Login, Registrierung und einmalige Wahl von Momo, Fluff oder Ember.

## Deployment auf GitHub + Vercel

1. Lade **den Inhalt dieses Ordners** in das Hauptverzeichnis deines GitHub-Repositories (nicht die ZIP-Datei und nicht den Oberordner).
2. Falls du alte Dateien ersetzen möchtest, sichere diese vorher. `index.html` ist die Startseite.
3. Stelle bei Vercel unter Project Settings sicher, dass das Framework **Other** ist und das Root Directory auf `./` steht. Für statische Dateien wird kein Build Command benötigt.
4. GitHub-Commit löst das Vercel-Deployment aus.

## Grenzen der Demo

- Accounts werden **nur in `localStorage` im jeweiligen Browser** gespeichert. Sie funktionieren nicht auf anderen Geräten und nicht in anderen Browsern.
- Der Login ist **keine sichere echte Authentifizierung**. Obwohl das Demo-Passwort mit Salt und SHA-256 im Browser verarbeitet wird, kann jeder mit Zugriff auf den Browser-Speicher den Zustand manipulieren. **Keine echten Passwörter verwenden**, keine vertraulichen Daten oder Multiplayer-Funktionen darauf aufbauen.
- Eine Pet-Auswahl ist für den Demo-Account nur einmal möglich, solange die lokalen Daten nicht gelöscht/verändert werden.
- Wenn Browserdaten gelöscht werden, sind die Demo-Accounts weg.
- Für echte Online-Accounts braucht MiniNexo später ein Backend/Authentifizierungssystem.
