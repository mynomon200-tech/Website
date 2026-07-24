'use strict';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBVrek7QSFiFZILJ2FeumZPaCuprZrVDUA',
  authDomain: 'chatr-6d513.firebaseapp.com',
  databaseURL: 'https://chatr-6d513-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chatr-6d513',
  storageBucket: 'chatr-6d513.firebasestorage.app',
  messagingSenderId: '961820142442',
  appId: '1:961820142442:web:8957e81acc258e1fa59313',
};

const LEGAL_OPERATOR = {
  publicLabel: 'Legis (private operator, Germany)',
  email: 'legissupport@gmail.com',
};

const USER_STORAGE_KEY = 'legis-user';
const ADMIN_DISPLAY_NAME = 'MrNexo';
const MAX_COMMENT_LENGTH = 2000;
const MAX_SUMMARY_LENGTH = 500;
const MAX_TAGS = 5;

const POLITICAL_TAGS = [
  'Abortion & Reproductive Rights', 'Affirmative Action', 'Agriculture & Food Policy', 'AI Regulation',
  'Animal Rights', 'Antitrust & Monopoly', 'Arms Export Control', 'Banking Regulation', 'Border Security',
  'Brexit & EU Exit', 'Campaign Finance', 'Cannabis Legalization', 'Carbon Tax', 'Censorship & Free Speech',
  'Childcare Policy', 'Church-State Separation', 'Civil Liberties', 'Climate Action', 'Coal Phase-Out',
  'Conscription & Military Service', 'Constitutional Reform', 'Corruption & Transparency', 'Counter-Terrorism',
  'Criminal Justice Reform', 'Cryptocurrency Regulation', 'Death Penalty', 'Defamation Law', 'Devolution',
  'Disability Rights', 'Drug Policy', 'Economic Inequality', 'Education Funding', 'Elder Care',
  'Election Reform', 'Electoral Systems', 'Energy Policy', 'Environmental Protection', 'Ethics in Politics',
  'EU Integration', 'Family Policy', 'Federalism', 'Fiscal Policy', 'Food Safety', 'Foreign Aid',
  'Foreign Policy', 'Freedom of Assembly', 'Freedom of Religion', 'Freedom of the Press', 'Gerrymandering',
  'Gig Economy', 'Global Trade', 'Gun Control', 'Healthcare Access', 'Healthcare Privatization',
  'Housing Policy', 'Human Rights', 'Humanitarian Intervention', 'Immigration Policy', 'Indigenous Rights',
  'Industrial Policy', 'Infrastructure Investment', 'Intellectual Property', 'Internet Governance',
  'Judicial Independence', 'Judicial Reform', 'Labor Rights', 'Land Reform', 'Language Policy',
  'LGBTQ+ Rights', 'Lobbying Regulation', 'Local Government', 'Manufacturing Policy', 'Media Regulation',
  'Mental Health Policy', 'Migration & Asylum', 'Military Spending', 'Minimum Wage', 'Multiculturalism',
  'Municipal Autonomy', 'National Identity', 'NATO & Alliances', 'Net Neutrality', 'Nuclear Energy',
  'Nuclear Non-Proliferation', 'Open Data & Gov Tech', 'Parental Leave', 'Patent Reform', 'Pension Reform',
  'Platform Regulation', 'Police Reform', 'Political Party Funding', 'Prison Reform', 'Privacy & Surveillance',
  'Public Broadcasting', 'Public Health', 'Public Transportation', 'Racial Justice', 'Refugee Policy',
  'Regulatory Reform', 'Religious Education', 'Renewable Energy', 'Rent Control', 'Reproductive Healthcare',
  'Rural Development', 'Sanctions Policy', 'School Choice', 'Science Funding', 'Secularism',
  'Separation of Powers', 'Single-Payer Healthcare', 'Social Welfare', 'Space Policy', 'Sports Policy',
  'Student Debt', 'Supply Chain Security', 'Supreme Court Reform', 'Taxation', 'Term Limits',
  'Tobacco & Alcohol Regulation', 'Tourism Policy', 'Trade Agreements', 'Trade Unions', 'Transparency Laws',
  'Universal Basic Income', 'University Tuition', 'Urban Planning', 'Vaccination Policy', 'Voting Rights',
  'War Powers', 'Water Rights', 'Whistleblower Protection', 'Women\'s Rights', 'Workers\' Compensation',
  'Workplace Safety', 'Workplace Surveillance', 'Zoning & Land Use',
];

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
let pendingCountry = null;
let currentCountry = null;
let currentLaws = [];
let globalIndex = [];
let authMode = 'login';
let activeLawId = null;
let activeDetailCountry = null;
let activeDetailLawId = null;
let lawsListenerRef = null;
let messagesListenerRef = null;
let indexListenerRef = null;
let notifListenerRef = null;
let selectedTags = [];
let editSelectedTags = [];
let replyToMessageId = null;
let replyToAuthor = null;
let currentFeedMode = 'trending';
let activeTagFilter = null;
let readingMode = false;
let profileUserPosts = [];

function countryKey(country) {
  return country.replace(/[.#$[\]/]/g, '_');
}

function emailKey(email) {
  return email.replace(/[.#$[\]/]/g, '_');
}

function nameKey(name) {
  return name.trim().toLowerCase().replace(/[.#$[\]/]/g, '_');
}

function lawsRef(country) {
  return db.ref('legis/countries/' + countryKey(country) + '/laws');
}

function lawRef(country, lawId) {
  return lawsRef(country).child(lawId);
}

function messagesRef(country, lawId) {
  return lawRef(country, lawId).child('messages');
}

function indexRef() {
  return db.ref('legis/index');
}

function userRef(email) {
  return db.ref('legis/users/' + emailKey(email));
}

function notifRef(email) {
  return userRef(email).child('notifications');
}

function displayNameRef(name) {
  return db.ref('legis/displayNames/' + nameKey(name));
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

function defaultPoll() {
  return {
    options: {
      support: { text: 'Support', count: 0 },
      oppose: { text: 'Oppose', count: 0 },
      abstain: { text: 'Abstain', count: 0 },
    },
    votes: {},
  };
}

function parseTags(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

function parseLaw(id, val) {
  const votes = val.votes || {};
  const messagesObj = val.messages || {};
  const messages = Object.entries(messagesObj)
    .map(function (entry) {
      return { id: entry[0], ...entry[1] };
    })
    .sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });

  const tags = parseTags(val.tags);
  const versions = val.versions || {};
  const poll = val.poll || null;

  return {
    id: id,
    title: val.title || '',
    summary: val.summary || '',
    body: val.body || val.summary || '',
    author: val.author || 'Unknown',
    authorEmail: val.authorEmail || '',
    createdAt: val.createdAt || Date.now(),
    updatedAt: val.updatedAt || val.createdAt || Date.now(),
    version: val.version || 1,
    versions: versions,
    tags: tags,
    up: val.up || 0,
    down: val.down || 0,
    votes: votes,
    poll: poll,
    messages: messages,
  };
}

function hotScore(law) {
  var ageHours = Math.max(1, (Date.now() - law.createdAt) / 3600000);
  var recency = Math.max(0, 168 - ageHours) / 168;
  return (law.up || 0) - (law.down || 0) + (law.messages ? law.messages.length : 0) * 0.4 + recency * 5;
}

function findLaw(lawId) {
  return currentLaws.find(function (law) {
    return law.id === lawId;
  }) || null;
}

function findIndexedLaw(lawId) {
  return globalIndex.find(function (item) {
    return item.lawId === lawId;
  }) || null;
}

function ensureDb() {
  if (db) return true;
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.database();
    if (pendingCountry) {
      var country = pendingCountry;
      pendingCountry = null;
      watchLaws(country);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function initFirebase() {
  ensureDb();
  watchGlobalIndex();
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

function stopWatchingNotifications() {
  if (notifListenerRef) {
    notifListenerRef.off('value');
    notifListenerRef = null;
  }
}

function watchGlobalIndex() {
  if (!ensureDb()) return;
  if (indexListenerRef) indexListenerRef.off('value');
  indexListenerRef = indexRef();
  indexListenerRef.on('value', function (snapshot) {
    var items = [];
    snapshot.forEach(function (child) {
      items.push({ lawId: child.key, ...child.val() });
    });
    globalIndex = items;
    renderHomeFeed();
    updateSearchIfOpen();
  });
}

function syncLawIndex(country, lawId, lawData) {
  if (!ensureDb()) return;
  var msgCount = lawData.messages ? Object.keys(lawData.messages).length : 0;
  var parsed = {
    title: lawData.title || '',
    summary: lawData.summary || '',
    tags: parseTags(lawData.tags),
    author: lawData.author || '',
    createdAt: lawData.createdAt || Date.now(),
    updatedAt: lawData.updatedAt || lawData.createdAt || Date.now(),
    up: lawData.up || 0,
    down: lawData.down || 0,
    messageCount: msgCount,
    version: lawData.version || 1,
    country: country,
    countryKey: countryKey(country),
  };
  parsed.hotScore = hotScore({
    up: parsed.up,
    down: parsed.down,
    messages: { length: msgCount },
    createdAt: parsed.createdAt,
  });
  return indexRef().child(lawId).set(parsed);
}

function usersRegistryRef() {
  return db.ref('legis/users');
}

function isAdmin(user) {
  user = user || getUser();
  return !!(user && user.displayName === ADMIN_DISPLAY_NAME);
}

function isUserBannedLocally(user) {
  return !!(user && user.banned);
}

function registerUserProfile(user, isNew) {
  if (!ensureDb()) return Promise.resolve();
  var ek = emailKey(user.email);
  var updates = {};
  if (isNew) {
    updates['legis/users/' + ek] = {
      displayName: user.displayName,
      email: user.email,
      country: user.country || 'Unknown',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      banned: false,
    };
    updates['legis/displayNames/' + nameKey(user.displayName)] = ek;
  } else {
    updates['legis/users/' + ek + '/email'] = user.email;
    updates['legis/users/' + ek + '/displayName'] = user.displayName;
    if (user.country) {
      updates['legis/users/' + ek + '/country'] = user.country;
    }
    updates['legis/displayNames/' + nameKey(user.displayName)] = ek;
  }
  return db.ref().update(updates);
}

function fetchUserProfile(email) {
  if (!ensureDb()) return Promise.resolve(null);
  return userRef(email).once('value').then(function (snap) {
    return snap.val();
  });
}

function verifyUserSession() {
  var user = getUser();
  if (!user || !ensureDb()) return;
  fetchUserProfile(user.email).then(function (data) {
    if (data && data.banned) {
      localStorage.removeItem(USER_STORAGE_KEY);
      updateAuthUI();
      showToast('Your account has been banned.');
    } else if (data) {
      user.displayName = data.displayName || user.displayName;
      user.country = data.country || user.country || '';
      user.banned = !!data.banned;
      saveUser(user);
      updateAuthUI();
    }
  });
}

function loadAllUsers() {
  if (!ensureDb()) return Promise.resolve([]);
  return usersRegistryRef()
    .once('value')
    .then(function (snapshot) {
      var users = [];
      snapshot.forEach(function (child) {
        var val = child.val();
        if (!val || typeof val !== 'object') return;
        if (val.email || val.displayName) {
          users.push({
            id: child.key,
            displayName: val.displayName || 'Unknown',
            email: val.email || '',
            country: val.country || 'Unknown',
            createdAt: val.createdAt || val.joinedAt || null,
            banned: !!val.banned,
          });
        }
      });
      users.sort(function (a, b) {
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
      return users;
    });
}

function renderAdminUserList(users, query) {
  var list = document.getElementById('adminUserList');
  if (!list) return;
  var q = (query || '').trim().toLowerCase();
  var filtered = users.filter(function (u) {
    if (!q) return true;
    return (
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    list.innerHTML =
      '<p style="color:var(--text-tertiary);font-size:0.875rem;">No users found.</p>';
    return;
  }

  list.innerHTML = filtered
    .map(function (u) {
      var isSelf = u.displayName === ADMIN_DISPLAY_NAME;
      return (
        '<article class="admin-user-card' +
        (u.banned ? ' banned' : '') +
        '">' +
        '<dl class="admin-user-grid">' +
        '<dt>Name</dt><dd>' +
        escapeHtml(u.displayName) +
        (u.banned ? ' <span style="color:var(--danger);">(Banned)</span>' : '') +
        '</dd>' +
        '<dt>Email</dt><dd>' +
        escapeHtml(u.email) +
        '</dd>' +
        '<dt>Country</dt><dd>' +
        escapeHtml(u.country) +
        '</dd>' +
        '<dt>Created</dt><dd>' +
        formatAdminDate(u.createdAt) +
        '</dd>' +
        '</dl>' +
        (isSelf
          ? '<p style="font-size:0.75rem;color:var(--text-tertiary);">Admin account (protected)</p>'
          : '<div class="admin-user-actions">' +
            '<button type="button" class="btn-warn admin-ban-btn" data-id="' +
            u.id +
            '" data-banned="' +
            u.banned +
            '">' +
            (u.banned ? 'Unban account' : 'Ban account') +
            '</button>' +
            '<button type="button" class="btn-danger admin-delete-btn" data-id="' +
            u.id +
            '" data-name="' +
            escapeHtml(u.displayName) +
            '">Delete account</button>' +
            '</div>') +
        '</article>'
      );
    })
    .join('');

  list.querySelectorAll('.admin-ban-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      adminToggleBan(btn.dataset.id, btn.dataset.banned === 'true');
    });
  });

  list.querySelectorAll('.admin-delete-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      adminDeleteUser(btn.dataset.id, btn.dataset.name);
    });
  });
}

function openAdminPanel() {
  if (!isAdmin()) {
    showToast('Access denied');
    return;
  }
  document.getElementById('adminOverlay').classList.add('open');
  document.getElementById('adminUserSearch').value = '';
  playSfx('open');
  loadAllUsers().then(function (users) {
    renderAdminUserList(users, '');
  });
}

function closeAdminPanel() {
  document.getElementById('adminOverlay').classList.remove('open');
}

function adminToggleBan(userId, currentlyBanned) {
  if (!isAdmin() || !ensureDb()) return;
  if (!confirm(currentlyBanned ? 'Unban this account?' : 'Ban this account? They will not be able to sign in.')) {
    return;
  }
  var updates = {};
  updates['legis/users/' + userId + '/banned'] = !currentlyBanned;
  if (!currentlyBanned) {
    updates['legis/users/' + userId + '/bannedAt'] = firebase.database.ServerValue.TIMESTAMP;
  }
  db.ref()
    .update(updates)
    .then(function () {
      showToast(currentlyBanned ? 'Account unbanned' : 'Account banned');
      return loadAllUsers();
    })
    .then(function (users) {
      renderAdminUserList(users, document.getElementById('adminUserSearch').value);
    });
}

function adminDeleteUser(userId, displayName) {
  if (!isAdmin() || !ensureDb()) return;
  if (displayName === ADMIN_DISPLAY_NAME) {
    showToast('Cannot delete admin account');
    return;
  }
  if (!confirm('Permanently delete this account? This cannot be undone.')) return;

  db.ref('legis/users/' + userId)
    .once('value')
    .then(function (snap) {
      var data = snap.val();
      var updates = {};
      updates['legis/users/' + userId] = null;
      if (data && data.displayName) {
        updates['legis/displayNames/' + nameKey(data.displayName)] = null;
      }
      return db.ref().update(updates);
    })
    .then(function () {
      showToast('Account deleted');
      return loadAllUsers();
    })
    .then(function (users) {
      renderAdminUserList(users, document.getElementById('adminUserSearch').value);
    });
}

function populateAuthCountrySelect() {
  var select = document.getElementById('authCountry');
  if (!select || select.options.length > 1) return;
  WORLD_COUNTRIES.forEach(function (country) {
    var opt = document.createElement('option');
    opt.value = country;
    opt.textContent = country;
    select.appendChild(opt);
  });
}

function watchLaws(country) {
  if (!ensureDb()) {
    pendingCountry = country;
    return;
  }
  stopWatchingLaws();
  currentCountry = country;
  activeTagFilter = null;
  lawsListenerRef = lawsRef(country);

  lawsListenerRef.on('value', function (snapshot) {
    var laws = [];
    snapshot.forEach(function (child) {
      laws.push(parseLaw(child.key, child.val()));
    });
    laws.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
    currentLaws = laws;
    renderLawsUI(country, getFilteredLaws(laws));
  });
}

function getFilteredLaws(laws) {
  if (!activeTagFilter) return laws;
  return laws.filter(function (law) {
    return law.tags.indexOf(activeTagFilter) !== -1;
  });
}

function selectCountry(country) {
  document.getElementById('emptyState').hidden = true;
  watchLaws(country);
}

function sanitizeHtml(html) {
  var allowed = { P: 1, BR: 1, STRONG: 1, B: 1, EM: 1, I: 1, UL: 1, OL: 1, LI: 1, A: 1 };
  var div = document.createElement('div');
  div.innerHTML = html;

  function clean(node) {
    var children = Array.from(node.childNodes);
    children.forEach(function (child) {
      if (child.nodeType === 1) {
        if (!allowed[child.tagName]) {
          var text = document.createTextNode(child.textContent);
          node.replaceChild(text, child);
          return;
        }
        if (child.tagName === 'A') {
          var href = child.getAttribute('href') || '';
          if (!/^https?:\/\//i.test(href)) {
            child.removeAttribute('href');
          } else {
            child.setAttribute('target', '_blank');
            child.setAttribute('rel', 'noopener noreferrer');
          }
          Array.from(child.attributes).forEach(function (attr) {
            if (attr.name !== 'href' && attr.name !== 'target' && attr.name !== 'rel') {
              child.removeAttribute(attr.name);
            }
          });
        } else {
          Array.from(child.attributes).forEach(function (attr) {
            child.removeAttribute(attr.name);
          });
        }
        clean(child);
      }
    });
  }

  clean(div);
  return div.innerHTML;
}

function getEditorHtml(editorId) {
  var el = document.getElementById(editorId);
  if (!el) return '';
  var html = el.innerHTML.trim();
  if (!html || html === '<br>') return '';
  return sanitizeHtml(html);
}

function setEditorHtml(editorId, html) {
  var el = document.getElementById(editorId);
  if (el) el.innerHTML = html || '';
}

function bindRteToolbar(toolbarEl, editorId, linkBtnId) {
  if (!toolbarEl) return;
  toolbarEl.querySelectorAll('.rte-btn[data-cmd]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById(editorId).focus();
      document.execCommand(btn.dataset.cmd, false, null);
    });
  });
  var linkBtn = document.getElementById(linkBtnId);
  if (linkBtn) {
    linkBtn.addEventListener('click', function () {
      var url = prompt('Enter URL (https://…)');
      if (url && /^https?:\/\//i.test(url)) {
        document.getElementById(editorId).focus();
        document.execCommand('createLink', false, url);
      }
    });
  }
}

function renderTagPicker(containerId, selected, filterText) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var q = (filterText || '').trim().toLowerCase();
  container.innerHTML = POLITICAL_TAGS.filter(function (tag) {
    return !q || tag.toLowerCase().includes(q);
  })
    .map(function (tag) {
      var sel = selected.indexOf(tag) !== -1 ? ' selected' : '';
      return '<button type="button" class="tag-pick' + sel + '" data-tag="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</button>';
    })
    .join('');

  container.querySelectorAll('.tag-pick').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.dataset.tag;
      var idx = selected.indexOf(tag);
      if (idx !== -1) {
        selected.splice(idx, 1);
        btn.classList.remove('selected');
      } else if (selected.length < MAX_TAGS) {
        selected.push(tag);
        btn.classList.add('selected');
      } else {
        showToast('Maximum ' + MAX_TAGS + ' tags');
      }
    });
  });
}

function addLawToFirebase(country, data) {
  if (!ensureDb()) return Promise.reject(new Error('offline'));
  var ref = lawsRef(country).push();
  var lawId = ref.key;
  var now = firebase.database.ServerValue.TIMESTAMP;
  var payload = {
    title: data.title,
    summary: data.summary,
    body: data.body,
    author: data.author,
    authorEmail: data.authorEmail,
    tags: data.tags,
    createdAt: now,
    updatedAt: now,
    version: 1,
    versions: {
      '1': {
        title: data.title,
        summary: data.summary,
        body: data.body,
        editedAt: now,
        editedBy: data.author,
        note: 'Initial version',
      },
    },
    up: 0,
    down: 0,
    poll: data.poll || null,
  };
  return ref.set(payload).then(function () {
    return syncLawIndex(country, lawId, payload);
  });
}

function updateLawVersion(country, lawId, data, changeNote) {
  if (!ensureDb()) return Promise.reject(new Error('offline'));
  var ref = lawRef(country, lawId);
  return ref.transaction(function (law) {
    if (!law) return law;
    var newVersion = (law.version || 1) + 1;
    law.title = data.title;
    law.summary = data.summary;
    law.body = data.body;
    law.tags = data.tags;
    law.version = newVersion;
    law.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    law.versions = law.versions || {};
    law.versions[String(newVersion)] = {
      title: data.title,
      summary: data.summary,
      body: data.body,
      editedAt: firebase.database.ServerValue.TIMESTAMP,
      editedBy: data.editedBy,
      note: changeNote || 'Updated',
    };
    return law;
  }).then(function (result) {
    if (result.committed && result.snapshot.val()) {
      return syncLawIndex(country, lawId, result.snapshot.val());
    }
  });
}

function castVote(country, lawId, email, type) {
  if (!ensureDb()) return Promise.reject(new Error('offline'));
  var ref = lawRef(country, lawId);
  var voteKey = emailKey(email);

  return ref.transaction(function (law) {
    if (!law) return law;
    var prev = law.votes && law.votes[voteKey];
    if (prev === type) return;

    law.votes = law.votes || {};
    if (prev === 'up') law.up = Math.max(0, (law.up || 0) - 1);
    if (prev === 'down') law.down = Math.max(0, (law.down || 0) - 1);
    if (type === 'up') law.up = (law.up || 0) + 1;
    if (type === 'down') law.down = (law.down || 0) + 1;
    law.votes[voteKey] = type;
    return law;
  }).then(function (result) {
    if (result.committed && result.snapshot.val()) {
      return syncLawIndex(country, lawId, result.snapshot.val());
    }
  });
}

function castPollVote(country, lawId, email, optionKey) {
  if (!ensureDb()) return Promise.reject(new Error('offline'));
  var ref = lawRef(country, lawId);
  var voteKey = emailKey(email);

  return ref.transaction(function (law) {
    if (!law || !law.poll) return law;
    var prev = law.poll.votes && law.poll.votes[voteKey];
    if (prev === optionKey) return law;

    law.poll.votes = law.poll.votes || {};
    if (prev && law.poll.options[prev]) {
      law.poll.options[prev].count = Math.max(0, (law.poll.options[prev].count || 0) - 1);
    }
    if (law.poll.options[optionKey]) {
      law.poll.options[optionKey].count = (law.poll.options[optionKey].count || 0) + 1;
    }
    law.poll.votes[voteKey] = optionKey;
    return law;
  });
}

function parseMentions(text) {
  var matches = text.match(/@([A-Za-z0-9_.\- ]{2,32})/g) || [];
  return matches.map(function (m) {
    return m.slice(1).trim();
  });
}

function createMentionNotifications(fromUser, country, lawId, lawTitle, mentions) {
  if (!ensureDb() || !mentions.length) return Promise.resolve();
  var promises = mentions.map(function (name) {
    return displayNameRef(name).once('value').then(function (snap) {
      var targetKey = snap.val();
      if (!targetKey || targetKey === emailKey(fromUser.email)) return;
      return db.ref('legis/users/' + targetKey + '/notifications').push({
        type: 'mention',
        text: fromUser.displayName + ' mentioned you in "' + lawTitle + '"',
        country: country,
        lawId: lawId,
        from: fromUser.displayName,
        read: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    });
  });
  return Promise.all(promises);
}

function refreshIndexMessageCount(country, lawId) {
  return messagesRef(country, lawId)
    .once('value')
    .then(function (snap) {
      var count = snap.numChildren();
      return lawRef(country, lawId)
        .once('value')
        .then(function (lawSnap) {
          if (!lawSnap.val()) return;
          var data = lawSnap.val();
          data.messages = snap.val() || {};
          return syncLawIndex(country, lawId, data);
        });
    });
}

function postComment(country, lawId, author, authorEmail, text, parentId) {
  var trimmed = text.trim();
  if (!trimmed) throw new Error('Comment cannot be empty.');
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    throw new Error('Comment max ' + MAX_COMMENT_LENGTH + ' characters.');
  }
  if (!ensureDb()) return Promise.reject(new Error('offline'));

  var mentions = parseMentions(trimmed);
  var law = findLaw(lawId);
  var payload = {
    author: author,
    authorEmail: authorEmail || '',
    text: trimmed,
    mentions: mentions,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
  if (parentId) payload.parentId = parentId;

  return messagesRef(country, lawId).push().set(payload).then(function () {
    return refreshIndexMessageCount(country, lawId).then(function () {
      if (law) {
        return createMentionNotifications(
          { displayName: author, email: authorEmail },
          country,
          lawId,
          law.title,
          mentions
        );
      }
    });
  });
}

function formatTime(ts) {
  var time = typeof ts === 'object' && ts !== null ? Date.now() : ts;
  if (!time) return '';
  var diff = Date.now() - time;
  var mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + 'm ago';
  var hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  var days = Math.floor(hrs / 24);
  return days + 'd ago';
}

function formatAdminDate(ts) {
  if (!ts) return 'Unknown';
  var time = typeof ts === 'object' && ts !== null ? Date.now() : ts;
  return new Date(time).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRichText(text) {
  if (!text) return '';
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return sanitizeHtml(text);
  }
  return escapeHtml(text).replace(/\n/g, '<br>');
}

function formatMessageText(text) {
  var escaped = escapeHtml(text);
  escaped = escaped.replace(/@([A-Za-z0-9_.\- ]{2,32})/g, function (_, name) {
    return '<span class="mention-link">@' + name + '</span>';
  });
  return escaped;
}

var audioCtx =
  typeof AudioContext !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playSfx(type) {
  if (!audioCtx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  var now = audioCtx.currentTime;
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
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () {
    t.classList.remove('show');
  }, 2800);
}

function updateAuthUI() {
  var user = getUser();
  var guestButtons = document.getElementById('authGuestButtons');
  var profileBtn = document.getElementById('profileBtn');
  var notifBtn = document.getElementById('notificationsBtn');
  var adminBtn = document.getElementById('adminPanelBtn');
  var makePostBtn = document.getElementById('makePostBtn');

  if (user) {
    if (guestButtons) guestButtons.hidden = true;
    profileBtn.hidden = false;
    notifBtn.hidden = false;
    if (makePostBtn) makePostBtn.hidden = false;
    if (adminBtn) adminBtn.hidden = !isAdmin(user);
    watchNotifications(user.email);
  } else {
    if (guestButtons) guestButtons.hidden = false;
    profileBtn.hidden = true;
    notifBtn.hidden = true;
    if (makePostBtn) makePostBtn.hidden = true;
    if (adminBtn) adminBtn.hidden = true;
    stopWatchingNotifications();
    document.getElementById('notifBadge').hidden = true;
  }
}

function watchNotifications(email) {
  if (!ensureDb()) return;
  stopWatchingNotifications();
  notifListenerRef = notifRef(email);
  notifListenerRef.on('value', function (snapshot) {
    var unread = 0;
    snapshot.forEach(function (child) {
      if (!child.val().read) unread++;
    });
    var badge = document.getElementById('notifBadge');
    if (unread > 0) {
      badge.textContent = unread > 9 ? '9+' : String(unread);
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  });
}

function renderNotificationsList() {
  var user = getUser();
  if (!user || !ensureDb()) return;
  notifRef(user.email)
    .orderByChild('createdAt')
    .limitToLast(30)
    .once('value')
    .then(function (snapshot) {
      var list = document.getElementById('notifList');
      var items = [];
      snapshot.forEach(function (child) {
        items.unshift({ id: child.key, ...child.val() });
      });
      if (!items.length) {
        list.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.875rem;">No notifications yet.</p>';
        return;
      }
      list.innerHTML = items
        .map(function (n) {
          return (
            '<div class="notif-item' +
            (n.read ? '' : ' unread') +
            '" data-id="' +
            n.id +
            '" data-country="' +
            escapeHtml(n.country || '') +
            '" data-law="' +
            escapeHtml(n.lawId || '') +
            '">' +
            escapeHtml(n.text || '') +
            '<div class="message-time">' +
            formatTime(n.createdAt) +
            '</div></div>'
          );
        })
        .join('');

      list.querySelectorAll('.notif-item').forEach(function (el) {
        el.addEventListener('click', function () {
          var id = el.dataset.id;
          notifRef(user.email).child(id).update({ read: true });
          document.getElementById('notifOverlay').classList.remove('open');
          if (el.dataset.country && el.dataset.law) {
            selectCountry(el.dataset.country);
            setTimeout(function () {
              openLawDetail(el.dataset.country, el.dataset.law);
            }, 400);
          }
        });
      });
    });
}

function requireAuth(action) {
  if (!isLoggedIn()) {
    playSfx('open');
    openAuth('login');
    showToast('Please sign in to ' + action);
    return false;
  }
  if (isUserBannedLocally(getUser())) {
    showToast('Your account is banned');
    return false;
  }
  return true;
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
  document.getElementById('countryGroup').hidden = mode !== 'register';
  populateAuthCountrySelect();
  document.getElementById('authOverlay').classList.add('open');
  playSfx('open');
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('open');
}

function updateCharCounter() {
  var input = document.getElementById('messageInput');
  var counter = document.getElementById('messageCharCounter');
  if (!input || !counter) return;
  var len = input.value.length;
  counter.textContent = len + ' / ' + MAX_COMMENT_LENGTH;
  counter.classList.toggle('over', len > MAX_COMMENT_LENGTH);
}

function updateSummaryCounter() {
  var input = document.getElementById('lawSummary');
  var counter = document.getElementById('summaryCharCounter');
  if (!input || !counter) return;
  counter.textContent = input.value.length + ' / ' + MAX_SUMMARY_LENGTH;
}

function renderTagsHtml(tags) {
  if (!tags || !tags.length) return '';
  return (
    '<div class="law-tags">' +
    tags
      .slice(0, 5)
      .map(function (t) {
        return '<span class="law-tag-chip">' + escapeHtml(t) + '</span>';
      })
      .join('') +
    '</div>'
  );
}

function renderLawCard(law, i, countryName) {
  var user = getUser();
  var vote = user ? law.votes[emailKey(user.email)] : null;
  var commentCount = law.messages.length;
  var card = document.createElement('article');
  card.className = 'law-card';
  card.style.animationDelay = i * 0.07 + 's';
  card.dataset.lawId = law.id;
  card.dataset.country = countryName || currentCountry || '';
  card.innerHTML =
    '<div class="law-meta">' +
    '<div class="law-card-meta-row">' +
    '<span class="version-badge">v' +
    (law.version || 1) +
    '</span>' +
    '<span class="law-date">' +
    formatTime(law.createdAt) +
    '</span>' +
    '<span class="law-author">by ' +
    escapeHtml(law.author) +
    '</span>' +
    '</div></div>' +
    renderTagsHtml(law.tags) +
    '<h3 class="law-title">' +
    escapeHtml(law.title) +
    '</h3>' +
    '<p class="law-summary">' +
    escapeHtml(law.summary) +
    '</p>' +
    '<div class="law-actions">' +
    '<button class="reaction-btn ' +
    (vote === 'up' ? 'active-up' : '') +
    '" data-type="up" data-id="' +
    law.id +
    '">' +
    '<span class="emoji">👍</span> <span class="count">' +
    law.up +
    '</span></button>' +
    '<button class="reaction-btn ' +
    (vote === 'down' ? 'active-down' : '') +
    '" data-type="down" data-id="' +
    law.id +
    '">' +
    '<span class="emoji">👎</span> <span class="count">' +
    law.down +
    '</span></button>' +
    '<button class="discuss-btn" data-id="' +
    law.id +
    '">' +
    '<span class="emoji">💬</span> Discuss (' +
    commentCount +
    ')</button>' +
    '</div>';
  return card;
}

function bindLawEvents(panel, country) {
  panel.querySelector('#proposeLawBtn')?.addEventListener('click', function () {
    if (!requireAuth('propose laws')) return;
    openProposeModal(country);
  });

  var list = panel.querySelector('#lawsList');
  if (!list) return;

  list.querySelectorAll('.law-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.law-actions')) return;
      openLawDetail(country, card.dataset.lawId);
    });
  });

  list.querySelectorAll('.reaction-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!requireAuth('react')) return;
      var user = getUser();
      castVote(country, btn.dataset.id, user.email, btn.dataset.type)
        .then(function () {
          playSfx('click');
        })
        .catch(function (err) {
          showToast('Could not save vote');
          console.error(err);
        });
    });
  });

  list.querySelectorAll('.discuss-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!requireAuth('discuss')) return;
      openDiscussion(country, btn.dataset.id);
    });
  });

  panel.querySelectorAll('.filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeTagFilter = chip.dataset.tag === 'all' ? null : chip.dataset.tag;
      renderLawsUI(country, getFilteredLaws(currentLaws));
    });
  });

  panel.querySelector('#emptyProposeBtn')?.addEventListener('click', function () {
    if (!requireAuth('propose laws')) return;
    openProposeModal(country);
  });
}

function populateProposeCountrySelect() {
  var select = document.getElementById('proposeCountry');
  if (!select) return;
  if (select.options.length > 0) return;
  WORLD_COUNTRIES.forEach(function (country) {
    var opt = document.createElement('option');
    opt.value = country;
    opt.textContent = country;
    select.appendChild(opt);
  });
}

function adminDeleteLaw(country, lawId) {
  if (!isAdmin() || !ensureDb()) return;
  if (!confirm('Delete this post permanently? All comments and votes will be removed.')) return;
  lawRef(country, lawId)
    .remove()
    .then(function () {
      return indexRef().child(lawId).remove();
    })
    .then(function () {
      document.getElementById('detailOverlay').classList.remove('open');
      showToast('Post deleted');
      playSfx('success');
    })
    .catch(function (err) {
      showToast('Could not delete post');
      console.error(err);
    });
}

function adminDeleteComment(country, lawId, messageId) {
  if (!isAdmin() || !ensureDb()) return;
  if (!confirm('Delete this comment permanently?')) return;
  messagesRef(country, lawId)
    .child(messageId)
    .remove()
    .then(function () {
      return refreshIndexMessageCount(country, lawId);
    })
    .then(function () {
      showToast('Comment deleted');
      playSfx('click');
    })
    .catch(function (err) {
      showToast('Could not delete comment');
      console.error(err);
    });
}

function openMakePostFlow() {
  if (!requireAuth('create posts')) return;
  openProposeModal(currentCountry);
}

function openProposeModal(country) {
  selectedTags = [];
  populateProposeCountrySelect();
  var select = document.getElementById('proposeCountry');
  if (select) {
    select.value = country || currentCountry || select.options[0]?.value || '';
  }
  var targetCountry = select ? select.value : country || currentCountry || 'Germany';
  document.getElementById('proposeSub').textContent = 'Submit your idea for ' + targetCountry + '.';
  document.getElementById('lawTitle').value = '';
  document.getElementById('lawSummary').value = '';
  setEditorHtml('lawBodyEditor', '');
  document.getElementById('tagFilterInput').value = '';
  document.getElementById('includePoll').checked = true;
  renderTagPicker('tagPicker', selectedTags, '');
  updateSummaryCounter();
  document.getElementById('proposeOverlay').classList.add('open');
  playSfx('open');
}

function renderLawsUI(country, laws) {
  document.getElementById('emptyState').hidden = true;
  var panel = document.getElementById('lawsPanel');
  panel.hidden = false;

  var countText = laws.length === 1 ? '1 proposal' : laws.length + ' proposals';
  var allTags = [];
  currentLaws.forEach(function (l) {
    l.tags.forEach(function (t) {
      if (allTags.indexOf(t) === -1) allTags.push(t);
    });
  });

  var filterHtml = allTags.length
    ? '<div class="filter-bar">' +
      '<button type="button" class="filter-chip' +
      (!activeTagFilter ? ' active' : '') +
      '" data-tag="all">All</button>' +
      allTags
        .slice(0, 12)
        .map(function (t) {
          return (
            '<button type="button" class="filter-chip' +
            (activeTagFilter === t ? ' active' : '') +
            '" data-tag="' +
            escapeHtml(t) +
            '">' +
            escapeHtml(t) +
            '</button>'
          );
        })
        .join('') +
      '</div>'
    : '';

  panel.innerHTML =
    '<div class="country-header">' +
    '<div><h2>' +
    escapeHtml(country) +
    '</h2>' +
    '<p>' +
    (laws.length ? countText + ' from the community' : 'No proposals yet. Be the first!') +
    '</p></div>' +
    '<button class="btn btn-primary propose-btn" id="proposeLawBtn">+ Propose law</button>' +
    '</div>' +
    filterHtml +
    (laws.length
      ? '<div class="laws-list" id="lawsList"></div>'
      : '<div class="laws-empty"><h3>No laws proposed yet</h3>' +
        '<p>All content on Legis comes from community members. Be the first to suggest a regulation for ' +
        escapeHtml(country) +
        '.</p>' +
        '<button class="btn btn-primary" id="emptyProposeBtn">+ Propose the first law</button></div>');

  if (laws.length) {
    var listEl = panel.querySelector('#lawsList');
    laws.forEach(function (law, i) {
      listEl.appendChild(renderLawCard(law, i, country));
    });
  }

  bindLawEvents(panel, country);
}

function renderPollSection(law, country) {
  if (!law.poll || !law.poll.options) return '';
  var user = getUser();
  var userVote = user && law.poll.votes ? law.poll.votes[emailKey(user.email)] : null;
  var total = 0;
  Object.keys(law.poll.options).forEach(function (k) {
    total += law.poll.options[k].count || 0;
  });

  var optionsHtml = Object.keys(law.poll.options)
    .map(function (key) {
      var opt = law.poll.options[key];
      var count = opt.count || 0;
      var pct = total ? Math.round((count / total) * 100) : 0;
      return (
        '<div class="poll-option">' +
        '<button type="button" class="poll-vote-btn' +
        (userVote === key ? ' active' : '') +
        '" data-poll="' +
        key +
        '">' +
        escapeHtml(opt.text) +
        '</button>' +
        '<div class="poll-bar-wrap"><div class="poll-bar" style="width:' +
        pct +
        '%"></div>' +
        '<div class="poll-bar-label"><span>' +
        pct +
        '%</span><span>' +
        count +
        ' votes</span></div></div></div>'
      );
    })
    .join('');

  return '<div class="poll-section"><h4>Community poll</h4>' + optionsHtml + '</div>';
}

function bindPollEvents(container, country, lawId) {
  container.querySelectorAll('.poll-vote-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!requireAuth('vote in polls')) return;
      var user = getUser();
      castPollVote(country, lawId, user.email, btn.dataset.poll)
        .then(function () {
          playSfx('click');
          refreshLawDetail(country, lawId);
        })
        .catch(function (err) {
          showToast('Could not save poll vote');
          console.error(err);
        });
    });
  });
}

function openLawDetail(country, lawId) {
  var law = findLaw(lawId);
  if (!law && ensureDb()) {
    lawRef(country, lawId)
      .once('value')
      .then(function (snap) {
        if (snap.val()) openLawDetailWithLaw(country, lawId, parseLaw(lawId, snap.val()));
      });
    return;
  }
  if (!law) return;
  openLawDetailWithLaw(country, lawId, law);
}

function openLawDetailWithLaw(country, lawId, law) {
  activeDetailCountry = country;
  activeDetailLawId = lawId;
  readingMode = false;
  document.getElementById('detailModal').classList.remove('reading-mode');

  var user = getUser();
  var canEdit = user && law.authorEmail && emailKey(user.email) === emailKey(law.authorEmail);
  document.getElementById('editLawBtn').hidden = !canEdit;
  document.getElementById('adminDeleteLawBtn').hidden = !isAdmin();

  var content = document.getElementById('detailContent');
  content.innerHTML =
    renderTagsHtml(law.tags) +
    '<h3 style="font-family:var(--font-display);font-size:1.75rem;font-weight:400;margin-bottom:0.35rem;">' +
    escapeHtml(law.title) +
    '</h3>' +
    '<p style="font-size:0.8rem;color:var(--text-tertiary);margin-bottom:0.75rem;">' +
    'v' +
    (law.version || 1) +
    ' · by ' +
    escapeHtml(law.author) +
    ' · ' +
    formatTime(law.updatedAt || law.createdAt) +
    '</p>' +
    '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;font-weight:500;">' +
    escapeHtml(law.summary) +
    '</p>' +
    '<div class="law-detail-body">' +
    renderRichText(law.body) +
    '</div>' +
    renderPollSection(law, country) +
    '<div class="law-detail-actions detail-toolbar" style="border:none;padding:0;margin-top:1rem;">' +
    '<button type="button" class="reaction-btn" id="detailUpBtn">👍 ' +
    law.up +
    '</button>' +
    '<button type="button" class="reaction-btn" id="detailDownBtn">👎 ' +
    law.down +
    '</button></div>';

  bindPollEvents(content, country, lawId);
  document.getElementById('versionHistoryPanel').hidden = true;
  document.getElementById('detailOverlay').classList.add('open');
  playSfx('open');
}

function refreshLawDetail(country, lawId) {
  lawRef(country, lawId)
    .once('value')
    .then(function (snap) {
      if (snap.val()) openLawDetailWithLaw(country, lawId, parseLaw(lawId, snap.val()));
    });
}

function renderVersionHistory(law) {
  var panel = document.getElementById('versionHistoryPanel');
  var versions = law.versions || {};
  var keys = Object.keys(versions).sort(function (a, b) {
    return Number(b) - Number(a);
  });
  if (!keys.length) {
    panel.hidden = true;
    return;
  }
  panel.hidden = false;
  panel.innerHTML =
    '<h4 style="margin-bottom:0.65rem;font-size:0.9rem;">Version history</h4>' +
    keys
      .map(function (k) {
        var v = versions[k];
        return (
          '<div class="version-item"><strong>Version ' +
          k +
          '</strong> · ' +
          escapeHtml(v.editedBy || '') +
          ' · ' +
          formatTime(v.editedAt) +
          (v.note ? '<br><em>' + escapeHtml(v.note) + '</em>' : '') +
          '</div>'
        );
      })
      .join('');
}

function buildMessageTree(messages) {
  var map = {};
  messages.forEach(function (m) {
    map[m.id] = { ...m, children: [] };
  });
  var roots = [];
  messages.forEach(function (m) {
    if (m.parentId && map[m.parentId]) {
      map[m.parentId].children.push(map[m.id]);
    } else {
      roots.push(map[m.id]);
    }
  });
  return roots;
}

function renderMessageNode(node, depth) {
  var replyClass = depth > 0 ? ' reply' : '';
  var adminDeleteBtn = isAdmin()
    ? '<button type="button" class="message-action-btn admin-delete-msg" data-id="' +
      node.id +
      '">Delete</button>'
    : '';
  var html =
    '<div class="message' +
    replyClass +
    '" data-id="' +
    node.id +
    '">' +
    '<div class="message-author">' +
    escapeHtml(node.author) +
    '</div>' +
    '<div class="message-text">' +
    formatMessageText(node.text) +
    '</div>' +
    '<div class="message-time">' +
    formatTime(node.createdAt) +
    '</div>' +
    '<div class="message-actions">' +
    '<button type="button" class="message-action-btn reply-btn" data-id="' +
    node.id +
    '" data-author="' +
    escapeHtml(node.author) +
    '">Reply</button>' +
    adminDeleteBtn +
    '</div></div>';

  node.children.forEach(function (child) {
    html += renderMessageNode(child, depth + 1);
  });
  return html;
}

function renderThreadMessages(messages) {
  var thread = document.getElementById('threadMessages');
  if (!messages.length) {
    thread.innerHTML = '<div class="thread-empty">No messages yet. Start the discussion!</div>';
    return;
  }
  var tree = buildMessageTree(messages);
  thread.innerHTML = tree.map(function (n) {
    return renderMessageNode(n, 0);
  }).join('');
  thread.scrollTop = thread.scrollHeight;

  thread.querySelectorAll('.reply-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      replyToMessageId = btn.dataset.id;
      replyToAuthor = btn.dataset.author;
      document.getElementById('replyIndicator').hidden = false;
      document.getElementById('replyToName').textContent = replyToAuthor;
      document.getElementById('messageInput').focus();
    });
  });

  thread.querySelectorAll('.admin-delete-msg').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (currentCountry && activeLawId) {
        adminDeleteComment(currentCountry, activeLawId, btn.dataset.id);
      }
    });
  });
}

function clearReply() {
  replyToMessageId = null;
  replyToAuthor = null;
  document.getElementById('replyIndicator').hidden = true;
}

function openDiscussion(country, lawId) {
  var law = findLaw(lawId);
  if (!law && ensureDb()) {
    lawRef(country, lawId)
      .once('value')
      .then(function (snap) {
        if (snap.val()) {
          var parsed = parseLaw(lawId, snap.val());
          if (currentCountry === country) {
            var idx = currentLaws.findIndex(function (l) {
              return l.id === lawId;
            });
            if (idx === -1) currentLaws.push(parsed);
          }
          openDiscussionWithLaw(country, lawId, parsed);
        }
      });
    return;
  }
  if (!law) return;
  openDiscussionWithLaw(country, lawId, law);
}

function openDiscussionWithLaw(country, lawId, law) {
  activeLawId = lawId;
  clearReply();
  document.getElementById('discussTitle').textContent = law.title;
  document.getElementById('discussSub').textContent =
    'Threaded discussion. Use @DisplayName to mention someone. Max ' + MAX_COMMENT_LENGTH + ' characters.';
  document.getElementById('messageInput').value = '';
  updateCharCounter();
  document.getElementById('discussOverlay').classList.add('open');
  playSfx('open');

  stopWatchingMessages();
  messagesListenerRef = messagesRef(country, lawId);
  messagesListenerRef.on('value', function (snapshot) {
    var messages = [];
    snapshot.forEach(function (child) {
      messages.push({ id: child.key, ...child.val() });
    });
    messages.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });
    renderThreadMessages(messages);
  });
}

function renderHomeFeed() {
  var feedList = document.getElementById('feedList');
  if (!feedList || currentCountry) return;

  var items = globalIndex.slice();
  if (currentFeedMode === 'trending') {
    items.sort(function (a, b) {
      return (b.hotScore || 0) - (a.hotScore || 0);
    });
  } else {
    items.sort(function (a, b) {
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  items = items.slice(0, 12);
  if (!items.length) {
    feedList.innerHTML =
      '<p style="color:var(--text-tertiary);font-size:0.875rem;">No proposals yet. Select a country and be the first to post!</p>';
    return;
  }

  feedList.innerHTML =
    '<div class="laws-list">' +
    items
      .map(function (item, i) {
        return (
          '<article class="law-card" data-law="' +
          item.lawId +
          '" data-country="' +
          escapeHtml(item.country) +
          '" style="animation-delay:' +
          i * 0.05 +
          's">' +
          renderTagsHtml(item.tags) +
          '<div class="law-meta"><span class="law-tag hot">' +
          escapeHtml(item.country) +
          '</span><span class="law-date">' +
          formatTime(item.createdAt) +
          '</span></div>' +
          '<h3 class="law-title">' +
          escapeHtml(item.title) +
          '</h3>' +
          '<p class="law-summary">' +
          escapeHtml(item.summary) +
          '</p>' +
          '<div class="law-actions"><span style="font-size:0.75rem;color:var(--text-tertiary);">👍 ' +
          (item.up || 0) +
          ' · 💬 ' +
          (item.messageCount || 0) +
          '</span>' +
          '<button type="button" class="discuss-btn feed-open-btn" data-law="' +
          item.lawId +
          '" data-country="' +
          escapeHtml(item.country) +
          '">Open</button></div></article>'
        );
      })
      .join('') +
    '</div>';

  feedList.querySelectorAll('.law-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.feed-open-btn')) return;
      selectCountry(card.dataset.country);
      setTimeout(function () {
        openLawDetail(card.dataset.country, card.dataset.law);
      }, 300);
    });
  });

  feedList.querySelectorAll('.feed-open-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      selectCountry(btn.dataset.country);
      setTimeout(function () {
        openLawDetail(btn.dataset.country, btn.dataset.law);
      }, 300);
    });
  });
}

function updateSearchIfOpen() {
  var input = document.getElementById('globalSearch');
  if (input && input.value.trim()) performGlobalSearch(input.value.trim());
}

function performGlobalSearch(query) {
  var dropdown = document.getElementById('searchResults');
  var q = query.toLowerCase();
  var results = globalIndex
    .filter(function (item) {
      return (
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.summary && item.summary.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(function (t) {
          return t.toLowerCase().includes(q);
        }))
      );
    })
    .slice(0, 10);

  if (!results.length) {
    dropdown.innerHTML = '<div style="padding:0.75rem;font-size:0.8rem;color:var(--text-tertiary);">No results</div>';
    dropdown.classList.add('open');
    return;
  }

  dropdown.innerHTML = results
    .map(function (item) {
      return (
        '<button type="button" class="search-result-item" data-law="' +
        item.lawId +
        '" data-country="' +
        escapeHtml(item.country) +
        '"><strong>' +
        escapeHtml(item.title) +
        '</strong><span>' +
        escapeHtml(item.country) +
        ' · ' +
        escapeHtml(item.summary).slice(0, 80) +
        '</span></button>'
      );
    })
    .join('');
  dropdown.classList.add('open');

  dropdown.querySelectorAll('.search-result-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      dropdown.classList.remove('open');
      document.getElementById('globalSearch').value = '';
      selectCountry(btn.dataset.country);
      setTimeout(function () {
        openLawDetail(btn.dataset.country, btn.dataset.law);
      }, 300);
    });
  });
}

function computeUserProfileStats(user) {
  var posts = globalIndex.filter(function (item) {
    return item.author === user.displayName;
  });
  var likes = posts.reduce(function (sum, item) {
    return sum + (item.up || 0);
  }, 0);
  return { posts: posts, postCount: posts.length, likes: likes };
}

function countUserComments(user) {
  if (!ensureDb()) return Promise.resolve(0);
  var count = 0;
  var promises = globalIndex.map(function (item) {
    return messagesRef(item.country, item.lawId).once('value').then(function (snap) {
      snap.forEach(function (child) {
        var val = child.val();
        if (val.authorEmail === user.email || val.author === user.displayName) {
          count++;
        }
      });
    });
  });
  return Promise.all(promises).then(function () {
    return count;
  });
}

function renderProfilePostsList(posts) {
  var list = document.getElementById('profilePostsList');
  if (!list) return;
  if (!posts.length) {
    list.innerHTML =
      '<p style="color:var(--text-tertiary);font-size:0.8rem;">No posts yet.</p>';
    list.hidden = false;
    return;
  }
  list.innerHTML = posts
    .map(function (post) {
      return (
        '<button type="button" class="profile-post-item" data-law="' +
        post.lawId +
        '" data-country="' +
        escapeHtml(post.country) +
        '"><strong>' +
        escapeHtml(post.title) +
        '</strong><span>' +
        escapeHtml(post.country) +
        ' · 👍 ' +
        (post.up || 0) +
        ' · 💬 ' +
        (post.messageCount || 0) +
        '</span></button>'
      );
    })
    .join('');
  list.hidden = false;

  list.querySelectorAll('.profile-post-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('profileOverlay').classList.remove('open');
      selectCountry(btn.dataset.country);
      setTimeout(function () {
        openLawDetail(btn.dataset.country, btn.dataset.law);
      }, 350);
    });
  });
}

function openProfileModal() {
  var user = getUser();
  if (!user) return;
  document.getElementById('profileName').textContent = user.displayName;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profilePostsCount').textContent = '…';
  document.getElementById('profileCommentsCount').textContent = '…';
  document.getElementById('profileLikesCount').textContent = '…';
  document.getElementById('profilePostsList').hidden = true;
  document.getElementById('profileOverlay').classList.add('open');
  playSfx('open');

  var stats = computeUserProfileStats(user);
  profileUserPosts = stats.posts;
  document.getElementById('profilePostsCount').textContent = String(stats.postCount);
  document.getElementById('profileLikesCount').textContent = String(stats.likes);

  countUserComments(user).then(function (commentCount) {
    document.getElementById('profileCommentsCount').textContent = String(commentCount);
  });
}

function escapeLegalHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildOperatorContactHtml() {
  var email = escapeLegalHtml(LEGAL_OPERATOR.email);
  return (
    '<p><strong>' +
    escapeLegalHtml(LEGAL_OPERATOR.publicLabel) +
    '</strong><br>' +
    'Email: <a href="mailto:' +
    email +
    '">' +
    email +
    '</a></p>' +
    '<p class="rule-note">Legis is a private, non-commercial community project. The operator does not publish a home address on this website. For data protection requests or legal contact, use the email above.</p>'
  );
}

function buildPrivacyPolicyHtml() {
  var email = escapeLegalHtml(LEGAL_OPERATOR.email);
  return (
    '<p>This privacy policy explains how personal data is processed when you use <strong>Legis</strong>, in accordance with the EU General Data Protection Regulation (GDPR / DSGVO).</p>' +
    '<h4>1. Controller</h4>' +
    '<p>The data controller is the private operator of Legis (non-commercial community website, no fees, no revenue from users):</p>' +
    buildOperatorContactHtml() +
    '<h4>2. Nature of the service</h4>' +
    '<p>Legis is a free community platform for fictional law proposals and discussion. It is not operated by a company or government. We do not sell products, subscriptions, or advertising.</p>' +
    '<h4>3. Categories of personal data</h4>' +
    '<ul>' +
    '<li><strong>Account data:</strong> display name and email address when you register.</li>' +
    '<li><strong>User content:</strong> law proposals, discussion comments, and votes you submit.</li>' +
    '<li><strong>Local browser storage (localStorage):</strong> your login session (display name, email) is stored in your browser so you stay signed in. This is <strong>not</strong> a cookie.</li>' +
    '<li><strong>Technical data:</strong> when you load the site, Google Firebase Realtime Database may process connection data such as IP address, timestamps, and device/browser information for security and delivery of the service. This happens over HTTPS/WebSocket and does not use tracking cookies in our setup.</li>' +
    '</ul>' +
    '<p>We do not require your real name, postal address, or government ID to use Legis.</p>' +
    '<h4>4. Purposes and legal bases (Art. 6 GDPR)</h4>' +
    '<ul>' +
    '<li><strong>Providing the platform</strong> (account, posting, voting): Art. 6(1)(b) GDPR.</li>' +
    '<li><strong>Operating and securing the website</strong>: Art. 6(1)(f) GDPR.</li>' +
    '<li><strong>Registration:</strong> Art. 6(1)(a) GDPR where consent is required.</li>' +
    '</ul>' +
    '<h4>5. Storage duration</h4>' +
    '<p>Account and content data are stored until you request deletion or we remove it for rule violations.</p>' +
    '<h4>6. Recipients and processors</h4>' +
    '<p>Data is stored in <strong>Google Firebase Realtime Database</strong> (region: europe-west1).</p>' +
    '<h4>7. Cookies and local storage</h4>' +
    '<p><strong>We do not use cookies.</strong> Login data is stored in localStorage only. Firebase Realtime Database does not set cookies for this website.</p>' +
    '<h4>8. Your rights</h4>' +
    '<p>Contact <a href="mailto:' +
    email +
    '">' +
    email +
    '</a> to exercise GDPR rights (access, erasure, rectification, etc.).</p>' +
    '<p><strong>Last updated:</strong> July 2026</p>'
  );
}

var INFO_PAGES = {
  about: {
    title: 'About us',
    sub: 'What Legis is and who it is for.',
    html:
      '<p><strong>Legis</strong> is an independent, community-driven platform where people from around the world can propose ideas for new regulations, discuss them openly, and react to proposals from others.</p>' +
      '<p>We are <strong>not</strong> a government website. Nothing published here is official law.</p>',
  },
  rules: {
    title: 'Rules',
    sub: 'Official community standards.',
    html: '<p>See full rules in the Rules section of the footer. Be respectful, no calls for harm, no spam.</p>',
  },
  terms: {
    title: 'Terms',
    sub: 'Terms of use.',
    html:
      '<p>Legis is a free private community project. By using it you agree to our rules and privacy policy.</p>' +
      '<p><strong>No cookies:</strong> Login uses localStorage only.</p>',
  },
  privacy: {
    title: 'Privacy policy (GDPR / DSGVO)',
    sub: 'How we handle your data.',
    html: buildPrivacyPolicyHtml(),
  },
  contact: {
    title: 'Contact',
    sub: 'Support and inquiries.',
    html:
      '<p><strong>Support email:</strong><br><a href="mailto:legissupport@gmail.com">legissupport@gmail.com</a></p>',
  },
};

function openInfoPage(key) {
  var page = INFO_PAGES[key];
  if (!page) return;
  document.getElementById('infoTitle').textContent = page.title;
  document.getElementById('infoSub').textContent = page.sub;
  document.getElementById('infoBody').innerHTML = page.html;
  document.getElementById('infoOverlay').classList.add('open');
  playSfx('open');
}

/* DOM Init */
var countryList = document.getElementById('countryList');
var countrySearch = document.getElementById('countrySearch');
var countrySearchClear = document.getElementById('countrySearchClear');
var countryNoResults = document.getElementById('countryNoResults');

function filterCountries(query) {
  var q = query.trim().toLowerCase();
  var items = countryList.querySelectorAll('li');
  var visible = 0;
  items.forEach(function (li) {
    var name = li.dataset.country || '';
    var match = !q || name.toLowerCase().includes(q);
    li.classList.toggle('hidden', !match);
    if (match) visible += 1;
  });
  countryNoResults.classList.toggle('visible', q.length > 0 && visible === 0);
  countrySearchClear.classList.toggle('visible', q.length > 0);
}

WORLD_COUNTRIES.forEach(function (country, i) {
  var li = document.createElement('li');
  li.dataset.country = country;
  var btn = document.createElement('button');
  btn.className = 'country-link';
  btn.textContent = country;
  btn.style.animationDelay = i * 0.02 + 's';
  btn.addEventListener('click', function () {
    playSfx('click');
    document.querySelectorAll('.country-link').forEach(function (l) {
      l.classList.remove('active');
    });
    btn.classList.add('active');
    selectCountry(country);
  });
  li.appendChild(btn);
  countryList.appendChild(li);
});

countrySearch.addEventListener('input', function () {
  filterCountries(countrySearch.value);
});
countrySearchClear.addEventListener('click', function () {
  countrySearch.value = '';
  filterCountries('');
  countrySearch.focus();
  playSfx('click');
});

document.querySelectorAll('.feed-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.feed-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');
    currentFeedMode = tab.dataset.feed;
    renderHomeFeed();
    playSfx('click');
  });
});

document.getElementById('globalSearch').addEventListener('input', function (e) {
  var q = e.target.value.trim();
  if (q.length < 2) {
    document.getElementById('searchResults').classList.remove('open');
    return;
  }
  performGlobalSearch(q);
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.header-search-wrap')) {
    document.getElementById('searchResults').classList.remove('open');
  }
});

document.getElementById('loginBtn').addEventListener('click', function () {
  openAuth('login');
});
document.getElementById('registerBtn').addEventListener('click', function () {
  openAuth('register');
});
document.getElementById('profileBtn').addEventListener('click', openProfileModal);
document.getElementById('profilePostsBtn').addEventListener('click', function () {
  renderProfilePostsList(profileUserPosts);
});
document.getElementById('makePostBtn').addEventListener('click', openMakePostFlow);
document.getElementById('adminDeleteLawBtn').addEventListener('click', function () {
  if (activeDetailCountry && activeDetailLawId) {
    adminDeleteLaw(activeDetailCountry, activeDetailLawId);
  }
});
document.getElementById('proposeCountry').addEventListener('change', function (e) {
  document.getElementById('proposeSub').textContent = 'Submit your idea for ' + e.target.value + '.';
});
document.getElementById('adminPanelBtn').addEventListener('click', openAdminPanel);
document.getElementById('adminClose').addEventListener('click', function () {
  closeAdminPanel();
  playSfx('click');
});
document.getElementById('adminDismiss').addEventListener('click', function () {
  closeAdminPanel();
  playSfx('click');
});
document.getElementById('adminOverlay').addEventListener('click', function (e) {
  if (!e.target.closest('.modal')) {
    closeAdminPanel();
    playSfx('click');
  }
});
document.getElementById('adminUserSearch').addEventListener('input', function (e) {
  if (!isAdmin()) return;
  loadAllUsers().then(function (users) {
    renderAdminUserList(users, e.target.value);
  });
});
document.getElementById('notificationsBtn').addEventListener('click', function () {
  renderNotificationsList();
  document.getElementById('notifOverlay').classList.add('open');
  playSfx('open');
});
document.getElementById('profileClose').addEventListener('click', function () {
  document.getElementById('profileOverlay').classList.remove('open');
});
document.getElementById('notifDismiss').addEventListener('click', function () {
  document.getElementById('notifOverlay').classList.remove('open');
  playSfx('click');
});
document.getElementById('notifClose').addEventListener('click', function () {
  document.getElementById('notifOverlay').classList.remove('open');
  playSfx('click');
});
document.getElementById('notifOverlay').addEventListener('click', function (e) {
  if (!e.target.closest('.modal')) {
    document.getElementById('notifOverlay').classList.remove('open');
    playSfx('click');
  }
});
document.getElementById('profileOverlay').addEventListener('click', function (e) {
  if (!e.target.closest('.modal')) {
    document.getElementById('profileOverlay').classList.remove('open');
    playSfx('click');
  }
});
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem(USER_STORAGE_KEY);
  updateAuthUI();
  document.getElementById('profileOverlay').classList.remove('open');
  showToast('Signed out');
});

document.getElementById('authCancel').addEventListener('click', closeAuth);
document.getElementById('authOverlay').addEventListener('click', function (e) {
  if (e.target === e.currentTarget) closeAuth();
});
document.getElementById('authSubmit').addEventListener('click', function () {
  var email = document.getElementById('authEmail').value.trim();
  var password = document.getElementById('authPassword').value.trim();
  var name = document.getElementById('authName').value.trim();
  var country = document.getElementById('authCountry').value;
  if (!email || !password) {
    showToast('Please fill in email and password');
    return;
  }
  if (authMode === 'register') {
    if (!name) {
      showToast('Please enter a display name');
      return;
    }
    if (!country) {
      showToast('Please select your country');
      return;
    }
  }

  function finishAuth(data) {
    if (data && data.banned) {
      showToast('This account has been banned.');
      return;
    }

    var user = {
      email: email,
      displayName: authMode === 'register' ? name : data ? data.displayName : email.split('@')[0],
      country: authMode === 'register' ? country : data ? data.country || '' : '',
      banned: false,
    };

    registerUserProfile(user, authMode === 'register').then(function () {
      saveUser(user);
      closeAuth();
      playSfx('success');
      showToast(authMode === 'login' ? 'Welcome back!' : 'Account created. Welcome!');
      updateAuthUI();
    });
  }

  if (authMode === 'register') {
    displayNameRef(name).once('value').then(function (snap) {
      if (snap.val() && snap.val() !== emailKey(email)) {
        showToast('Display name already taken');
        return;
      }
      fetchUserProfile(email).then(finishAuth);
    });
    return;
  }

  fetchUserProfile(email).then(finishAuth);
});

document.getElementById('discussClose').addEventListener('click', function () {
  document.getElementById('discussOverlay').classList.remove('open');
  stopWatchingMessages();
  activeLawId = null;
  clearReply();
});
document.getElementById('discussOverlay').addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    document.getElementById('discussOverlay').classList.remove('open');
    stopWatchingMessages();
    activeLawId = null;
    clearReply();
  }
});
document.getElementById('cancelReply').addEventListener('click', clearReply);
document.getElementById('messageInput').addEventListener('input', updateCharCounter);
document.getElementById('sendMessage').addEventListener('click', function () {
  if (!currentCountry || !activeLawId) return;
  var text = document.getElementById('messageInput').value;
  if (!text.trim()) return;
  if (text.length > MAX_COMMENT_LENGTH) {
    showToast('Max ' + MAX_COMMENT_LENGTH + ' characters');
    return;
  }
  var user = getUser();
  postComment(currentCountry, activeLawId, user.displayName, user.email, text, replyToMessageId)
    .then(function () {
      document.getElementById('messageInput').value = '';
      clearReply();
      updateCharCounter();
      playSfx('success');
      showToast('Message posted');
    })
    .catch(function (err) {
      showToast(err.message || 'Could not post comment');
    });
});

document.getElementById('proposeClose').addEventListener('click', function () {
  document.getElementById('proposeOverlay').classList.remove('open');
});
document.getElementById('proposeOverlay').addEventListener('click', function (e) {
  if (e.target === e.currentTarget) document.getElementById('proposeOverlay').classList.remove('open');
});

document.getElementById('lawSummary').addEventListener('input', updateSummaryCounter);
document.getElementById('tagFilterInput').addEventListener('input', function (e) {
  renderTagPicker('tagPicker', selectedTags, e.target.value);
});

bindRteToolbar(document.querySelector('#proposeOverlay .rte-toolbar'), 'lawBodyEditor', 'rteLinkBtn');
bindRteToolbar(document.getElementById('editRteToolbar'), 'editLawBodyEditor', 'editRteLinkBtn');

document.getElementById('submitLaw').addEventListener('click', function () {
  var country = document.getElementById('proposeCountry').value || currentCountry;
  if (!country) {
    showToast('Please select a country');
    return;
  }
  if (!requireAuth('propose laws')) return;

  var title = document.getElementById('lawTitle').value.trim();
  var summary = document.getElementById('lawSummary').value.trim();
  var body = getEditorHtml('lawBodyEditor') || summary;
  if (!title || !summary) {
    showToast('Please fill in title and summary');
    return;
  }
  if (summary.length > MAX_SUMMARY_LENGTH) {
    showToast('Summary too long');
    return;
  }

  var user = getUser();
  var poll = document.getElementById('includePoll').checked ? defaultPoll() : null;

  addLawToFirebase(country, {
    title: title,
    summary: summary,
    body: body,
    author: user.displayName,
    authorEmail: user.email,
    tags: selectedTags.slice(),
    poll: poll,
  })
    .then(function () {
      document.getElementById('proposeOverlay').classList.remove('open');
      if (currentCountry !== country) {
        selectCountry(country);
      }
      playSfx('success');
      showToast('Proposal published!');
    })
    .catch(function (err) {
      showToast('Could not publish proposal');
      console.error(err);
    });
});

document.getElementById('detailClose').addEventListener('click', function () {
  document.getElementById('detailOverlay').classList.remove('open');
});
document.getElementById('detailOverlay').addEventListener('click', function (e) {
  if (e.target === e.currentTarget) document.getElementById('detailOverlay').classList.remove('open');
});
document.getElementById('readingModeBtn').addEventListener('click', function () {
  readingMode = !readingMode;
  document.getElementById('detailModal').classList.toggle('reading-mode', readingMode);
  document.getElementById('readingModeBtn').textContent = readingMode ? 'Exit reading mode' : 'Reading mode';
});
document.getElementById('detailDiscussBtn').addEventListener('click', function () {
  if (activeDetailCountry && activeDetailLawId) {
    document.getElementById('detailOverlay').classList.remove('open');
    openDiscussion(activeDetailCountry, activeDetailLawId);
  }
});
document.getElementById('versionHistoryBtn').addEventListener('click', function () {
  var law = findLaw(activeDetailLawId);
  if (!law && activeDetailCountry && activeDetailLawId) {
    lawRef(activeDetailCountry, activeDetailLawId)
      .once('value')
      .then(function (snap) {
        if (snap.val()) renderVersionHistory(parseLaw(activeDetailLawId, snap.val()));
      });
    return;
  }
  if (law) renderVersionHistory(law);
});
document.getElementById('editLawBtn').addEventListener('click', function () {
  var law = findLaw(activeDetailLawId);
  if (!law) return;
  editSelectedTags = law.tags.slice();
  document.getElementById('editLawTitle').value = law.title;
  document.getElementById('editLawSummary').value = law.summary;
  setEditorHtml('editLawBodyEditor', law.body);
  document.getElementById('editChangeNote').value = '';
  document.getElementById('editOverlay').classList.add('open');
});
document.getElementById('editClose').addEventListener('click', function () {
  document.getElementById('editOverlay').classList.remove('open');
});
document.getElementById('saveEditLaw').addEventListener('click', function () {
  if (!activeDetailCountry || !activeDetailLawId) return;
  var user = getUser();
  var title = document.getElementById('editLawTitle').value.trim();
  var summary = document.getElementById('editLawSummary').value.trim();
  var body = getEditorHtml('editLawBodyEditor') || summary;
  var note = document.getElementById('editChangeNote').value.trim();
  if (!title || !summary) {
    showToast('Title and summary required');
    return;
  }
  updateLawVersion(
    activeDetailCountry,
    activeDetailLawId,
    {
      title: title,
      summary: summary,
      body: body,
      tags: editSelectedTags,
      editedBy: user.displayName,
    },
    note
  )
    .then(function () {
      document.getElementById('editOverlay').classList.remove('open');
      refreshLawDetail(activeDetailCountry, activeDetailLawId);
      showToast('New version saved');
      playSfx('success');
    })
    .catch(function (err) {
      showToast('Could not save');
      console.error(err);
    });
});

document.getElementById('logoHome').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelectorAll('.country-link').forEach(function (l) {
    l.classList.remove('active');
  });
  document.getElementById('emptyState').hidden = false;
  document.getElementById('lawsPanel').hidden = true;
  stopWatchingLaws();
  stopWatchingMessages();
  currentCountry = null;
  currentLaws = [];
  activeLawId = null;
  renderHomeFeed();
  playSfx('click');
});

document.querySelectorAll('.footer-link[data-info]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    openInfoPage(btn.dataset.info);
  });
});
document.getElementById('infoClose').addEventListener('click', function () {
  document.getElementById('infoOverlay').classList.remove('open');
});
document.getElementById('infoOverlay').addEventListener('click', function (e) {
  if (e.target === e.currentTarget) document.getElementById('infoOverlay').classList.remove('open');
});

renderTagPicker('tagPicker', selectedTags, '');
populateAuthCountrySelect();
populateProposeCountrySelect();
initFirebase();
updateAuthUI();
verifyUserSession();
updateCharCounter();
updateSummaryCounter();
