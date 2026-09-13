const form = document.getElementById("authForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitButton");
const submitText = document.getElementById("submitText");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const username = document.getElementById("username");
const loginUsername = document.getElementById("loginUsername");
const confirmPassword = document.getElementById("confirmPassword");
const onlineCount = document.getElementById("onlineCount");

let mode = "login";

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message show ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

function setMode(nextMode) {
  mode = nextMode;
  document.body.classList.toggle("register-mode", mode === "register");
  loginTab.classList.toggle("active", mode === "login");
  registerTab.classList.toggle("active", mode === "register");
  form.reset();
  clearMessage();

  password.type = "password";
  togglePassword.textContent = "SHOW";
  togglePassword.setAttribute("aria-label", "Show password");
}

loginTab.addEventListener("click", () => setMode("login"));
registerTab.addEventListener("click", () => setMode("register"));

togglePassword.addEventListener("click", () => {
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  togglePassword.textContent = visible ? "SHOW" : "HIDE";
  togglePassword.setAttribute("aria-label", visible ? "Show password" : "Hide password");
});

function validUsername(value) {
  return /^[A-Za-z0-9_]{3,16}$/.test(value);
}

function validPassword(value) {
  return value.length >= 6;
}

/*
  DEMO ACCOUNT STORAGE
  --------------------
  This is intentionally a frontend prototype.

  DO NOT use localStorage as the real authentication system
  for a production game. A real version should send credentials
  over HTTPS to a backend, hash passwords server-side and create
  secure sessions/tokens.

  The structure below makes it easy to replace this section later.
*/

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem("nexo_accounts") || "{}");
  } catch {
    return {};
  }
}

function saveAccounts(accounts) {
  localStorage.setItem("nexo_accounts", JSON.stringify(accounts));
}

function registerAccount(name, pass) {
  const accounts = getAccounts();
  const key = name.toLowerCase();

  if (accounts[key]) {
    return { ok: false, error: "That username is already taken." };
  }

  accounts[key] = {
    username: name,
    password: pass,
    createdAt: Date.now()
  };

  saveAccounts(accounts);
  return { ok: true };
}

function loginAccount(name, pass) {
  const accounts = getAccounts();
  const account = accounts[name.toLowerCase()];

  if (!account || account.password !== pass) {
    return { ok: false, error: "Incorrect username or password." };
  }

  return { ok: true, username: account.username };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  if (mode === "register") {
    const name = username.value.trim();
    const pass = password.value;
    const confirm = confirmPassword.value;

    if (!validUsername(name)) {
      showMessage("Username must be 3–16 characters and may only contain letters, numbers and underscores.");
      username.focus();
      return;
    }

    if (!validPassword(pass)) {
      showMessage("Password must contain at least 6 characters.");
      password.focus();
      return;
    }

    if (pass !== confirm) {
      showMessage("The passwords do not match.");
      confirmPassword.focus();
      return;
    }

    const result = registerAccount(name, pass);

    if (!result.ok) {
      showMessage(result.error);
      username.focus();
      return;
    }

    sessionStorage.setItem("nexo_user", name);
    showMessage("Account created. Welcome to NEXO.", "success");

    setTimeout(() => {
      window.location.href = "game.html";
    }, 600);

  } else {
    const name = loginUsername.value.trim();
    const pass = password.value;

    if (!name || !pass) {
      showMessage("Enter your username and password.");
      return;
    }

    const result = loginAccount(name, pass);

    if (!result.ok) {
      showMessage(result.error);
      return;
    }

    sessionStorage.setItem("nexo_user", result.username);
    showMessage(`Welcome back, ${result.username}.`, "success");

    setTimeout(() => {
      window.location.href = "game.html";
    }, 600);
  }
});

// Small ambient online counter.
setInterval(() => {
  const current = Number(onlineCount.textContent.replace(",", ""));
  const next = Math.max(1200, current + Math.floor(Math.random() * 7) - 3);
  onlineCount.textContent = next.toLocaleString("en-US");
}, 4000);

// If a previous session exists, keep the username ready.
const savedUser = sessionStorage.getItem("nexo_user");
if (savedUser) {
  loginUsername.value = savedUser;
}
