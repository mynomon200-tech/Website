# NEXO — Social World

A browser-based 3D social lobby prototype built with HTML/CSS/JavaScript + Three.js.

## Run

Because the game uses ES modules, open it through a local web server instead of double-clicking the HTML file.

### Option 1 — VS Code
Install the "Live Server" extension, then right-click `index.html` → "Open with Live Server".

### Option 2 — Python
In this folder run:

    python -m http.server 8000

Then open:

    http://localhost:8000

## Controls
WASD = move
Shift = run
Space = jump
Mouse = look
E = interaction hint (interaction panel appears when close)
Click = lock mouse

## Important
This is a playable single-browser prototype. The "players" are simulated locally.
Real multiplayer requires a backend, e.g. Node.js + WebSocket/Socket.IO, with server-authoritative player positions and chat.
