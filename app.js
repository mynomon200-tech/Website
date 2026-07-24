'use strict';

const USER_STORAGE_KEY = 'legis-user';
const MAX_COMMENT_LENGTH = 2000;

const WORLD_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Costa Rica', "Côte d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
  'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
  'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
  'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

let db = null;
let currentCountry = null;
let currentLaws = [];
let authMode = 'login';
let activeLawId = null;
let lawsListenerRef = null;
let messagesListenerRef = null;

function countryKey(country) {
  return country.replace(/[.#$[\]/]/g, '_');
}

function emailKey(email) {
  return email.replace(/[.#$[\]/]/g, '_');
}

function lawsRef(country) {
  return db.ref(`legis/countries/${countryKey(country)}/laws`);
}

function lawRef(country, lawId) {
  return lawsRef(country).child(lawId);
}

function messagesRef(country, lawId) {
  return lawRef(country, lawId).child('messages');
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function isLoggedIn() {
  return !!getUser();
}

function parseLaw(id, val) {
  const votes = val.votes || {};
  const messagesObj = val.messages || {};
  const messages = Object.entries(messagesObj)
    .map(([msgId, msg]) => ({ id: msgId, ...msg }))
    .sort((a, b) => a.createdAt - b.createdAt);

  return {
    id,
    title: val.title || '',
    summary: val.summary || '',
    author: val.author || 'Unknown',
    createdAt: val.createdAt || Date.now(),
    up: val.up || 0,
    down: val.down || 0,
    votes,
    messages,
  };
}

function findLaw(lawId) {
  return currentLaws.find((law) => law.id === lawId) || null;
}

function initFirebase() {
  const statusEl = document.getElementById('firebaseStatus');
  const cfg = window.FIREBASE_CONFIG;

  if (!cfg?.databaseURL || !cfg?.apiKey || cfg.apiKey === 'YOUR_API_KEY') {
    statusEl.textContent = 'Configure firebase-config.js with your Firebase Web App keys.';
    statusEl.classList.add('error');
    showToast('Firebase not configured — edit firebase-config.js');
    return false;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(cfg);
    }
    db = firebase.database();
    db.ref('.info/connected').on('value', (snap) => {
      if (snap.val() === true) {
        statusEl.textContent = 'Connected to Firebase · Live community data';
        statusEl.classList.remove('error');
        statusEl.classList.add('ok');
      } else {
        statusEl.textContent = 'Connecting to Firebase…';
        statusEl.classList.remove('ok');
      }
    });
    return true;
  } catch (err) {
    statusEl.textContent = 'Firebase connection failed.';
    statusEl.classList.add('error');
    console.error(err);
    return false;
  }
}

function stopWatchingLaws() {
  if (lawsListenerRef) {
    lawsListenerRef.off('value');
    lawsListenerRef = null;
  }
}

function stopWatchingMessages() {
  if (messagesListenerRef) {
    messagesListenerRef.off('value');
    messagesListenerRef = null;
  }
}

function watchLaws(country) {
  if (!db) return;
  stopWatchingLaws();
  currentCountry = country;
  lawsListenerRef = lawsRef(country);

  lawsListenerRef.on('value', (snapshot) => {
    const laws = [];
    snapshot.forEach((child) => {
      laws.push(parseLaw(child.key, child.val()));
    });
    laws.sort((a, b) => b.createdAt - a.createdAt);
    currentLaws = laws;
    renderLawsUI(country, laws);
  });
}

async function addLawToFirebase(country, title, summary, author) {
  const ref = lawsRef(country).push();
  await ref.set({
    title,
    summary,
    author,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    up: 0,
    down: 0,
  });
}

async function castVote(country, lawId, email, type) {
  const ref = lawRef(country, lawId);
  const voteKey = emailKey(email);

  await ref.transaction((law) => {
    if (!law) return law;
    const prev = law.votes?.[voteKey];
    if (prev === type) return;

    law.votes = law.votes || {};
    if (prev === 'up') law.up = Math.max(0, (law.up || 0) - 1);
    if (prev === 'down') law.down = Math.max(0, (law.down || 0) - 1);
    if (type === 'up') law.up = (law.up || 0) + 1;
    if (type === 'down') law.down = (law.down || 0) + 1;
    law.votes[voteKey] = type;
    return law;
  });
}

async function postComment(country, lawId, author, text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error('Comment cannot be empty.');
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    throw new Error(`Comment max ${MAX_COMMENT_LENGTH} characters.`);
  }

  await messagesRef(country, lawId).push().set({
    author,
    text: trimmed,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  });
}

function formatTime(ts) {
  const time = typeof ts === 'object' && ts !== null ? Date.now() : ts;
  const diff = Date.now() - time;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const audioCtx =
  typeof AudioContext !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playSfx(type) {
  if (!audioCtx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  if (type === 'click') {
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.06);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'success') {
    osc.frequency.setValueAtTime(523, now);
    osc.frequency.setValueAtTime(659, now + 0.08);
    osc.frequency.setValueAtTime(784, now + 0.16);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'open') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.12);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function updateAuthUI() {
  const user = getUser();
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  if (user) {
    loginBtn.textContent = user.displayName;
    registerBtn.hidden = true;
  } else {
    loginBtn.textContent = 'Sign in';
    registerBtn.hidden = false;
  }
}

function requireAuth(action) {
  if (isLoggedIn()) return true;
  playSfx('open');
  openAuth('login');
  showToast('Please sign in to ' + action);
  return false;
}

function openAuth(mode) {
  authMode = mode;
  document.getElementById('authTitle').textContent = mode === 'login' ? 'Sign in' : 'Create account';
  document.getElementById('authSub').textContent =
    mode === 'login'
      ? 'Sign in to react, discuss, or propose new laws.'
      : 'Join the community and start contributing.';
  document.getElementById('authSubmit').textContent = mode === 'login' ? 'Sign in' : 'Register';
  document.getElementById('nameGroup').hidden = mode !== 'register';
  document.getElementById('authOverlay').classList.add('open');
  playSfx('open');
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('open');
}

function updateCharCounter() {
  const input = document.getElementById('messageInput');
  const counter = document.getElementById('messageCharCounter');
  if (!input || !counter) return;
  const len = input.value.length;
  counter.textContent = `${len} / ${MAX_COMMENT_LENGTH}`;
  counter.classList.toggle('over', len > MAX_COMMENT_LENGTH);
}

function renderLawCard(law, i) {
  const user = getUser();
  const vote = user ? law.votes[emailKey(user.email)] : null;
  const commentCount = law.messages.length;
  const card = document.createElement('article');
  card.className = 'law-card';
  card.style.animationDelay = `${i * 0.07}s`;
  card.innerHTML = `
    <div class="law-meta">
      <span class="law-tag new">Community</span>
      <span class="law-date">${formatTime(law.createdAt)}</span>
      <span class="law-author">by ${escapeHtml(law.author)}</span>
    </div>
    <h3 class="law-title">${escapeHtml(law.title)}</h3>
    <p class="law-summary">${escapeHtml(law.summary)}</p>
    <div class="law-actions">
      <button class="reaction-btn ${vote === 'up' ? 'active-up' : ''}" data-type="up" data-id="${law.id}">
        <span class="emoji">👍</span> <span class="count">${law.up}</span>
      </button>
      <button class="reaction-btn ${vote === 'down' ? 'active-down' : ''}" data-type="down" data-id="${law.id}">
        <span class="emoji">👎</span> <span class="count">${law.down}</span>
      </button>
      <button class="discuss-btn" data-id="${law.id}">
        <span class="emoji">💬</span> Discuss (${commentCount})
      </button>
    </div>
  `;
  return card;
}

function bindLawEvents(panel, country) {
  panel.querySelector('#proposeLawBtn')?.addEventListener('click', () => {
    if (!requireAuth('propose laws')) return;
    document.getElementById('proposeSub').textContent = `Submit your idea for ${country}.`;
    document.getElementById('proposeOverlay').classList.add('open');
    playSfx('open');
  });

  const list = panel.querySelector('#lawsList');
  if (!list) return;

  list.querySelectorAll('.reaction-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!requireAuth('react') || !db) return;
      const user = getUser();
      try {
        await castVote(country, btn.dataset.id, user.email, btn.dataset.type);
        playSfx('click');
      } catch (err) {
        showToast('Could not save vote');
        console.error(err);
      }
    });
  });

  list.querySelectorAll('.discuss-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!requireAuth('discuss')) return;
      openDiscussion(country, btn.dataset.id);
    });
  });

  panel.querySelector('#emptyProposeBtn')?.addEventListener('click', () => {
    if (!requireAuth('propose laws')) return;
    document.getElementById('proposeSub').textContent = `Submit your idea for ${country}.`;
    document.getElementById('proposeOverlay').classList.add('open');
    playSfx('open');
  });
}

function renderLawsUI(country, laws) {
  document.getElementById('emptyState').hidden = true;
  const panel = document.getElementById('lawsPanel');
  panel.hidden = false;

  const countText = laws.length === 1 ? '1 proposal' : `${laws.length} proposals`;

  panel.innerHTML = `
    <div class="country-header">
      <div>
        <h2>${escapeHtml(country)}</h2>
        <p>${laws.length ? countText + ' from the community' : 'No proposals yet — be the first!'}</p>
      </div>
      <button class="btn btn-primary propose-btn" id="proposeLawBtn">+ Propose law</button>
    </div>
    ${
      laws.length
        ? '<div class="laws-list" id="lawsList"></div>'
        : `
          <div class="laws-empty">
            <h3>No laws proposed yet</h3>
            <p>All content on Legis comes from community members. Be the first to suggest a regulation for ${escapeHtml(country)}.</p>
            <button class="btn btn-primary" id="emptyProposeBtn">+ Propose the first law</button>
          </div>
        `
    }
  `;

  if (laws.length) {
    const list = panel.querySelector('#lawsList');
    laws.forEach((law, i) => list.appendChild(renderLawCard(law, i)));
  }

  bindLawEvents(panel, country);
}

function renderThreadMessages(messages) {
  const thread = document.getElementById('threadMessages');
  if (!messages.length) {
    thread.innerHTML = '<div class="thread-empty">No messages yet. Start the discussion!</div>';
    return;
  }
  thread.innerHTML = messages
    .map(
      (m) => `
        <div class="message">
          <div class="message-author">${escapeHtml(m.author)}</div>
          <div class="message-text">${escapeHtml(m.text)}</div>
          <div class="message-time">${formatTime(m.createdAt)}</div>
        </div>
      `
    )
    .join('');
  thread.scrollTop = thread.scrollHeight;
}

function openDiscussion(country, lawId) {
  const law = findLaw(lawId);
  if (!law || !db) return;

  activeLawId = lawId;
  document.getElementById('discussTitle').textContent = law.title;
  document.getElementById('discussSub').textContent = `Discussion · proposed by ${law.author} · max ${MAX_COMMENT_LENGTH} chars per comment`;
  document.getElementById('messageInput').value = '';
  updateCharCounter();
  document.getElementById('discussOverlay').classList.add('open');
  playSfx('open');

  stopWatchingMessages();
  messagesListenerRef = messagesRef(country, lawId);
  messagesListenerRef.on('value', (snapshot) => {
    const messages = [];
    snapshot.forEach((child) => messages.push({ id: child.key, ...child.val() }));
    messages.sort((a, b) => a.createdAt - b.createdAt);
    renderThreadMessages(messages);
  });
}

const countryList = document.getElementById('countryList');
const countrySearch = document.getElementById('countrySearch');
const countrySearchClear = document.getElementById('countrySearchClear');
const countryNoResults = document.getElementById('countryNoResults');

function filterCountries(query) {
  const q = query.trim().toLowerCase();
  const items = countryList.querySelectorAll('li');
  let visible = 0;

  items.forEach((li) => {
    const name = li.dataset.country || '';
    const match = !q || name.toLowerCase().includes(q);
    li.classList.toggle('hidden', !match);
    if (match) visible += 1;
  });

  countryNoResults.classList.toggle('visible', q.length > 0 && visible === 0);
  countrySearchClear.classList.toggle('visible', q.length > 0);
}

WORLD_COUNTRIES.forEach((country, i) => {
  const li = document.createElement('li');
  li.dataset.country = country;
  const btn = document.createElement('button');
  btn.className = 'country-link';
  btn.textContent = country;
  btn.style.animationDelay = `${i * 0.02}s`;
  btn.addEventListener('click', () => {
    playSfx('click');
    document.querySelectorAll('.country-link').forEach((l) => l.classList.remove('active'));
    btn.classList.add('active');
    if (db) watchLaws(country);
    else showToast('Firebase not connected');
  });
  li.appendChild(btn);
  countryList.appendChild(li);
});

countrySearch.addEventListener('input', () => filterCountries(countrySearch.value));
countrySearchClear.addEventListener('click', () => {
  countrySearch.value = '';
  filterCountries('');
  countrySearch.focus();
  playSfx('click');
});

document.getElementById('loginBtn').addEventListener('click', () => openAuth('login'));
document.getElementById('registerBtn').addEventListener('click', () => openAuth('register'));
document.getElementById('authCancel').addEventListener('click', () => {
  closeAuth();
  playSfx('click');
});
document.getElementById('authOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeAuth();
});
document.getElementById('authSubmit').addEventListener('click', () => {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const name = document.getElementById('authName').value.trim();
  if (!email) {
    showToast('Please enter your email');
    return;
  }
  if (!password) {
    showToast('Please enter your password');
    return;
  }
  if (authMode === 'register' && !name) {
    showToast('Please enter a display name');
    return;
  }

  saveUser({
    email,
    displayName: authMode === 'register' ? name : email.split('@')[0],
  });

  closeAuth();
  playSfx('success');
  showToast(authMode === 'login' ? 'Welcome back!' : 'Account created — welcome!');
  updateAuthUI();
});

document.getElementById('discussClose').addEventListener('click', () => {
  document.getElementById('discussOverlay').classList.remove('open');
  stopWatchingMessages();
  activeLawId = null;
  playSfx('click');
});
document.getElementById('discussOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('discussOverlay').classList.remove('open');
    stopWatchingMessages();
    activeLawId = null;
  }
});

document.getElementById('messageInput').addEventListener('input', updateCharCounter);

document.getElementById('sendMessage').addEventListener('click', async () => {
  if (!currentCountry || !activeLawId || !db) return;
  const text = document.getElementById('messageInput').value;
  if (!text.trim()) return;
  if (text.length > MAX_COMMENT_LENGTH) {
    showToast(`Max ${MAX_COMMENT_LENGTH} characters per comment`);
    return;
  }

  const user = getUser();
  try {
    await postComment(currentCountry, activeLawId, user.displayName, text);
    document.getElementById('messageInput').value = '';
    updateCharCounter();
    playSfx('success');
    showToast('Message posted');
  } catch (err) {
    showToast(err.message || 'Could not post comment');
    console.error(err);
  }
});

document.getElementById('proposeClose').addEventListener('click', () => {
  document.getElementById('proposeOverlay').classList.remove('open');
  playSfx('click');
});
document.getElementById('proposeOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) document.getElementById('proposeOverlay').classList.remove('open');
});

document.getElementById('submitLaw').addEventListener('click', async () => {
  if (!currentCountry || !db) return;
  if (!requireAuth('propose laws')) return;

  const title = document.getElementById('lawTitle').value.trim();
  const summary = document.getElementById('lawSummary').value.trim();
  if (!title || !summary) {
    showToast('Please fill in all fields');
    return;
  }

  const user = getUser();
  try {
    await addLawToFirebase(currentCountry, title, summary, user.displayName);
    document.getElementById('proposeOverlay').classList.remove('open');
    document.getElementById('lawTitle').value = '';
    document.getElementById('lawSummary').value = '';
    playSfx('success');
    showToast('Proposal published!');
  } catch (err) {
    showToast('Could not publish proposal');
    console.error(err);
  }
});

document.getElementById('logoHome').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.country-link').forEach((l) => l.classList.remove('active'));
  document.getElementById('emptyState').hidden = false;
  document.getElementById('lawsPanel').hidden = true;
  stopWatchingLaws();
  stopWatchingMessages();
  currentCountry = null;
  currentLaws = [];
  activeLawId = null;
  playSfx('click');
});

initFirebase();
updateAuthUI();
updateCharCounter();
