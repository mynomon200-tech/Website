/* MiniNexo local-only prototype. Never use localStorage accounts as real authentication. */
const PETS = [
  {id:'momo',name:'Momo',type:'Natur',desc:'Neugierig und immer gut drauf.',image:'assets/momo.svg'},
  {id:'fluff',name:'Fluff',type:'Luft',desc:'Ein verträumtes Wolkenwesen.',image:'assets/fluff.svg'},
  {id:'ember',name:'Ember',type:'Feuer',desc:'Klein, mutig und voller Energie.',image:'assets/ember.svg'}
];
const KEY='mininexo_demo_accounts_v1', SESSION='mininexo_demo_current_v1';
const $=id=>document.getElementById(id);
let mode='login';
const accounts=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}};
const save=a=>localStorage.setItem(KEY,JSON.stringify(a));
const show=id=>{for(const v of ['auth-view','choose-view','home-view']) $(v).classList.toggle('hidden',v!==id)};
function setMode(next){mode=next;$('tab-login').classList.toggle('active',mode==='login');$('tab-register').classList.toggle('active',mode==='register');$('auth-submit').innerHTML=mode==='login'?'Einloggen <span>→</span>':'Account erstellen <span>→</span>';$('auth-message').textContent='';$('password').value='';}
// Salted SHA-256 is only to avoid storing a plaintext demo password.
// It is NOT a substitute for server-side password hashing or real auth.
async function digest(pass,salt){const bytes=new TextEncoder().encode(salt+':'+pass);const hash=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')}
function randomSalt(){return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b=>b.toString(16).padStart(2,'0')).join('')}
function error(text){$('auth-message').textContent=text;$('auth-message').classList.remove('success')}
function render(){const key=sessionStorage.getItem(SESSION);const a=accounts();if(!key||!a[key]){show('auth-view');return}const u=a[key];if(!u.pet){$('welcome-name').textContent=u.name;$('pet-grid').innerHTML='';for(const pet of PETS){const b=document.createElement('button');b.type='button';b.className='pet-card';b.innerHTML=`<img src="${pet.image}" alt="${pet.name}"><h2>${pet.name}</h2><p>${pet.type} · ${pet.desc}</p><span class="choose-action">${pet.name} wählen →</span>`;b.addEventListener('click',()=>choose(pet.id));$('pet-grid').appendChild(b)}show('choose-view');return}const pet=PETS.find(p=>p.id===u.pet);if(!pet){show('choose-view');return}$('home-name').textContent=u.name;$('my-pet-image').src=pet.image;$('my-pet-image').alt=pet.name;$('my-pet-name').textContent=pet.name;$('my-pet-type').textContent='✦ '+pet.type;show('home-view')}
function choose(id){const key=sessionStorage.getItem(SESSION);const a=accounts();if(!key||!a[key]||a[key].pet)return;a[key].pet=id;save(a);render()}
function logout(){sessionStorage.removeItem(SESSION);$('auth-form').reset();setMode('login');show('auth-view')}
$('tab-login').addEventListener('click',()=>setMode('login'));
$('tab-register').addEventListener('click',()=>setMode('register'));
$('logout-home').addEventListener('click',logout);$('logout-choose').addEventListener('click',logout);
$('auth-form').addEventListener('submit',async e=>{e.preventDefault();const btn=$('auth-submit');const name=$('username').value.trim();const pass=$('password').value;const key=name.toLowerCase();if(!/^[a-zA-Z0-9_]{3,20}$/.test(name)){error('3–20 Zeichen, nur Buchstaben, Zahlen und _.');return}if(pass.length<6){error('Das Passwort braucht mindestens 6 Zeichen.');return}btn.disabled=true;try{const a=accounts();if(mode==='register'){if(a[key]){error('Dieser Benutzername ist schon vergeben (in deinem Browser).');return}const salt=randomSalt();a[key]={name,salt,passwordHash:await digest(pass,salt),pet:null};save(a)}else{if(!a[key]||a[key].passwordHash!==await digest(pass,a[key].salt)){error('Benutzername oder Passwort ist falsch.');return}}sessionStorage.setItem(SESSION,key);$('auth-form').reset();render()}catch{error('Speichern nicht möglich. Bitte Browser-Speicher erlauben.')}finally{btn.disabled=false}});
render();
