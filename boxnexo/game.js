import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/PointerLockControls.js";

const container=document.querySelector("#game");
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x111923);
scene.fog=new THREE.Fog(0x111923,28,110);

const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,300);
camera.position.set(0,2.2,14);

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const controls=new PointerLockControls(camera,document.body);
renderer.domElement.addEventListener("click",()=>controls.lock());
controls.pointerSpeed=.65;

const hemi=new THREE.HemisphereLight(0xaec8e8,0x17202b,1.5); scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,2.4);
sun.position.set(-25,35,15); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
scene.add(sun);

const world=new THREE.Group(); scene.add(world);
const groundMat=new THREE.MeshStandardMaterial({color:0x29313b,roughness:.9});
const ground=new THREE.Mesh(new THREE.PlaneGeometry(180,180),groundMat);
ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; world.add(ground);

function box(w,h,d,x,y,z,color,rough=.8){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color,roughness:rough}));
  m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;world.add(m);return m;
}
function cyl(r,h,x,y,z,color){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,20),new THREE.MeshStandardMaterial({color,roughness:.75}));
  m.position.set(x,y,z);m.castShadow=true;world.add(m);return m;
}
function label(text,pos){
  const c=document.createElement("canvas");c.width=512;c.height=96;
  const x=c.getContext("2d");x.fillStyle="rgba(7,10,14,.8)";x.roundRect(8,8,496,80,18);x.fill();
  x.fillStyle="#fff";x.font="700 30px Arial";x.textAlign="center";x.fillText(text,256,57);
  const t=new THREE.CanvasTexture(c);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true}));
  s.position.copy(pos);s.scale.set(5.4,1,1);world.add(s);return s;
}

// Plaza
box(26,.25,26,0,.12,0,0x3a434f);
box(8,.35,8,0,.35,0,0x151b23);
for(let a=0;a<8;a++){const ang=a*Math.PI/4;box(1.2,.3,5,Math.cos(ang)*7,.3,Math.sin(ang)*7,0x242c36)}
cyl(2.4,.5,0,.55,0,0x202936);
const water=new THREE.Mesh(new THREE.CylinderGeometry(1.9,1.9,.12,40),new THREE.MeshStandardMaterial({color:0x2f6681,metalness:.1,roughness:.2}));
water.position.y=.84;world.add(water);
label("CITY PLAZA",new THREE.Vector3(0,4.4,0));

// Buildings
function building(x,z,w,d,h,name){
  box(w,h,d,x,h/2,z,0x202731,.95);
  box(w*.72,.08,.08,x,h*.55,z-d/2-.05,0x596574,.4);
  for(let yy=2;yy<h;yy+=2.1) for(let xx=-w/2+1;xx<w/2-0.5;xx+=2.1){
    box(.9,.65,.05,x+xx,yy,z-d/2-.04,0x344657,.25);
  }
  label(name,new THREE.Vector3(x,h+1.4,z));
}
building(-18,-8,12,13,9,"CAFE");
building(18,-8,12,13,12,"CLUB");
building(-18,18,14,11,8,"ARCADE");
building(18,18,14,11,10,"APARTMENTS");

// Streets / beach
box(7,.05,65,0,.16,18,0x171d25);
box(65,.05,7,0,.16,0,0x171d25);
box(65,.05,20,0,.17,42,0x34465a);
for(let x=-30;x<=30;x+=6) box(4,.03,1,x,.21,39,0xc0a46d);
label("BEACH",new THREE.Vector3(0,2,47));

// Trees
function tree(x,z){
  cyl(.35,2,x,1,z,0x4c3525);
  const crown=new THREE.Mesh(new THREE.SphereGeometry(1.5,12,10),new THREE.MeshStandardMaterial({color:0x315442,roughness:1}));
  crown.position.set(x,3,z);crown.castShadow=true;world.add(crown);
}
[[-31,-25],[-28,-15],[31,-24],[29,-14],[-32,8],[32,9],[-30,30],[30,30]].forEach(p=>tree(...p));

// Player
const player=new THREE.Group();
const body=new THREE.Mesh(new THREE.CapsuleGeometry(.48,.9,6,12),new THREE.MeshStandardMaterial({color:0x8d98aa}));
body.position.y=1.15;body.castShadow=true;player.add(body);
const head=new THREE.Mesh(new THREE.SphereGeometry(.42,18,12),new THREE.MeshStandardMaterial({color:0xd9b59b}));
head.position.y=2.05;head.castShadow=true;player.add(head);
player.position.set(0,0,13);scene.add(player);
camera.position.set(0,2.5,15);

// Fake social players
const people=[
 {name:"Alex",x:7,z:4,c:0xd66b6b,msg:"yo, anyone at the plaza?"},
 {name:"Luna",x:-9,z:-4,c:0x7c8fe5,msg:"I'm grabbing a coffee."},
 {name:"Kai",x:5,z:34,c:0x68b995,msg:"Beach party is starting soon."},
 {name:"Nova",x:13,z:-3,c:0xb46de0,msg:"meet me at the club"},
 {name:"Milo",x:-5,z:5,c:0xd0a75b,msg:"nice place"}
];
const targets=[];
for(const p of people){
  const g=new THREE.Group();
  const b=new THREE.Mesh(new THREE.CapsuleGeometry(.48,.9,6,12),new THREE.MeshStandardMaterial({color:p.c}));
  b.position.y=1.15;b.castShadow=true;g.add(b);
  const h=new THREE.Mesh(new THREE.SphereGeometry(.42,18,12),new THREE.MeshStandardMaterial({color:0xd9b59b}));
  h.position.y=2.05;h.castShadow=true;g.add(h);
  g.position.set(p.x,0,p.z);g.userData={name:p.name,msg:p.msg};
  scene.add(g);targets.push(g);
  const div=document.createElement("div");div.style.position="fixed";div.style.pointerEvents="none";div.style.display="none";
  div.style.padding="5px 8px";div.style.borderRadius="7px";div.style.background="rgba(5,8,12,.8)";
  div.style.border="1px solid rgba(255,255,255,.1)";div.style.font="700 10px Arial";div.textContent=p.name;
  document.body.appendChild(div);g.userData.dom=div;
}

const keys={};
addEventListener("keydown",e=>{keys[e.code]=true;if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault();});
addEventListener("keyup",e=>keys[e.code]=false);

let velocityY=0,onGround=true;
const clock=new THREE.Clock();
let nearest=null;

function movePlayer(dt){
  let x=0,z=0;
  if(keys.KeyW||keys.ArrowUp)z-=1;
  if(keys.KeyS||keys.ArrowDown)z+=1;
  if(keys.KeyA||keys.ArrowLeft)x-=1;
  if(keys.KeyD||keys.ArrowRight)x+=1;
  const len=Math.hypot(x,z)||1;x/=len;z/=len;
  const speed=(keys.ShiftLeft||keys.ShiftRight)?9:5;
  const forward=new THREE.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();
  const right=new THREE.Vector3().crossVectors(forward,new THREE.Vector3(0,1,0)).normalize();
  player.position.addScaledVector(forward,z*speed*dt);
  player.position.addScaledVector(right,x*speed*dt);
  player.position.x=THREE.MathUtils.clamp(player.position.x,-34,34);
  player.position.z=THREE.MathUtils.clamp(player.position.z,-34,52);

  if(keys.Space&&onGround){velocityY=7;onGround=false}
  velocityY-=18*dt;player.position.y+=velocityY*dt;
  if(player.position.y<=0){player.position.y=0;velocityY=0;onGround=true}

  // camera follows player while mouse controls view
  const offset=new THREE.Vector3(0,2.2,5.5);
  const desired=player.position.clone().add(offset);
  camera.position.lerp(desired,Math.min(1,dt*7));
  controls.getObject().position.copy(camera.position);
}

function updateNearest(){
  let best=3.3,b=null;
  for(const g of targets){
    const d=player.position.distanceTo(g.position);
    if(d<best){best=d;b=g}
  }
  nearest=b;
  document.querySelector("#interaction").classList.toggle("visible",!!b);
  if(b)document.querySelector("#interactionName").textContent=b.userData.name;
}

function worldToScreen(pos){
  const v=pos.clone();v.y+=2.7;v.project(camera);
  return {x:(v.x*.5+.5)*innerWidth,y:(-v.y*.5+.5)*innerHeight};
}
function updateLabels(){
  for(const g of targets){
    const p=worldToScreen(g.position);
    const visible=p.x>0&&p.x<innerWidth&&p.y>0&&p.y<innerHeight&&g.position.distanceTo(camera.position)<35;
    g.userData.dom.style.display=visible?"block":"none";
    g.userData.dom.style.left=(p.x-25)+"px";g.userData.dom.style.top=(p.y-10)+"px";
  }
}

document.querySelector("#chatForm").addEventListener("submit",e=>{
  e.preventDefault();const input=document.querySelector("#chatInput");const text=input.value.trim();if(!text)return;
  const row=document.createElement("div");row.innerHTML=`<b>MrNexo</b><span>${text.replace(/[<>&]/g,s=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[s]))}</span>`;
  document.querySelector("#chatMessages").appendChild(row);input.value="";
  if(nearest) bubble(nearest,text);
});
function bubble(g,text){
  const old=g.userData.bubble;if(old)world.remove(old);
  const c=document.createElement("canvas");c.width=700;c.height=100;const x=c.getContext("2d");
  x.fillStyle="rgba(7,10,14,.9)";x.roundRect(10,10,680,80,18);x.fill();
  x.fillStyle="#fff";x.font="600 25px Arial";x.textAlign="center";x.fillText(text.slice(0,55),350,60);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true}));
  s.position.copy(g.position);s.position.y+=3.1;s.scale.set(6,0.86,1);world.add(s);g.userData.bubble=s;
  setTimeout(()=>{if(g.userData.bubble===s){world.remove(s);g.userData.bubble=null}},4500);
}

document.querySelectorAll(".interaction-actions button").forEach(btn=>btn.addEventListener("click",()=>{
  if(!nearest)return;
  const a=btn.dataset.action;
  if(a==="profile"){document.querySelector("#profileName").textContent=nearest.userData.name;document.querySelector("#profilePanel").classList.add("open")}
  if(a==="friend"){addChat("SYSTEM","Friend request sent to "+nearest.userData.name+".")}
  if(a==="wave"){bubble(nearest,"waves at you");addChat("MrNexo","You waved at "+nearest.userData.name+".")}
}));
document.querySelector("#closeProfile").onclick=()=>document.querySelector("#profilePanel").classList.remove("open");
function addChat(name,text){const row=document.createElement("div");row.innerHTML=`<b>${name}</b><span>${text}</span>`;document.querySelector("#chatMessages").appendChild(row)}

document.querySelector("#goBeach").onclick=()=>{player.position.set(0,0,35);};
addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

let eventSeconds=151;
setInterval(()=>{eventSeconds=(eventSeconds-1+3600)%3600;document.querySelector("#eventTimer").textContent=String(Math.floor(eventSeconds/60)).padStart(2,"0")+":"+String(eventSeconds%60).padStart(2,"0")},1000);

function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),.05);
  movePlayer(dt);updateNearest();updateLabels();

  const t=performance.now()*.0003;
  targets.forEach((g,i)=>{g.rotation.y=Math.sin(t+i)*.15;});
  const hour=18+(performance.now()/60000)%1;
  document.querySelector("#clock").textContent="18:"+String(Math.floor((performance.now()/1000)%60)).padStart(2,"0");

  const dist=player.position.length();
  document.querySelector("#location").textContent=player.position.z>32?"BEACH":player.position.x<-12?"CAFE":player.position.x>12?"CLUB": "CITY PLAZA";
  renderer.render(scene,camera);
}
animate();
