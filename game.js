/*
  NEXO — game.js
  ----------------
  Vanilla Three.js port of the CharacterViewer.jsx logic (same Minecraft-style
  blocky character), dropped into a walkable flat green world.

  Controls:
    W A S D   - move
    Mouse     - look around (click canvas to lock pointer)
    V         - toggle first-person / third-person
    Esc       - release mouse pointer
*/

// ---------- Basic guard: require a logged-in session ----------
const currentUser = sessionStorage.getItem("nexo_user");
document.getElementById("hudUser").textContent = currentUser ? `ɴᴇxᴏ · @${currentUser}` : "ɴᴇxᴏ";

const canvas = document.getElementById("gameCanvas");
const hudView = document.getElementById("hudView");

// ---------- Scene / Camera / Renderer ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fc6ea);
scene.fog = new THREE.Fog(0x8fc6ea, 12, 40);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// ---------- Light ----------
scene.add(new THREE.AmbientLight(0xffffff, 0.65));
const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(20, 30, 10);
sun.castShadow = true;
sun.shadow.camera.left = -40;
sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40;
sun.shadow.camera.bottom = -40;
scene.add(sun);

// ---------- Ground: flat green landscape made of grass blocks ----------
const groundGroup = new THREE.Group();
const grassMat = new THREE.MeshLambertMaterial({ color: 0x5b8c3a });
const blockSize = 0.6;
const worldRadius = 40; // blocks each direction
for (let x = -worldRadius; x <= worldRadius; x++) {
  for (let z = -worldRadius; z <= worldRadius; z++) {
    const grass = new THREE.Mesh(new THREE.BoxGeometry(blockSize, 0.2, blockSize), grassMat);
    grass.position.set(x * blockSize, -0.1, z * blockSize);
    grass.receiveShadow = true;
    groundGroup.add(grass);
  }
}
scene.add(groundGroup);
// NOTE: for a bigger world later, swap this per-block grid for a single
// large plane mesh — thousands of boxes will get slow fast.

// ---------- Pixel face texture (classic "Steve" face) ----------
function createFaceTexture() {
  const size = 16;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "#d9a066";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#3b2a1a";
  ctx.fillRect(3, 6, 3, 2);
  ctx.fillRect(10, 6, 3, 2);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(3, 6, 1, 2);
  ctx.fillRect(10, 6, 1, 2);

  ctx.fillStyle = "#8a5a3a";
  ctx.fillRect(5, 11, 6, 1);

  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  return tex;
}

const skinMat = new THREE.MeshLambertMaterial({ color: 0xd9a066 });
const faceMat = new THREE.MeshLambertMaterial({ map: createFaceTexture() });
const headMats = [skinMat, skinMat, skinMat, skinMat, faceMat, skinMat];

const shirtMat = new THREE.MeshLambertMaterial({ color: 0x2f9e8f });
const pantsMat = new THREE.MeshLambertMaterial({ color: 0x36426b });
const shoeMat = new THREE.MeshLambertMaterial({ color: 0x241a14 });

// ---------- Build the blocky character (same proportions as CharacterViewer) ----------
function buildCharacter() {
  const character = new THREE.Group();
  const unit = 0.09;

  const head = new THREE.Mesh(new THREE.BoxGeometry(unit * 8, unit * 8, unit * 8), headMats);
  head.position.y = unit * (12 + 12 + 4);
  head.castShadow = true;
  character.add(head);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(unit * 8, unit * 12, unit * 4), shirtMat);
  torso.position.y = unit * (12 + 6);
  torso.castShadow = true;
  character.add(torso);

  function buildArm(side) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * unit * 6, unit * (12 + 12), 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(unit * 4, unit * 12, unit * 4), shirtMat);
    arm.position.y = -unit * 6;
    arm.castShadow = true;
    shoulder.add(arm);
    return shoulder;
  }
  const armL = buildArm(-1);
  const armR = buildArm(1);
  character.add(armL, armR);

  function buildLeg(side) {
    const hip = new THREE.Group();
    hip.position.set(side * unit * 2, unit * 12, 0);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(unit * 4, unit * 12, unit * 4), pantsMat);
    leg.position.y = -unit * 6;
    leg.castShadow = true;
    hip.add(leg);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(unit * 4.1, unit * 2, unit * 4.1), shoeMat);
    shoe.position.y = -unit * 11;
    hip.add(shoe);
    return hip;
  }
  const legL = buildLeg(-1);
  const legR = buildLeg(1);
  character.add(legL, legR);

  character.userData.parts = { armL, armR, legL, legR };
  character.userData.totalHeight = unit * (12 + 12 + 8); // legs + torso + head
  return character;
}

const character = buildCharacter();
character.position.set(0, 0, 0);
scene.add(character);

// ---------- Player state ----------
const player = {
  position: character.position, // shared reference
  yaw: 0,          // facing direction (Y rotation)
  pitch: 0,        // look up/down
  speed: 2.6,      // units per second
};

const eyeHeight = character.userData.totalHeight * 0.92;

// ---------- View mode ----------
let firstPerson = true;

function setViewMode(isFirst) {
  firstPerson = isFirst;
  hudView.textContent = firstPerson ? "FIRST PERSON" : "THIRD PERSON";
  character.visible = !firstPerson; // hide own body in first person
}
setViewMode(true);

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "v") {
    setViewMode(!firstPerson);
  }
});

// ---------- Mouse look (pointer lock) ----------
canvas.addEventListener("click", () => {
  canvas.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== canvas) return;
  const sensitivity = 0.0022;
  player.yaw -= e.movementX * sensitivity;
  player.pitch -= e.movementY * sensitivity;
  const limit = Math.PI / 2 - 0.05;
  player.pitch = Math.max(-limit, Math.min(limit, player.pitch));
});

// ---------- Keyboard movement ----------
const keys = { w: false, a: false, s: false, d: false };
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k in keys) keys[k] = true;
});
window.addEventListener("keyup", (e) => {
  const k = e.key.toLowerCase();
  if (k in keys) keys[k] = false;
});

// ---------- Animation loop ----------
let t = 0;
let lastTime = performance.now();
const { armL, armR, legL, legR } = character.userData.parts;

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  // movement relative to facing direction (yaw)
  const forward = new THREE.Vector3(Math.sin(player.yaw), 0, Math.cos(player.yaw));
  const right = new THREE.Vector3(Math.sin(player.yaw + Math.PI / 2), 0, Math.cos(player.yaw + Math.PI / 2));

  let moveX = 0, moveZ = 0;
  if (keys.w) { moveX -= forward.x; moveZ -= forward.z; }
  if (keys.s) { moveX += forward.x; moveZ += forward.z; }
  if (keys.a) { moveX -= right.x; moveZ -= right.z; }
  if (keys.d) { moveX += right.x; moveZ += right.z; }

  const moving = moveX !== 0 || moveZ !== 0;
  if (moving) {
    const len = Math.hypot(moveX, moveZ);
    moveX = (moveX / len) * player.speed * dt;
    moveZ = (moveZ / len) * player.speed * dt;
    player.position.x += moveX;
    player.position.z += moveZ;
  }

  // character always faces the camera's yaw
  character.rotation.y = player.yaw + Math.PI;

  // walk cycle
  if (moving) {
    t += dt * 8;
    const swing = Math.sin(t) * 0.6;
    armL.rotation.x = swing;
    armR.rotation.x = -swing;
    legL.rotation.x = -swing;
    legR.rotation.x = swing;
  } else {
    armL.rotation.x *= 0.8;
    armR.rotation.x *= 0.8;
    legL.rotation.x *= 0.8;
    legR.rotation.x *= 0.8;
  }

  // camera placement
  if (firstPerson) {
    camera.position.set(player.position.x, eyeHeight, player.position.z);
    const lookDir = new THREE.Vector3(
      Math.sin(player.yaw) * Math.cos(player.pitch),
      Math.sin(player.pitch),
      Math.cos(player.yaw) * Math.cos(player.pitch)
    );
    camera.lookAt(
      camera.position.x + lookDir.x,
      camera.position.y + lookDir.y,
      camera.position.z + lookDir.z
    );
  } else {
    const distance = 3.2;
    const height = 1.6;
    const camX = player.position.x - Math.sin(player.yaw) * Math.cos(player.pitch) * distance;
    const camZ = player.position.z - Math.cos(player.yaw) * Math.cos(player.pitch) * distance;
    const camY = eyeHeight * 0.6 + height + Math.sin(player.pitch) * distance;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(player.position.x, eyeHeight * 0.8, player.position.z);
  }

  renderer.render(scene, camera);
}
animate();

// ---------- Resize ----------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
