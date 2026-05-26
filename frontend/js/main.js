
// --- Navbar Scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- Hamburger Menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(13,27,42,0.98)';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '16px';
  });
}

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.feature-card, .subject-card, .testimonial-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// --- Toast Notification ---
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- Auth: Local Storage Simulation ---
const API_BASE = 'http://localhost:8080/api';

// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      classLevel: document.getElementById('classLevel').value,
      village: document.getElementById('village')?.value || '',
      language: document.getElementById('language')?.value || ''
    };
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        showToast('✅ Registration successful! Welcome to GramShiksha!', 'success');
        setTimeout(() => window.location.href = '../pages/login.html', 2000);
      } else {
        showToast('❌ ' + (result.message || 'Registration failed'), 'error');
      }
    } catch {
      // Fallback: store in localStorage for demo
      const users = JSON.parse(localStorage.getItem('gs_users') || '[]');
      users.push(data);
      localStorage.setItem('gs_users', JSON.stringify(users));
      showToast('✅ Registered successfully! (Demo Mode)', 'success');
      setTimeout(() => window.location.href = 'login.html', 2000);
    }
  });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('gs_user', JSON.stringify(result));
        showToast('✅ Welcome back!', 'success');
        setTimeout(() => window.location.href = '../index.html', 1500);
      } else {
        showToast('❌ ' + (result.message || 'Invalid credentials'), 'error');
      }
    } catch {
      // Demo fallback
      const users = JSON.parse(localStorage.getItem('gs_users') || '[]');
      const user = users.find(u => u.email === data.email && u.password === data.password);
      if (user) {
        localStorage.setItem('gs_user', JSON.stringify(user));
        showToast('✅ Login successful! (Demo Mode)', 'success');
        setTimeout(() => window.location.href = '../index.html', 1500);
      } else {
        showToast('❌ Invalid email or password', 'error');
      }
    }
  });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('gs_user');
    showToast('✅ Logged out successfully', 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 500);
  });
}

// --- Progress Bar Simulation for Lessons ---
function initProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const val = bar.dataset.progress || 0;
    setTimeout(() => { bar.style.width = val + '%'; }, 400);
  });
}
initProgressBars();

// --- Active Nav Link ---
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  if (currentPage.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});

// --- Quiz Logic ---
let currentQuestion = 0;
let score = 0;
let quizData = [];

async function loadQuiz(subject) {
  try {
    const res = await fetch(`${API_BASE}/quiz?subject=${subject}`);
    quizData = await res.json();
  } catch {
    // Demo questions
    quizData = [
      { question: "What is 7 × 8?", options: ["54", "56", "64", "48"], answer: 1 },
      { question: "What is the capital of India?", options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"], answer: 2 },
      { question: "Water boils at which temperature?", options: ["90°C", "95°C", "100°C", "110°C"], answer: 2 },
      { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: 1 },
      { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
      { question: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 },
      { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "CO₂", "Hydrogen"], answer: 2 },
      { question: "The synonym of 'happy' is:", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
      { question: "Who is known as the 'Father of the Nation' in India?", options: ["Nehru", "Ambedkar", "Gandhi", "Bose"], answer: 2 },
      { question: "1 KB is equal to how many bytes?", options: ["100", "512", "1000", "1024"], answer: 3 }
    ];
  }
  renderQuestion();
}

function renderQuestion() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer || !quizData.length) return;
  if (currentQuestion >= quizData.length) {
    quizContainer.innerHTML = `
      <div class="quiz-result">
        <div class="result-emoji">${score >= 4 ? '🏆' : score >= 3 ? '👍' : '📚'}</div>
        <h2>Quiz Complete!</h2>
        <p>You scored <span class="score-highlight">${score}/${quizData.length}</span></p>
        <p>${score >= 4 ? 'Excellent! Keep it up!' : 'Good effort! Study more and try again!'}</p>
        <button class="btn-hero-primary" onclick="restartQuiz()">Try Again</button>
      </div>`;
    return;
  }
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="quiz-header">
      <span class="q-counter">Question ${currentQuestion + 1} of ${quizData.length}</span>
      <span class="q-score">Score: ${score}</span>
    </div>
    <div class="q-progress"><div class="q-progress-bar" style="width:${((currentQuestion)/quizData.length)*100}%"></div></div>
    <div class="question-text">${q.question}</div>
    <div class="options-grid">
      ${q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectOption(${i}, ${q.answer})">
          <span class="opt-label">${String.fromCharCode(65+i)}</span>
          ${opt}
        </button>`).join('')}
    </div>`;
}

function selectOption(selected, correct) {
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === selected && selected !== correct) btn.classList.add('wrong');
  });
  if (selected === correct) score++;
  setTimeout(() => { currentQuestion++; renderQuestion(); }, 1200);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  renderQuestion();
}

// Load quiz if on quiz page
if (document.getElementById('quizContainer')) {
  loadQuiz('general');
}



