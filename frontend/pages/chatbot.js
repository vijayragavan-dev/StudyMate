/* =============================================
   StudyMate Offline Chatbot — chatbot.js
   No internet required. All answers built-in.
   ============================================= */

(function () {
  'use strict';

  // ── Knowledge Base (Offline) ──────────────────────────────────────
  const KB = {
    greetings: ['hi', 'hello', 'hey', 'hlo', 'vanakkam', 'namaste', 'good morning', 'good evening'],
    bye: ['bye', 'goodbye', 'see you', 'tata', 'cya'],

    responses: [
      // --- GREETINGS ---
      {
        keys: ['hi', 'hello', 'hey', 'hlo', 'vanakkam', 'namaste', 'good morning', 'good evening', 'start'],
        reply: `👋 வணக்கம்! Hello! I'm **Gyan**, your StudyMate assistant!\n\nI can help you with:\n📚 Subjects (Maths, Science, English...)\n🧪 Class topics (Class 1–10)\n📝 Quiz tips\n🌐 Using StudyMate offline\n\nWhat would you like to learn today?`
      },

      // --- ABOUT STUDYMATE ---
      {
        keys: ['what is studymate', 'about studymate', 'tell me about', 'what is this', 'studymate'],
        reply: `📖 **StudyMate** is a free digital learning platform made for rural students in India.\n\n✅ Free for everyone\n✅ Works offline (no internet needed!)\n✅ Classes 1–10 covered\n✅ Available in Tamil & English\n✅ Subjects: Maths, Science, Social Studies & more\n\nJust click "Start Learning Free" to begin! 🚀`
      },

      // --- OFFLINE ---
      {
        keys: ['offline', 'no internet', 'without internet', 'internet not available', 'download'],
        reply: `📶 **StudyMate works offline!**\n\nHere's how:\n1. Open StudyMate at least once with internet\n2. Browse the lessons you want\n3. They get cached automatically\n4. Close WiFi — lessons still work! ✅\n\nThis is specially designed for rural areas with low connectivity. 🌾`
      },

      // --- MATHEMATICS ---
      {
        keys: ['maths', 'math', 'mathematics', 'addition', 'subtraction', 'multiplication', 'division', 'algebra', 'geometry', 'fractions', 'numbers'],
        reply: `➗ **Mathematics on StudyMate:**\n\n📌 Topics covered:\n• Basic operations (Class 1–5)\n• Fractions & Decimals (Class 4–6)\n• Algebra & Equations (Class 7–9)\n• Geometry & Mensuration (Class 6–10)\n• Trigonometry basics (Class 10)\n\n💡 Tip: Go to **Subjects → Mathematics** and pick your class!\n\nNeed help with a specific topic? Just ask me! 😊`
      },

      // --- SCIENCE ---
      {
        keys: ['science', 'physics', 'chemistry', 'biology', 'experiment', 'atom', 'cell', 'photosynthesis', 'force', 'motion', 'electricity'],
        reply: `🔬 **Science on StudyMate:**\n\n📌 Topics covered:\n• Plants & Animals (Class 1–5)\n• Human Body & Health (Class 5–7)\n• Physics – Force, Motion, Light (Class 8–10)\n• Chemistry – Atoms, Elements (Class 9–10)\n• Biology – Cells, Genetics (Class 9–10)\n\n🧪 Each topic has simple explanations + diagrams!\n\nGo to **Subjects → Science** to explore. 🌱`
      },

      // --- SOCIAL STUDIES ---
      {
        keys: ['social', 'social studies', 'history', 'geography', 'civics', 'map', 'india', 'freedom', 'constitution'],
        reply: `🌍 **Social Studies on StudyMate:**\n\n📌 Topics covered:\n• Our Environment (Class 1–5)\n• Indian History & Freedom Struggle (Class 6–8)\n• Geography – Maps, Climate (Class 6–8)\n• Civics & Constitution (Class 9–10)\n• Economics basics (Class 10)\n\nGo to **Subjects → Social Studies** to start! 🗺️`
      },

      // --- ENGLISH ---
      {
        keys: ['english', 'grammar', 'essay', 'story', 'poem', 'vocabulary', 'spelling', 'sentence', 'tense'],
        reply: `📝 **English on StudyMate:**\n\n📌 Topics covered:\n• Alphabets & Phonics (Class 1–3)\n• Grammar – Nouns, Verbs, Tenses (Class 4–8)\n• Essay & Letter Writing (Class 6–10)\n• Comprehension & Reading (All Classes)\n• Vocabulary Building (Class 5–10)\n\nGo to **Subjects → English** to begin! ✍️`
      },

      // --- TAMIL ---
      {
        keys: ['tamil', 'தமிழ்', 'tamil language', 'tamil medium'],
        reply: `🔤 **Tamil Medium Support:**\n\nStudyMate supports **Tamil language** for all subjects!\n\n🗣️ Lessons are available in:\n• Tamil (தமிழ்)\n• English\n\nYou can switch the language in **Settings → Language**.\n\nதமிழில் படிக்கவும் நல்லது! (It's great to learn in Tamil too!) 😊`
      },

      // --- QUIZ ---
      {
        keys: ['quiz', 'test', 'exam', 'question', 'practice', 'mcq', 'mock test'],
        reply: `🧠 **Quiz Section on StudyMate:**\n\nTest your knowledge anytime!\n\n📋 Features:\n• Chapter-wise quizzes\n• Multiple choice questions\n• Instant results & score\n• No time pressure — learn at your pace\n• Works offline! ✅\n\nGo to **Quiz** in the top menu to start! Good luck! 🌟`
      },

      // --- CLASS SPECIFIC ---
      {
        keys: ['class 1', 'class 2', 'class 3', 'grade 1', 'grade 2', 'grade 3', 'primary', 'std 1', 'std 2', 'std 3'],
        reply: `🌟 **Classes 1–3 on StudyMate:**\n\nFun learning for young students!\n\n📚 Topics:\n• Basic Maths (Numbers, Shapes, Counting)\n• English Alphabets & Words\n• Environmental Studies\n• Tamil Letters & Words\n\nVisual & colorful lessons to make learning fun! 🎨`
      },
      {
        keys: ['class 4', 'class 5', 'class 6', 'grade 4', 'grade 5', 'grade 6', 'std 4', 'std 5', 'std 6'],
        reply: `📘 **Classes 4–6 on StudyMate:**\n\n📚 Topics:\n• Maths – Fractions, HCF, LCM\n• Science – Plants, Animals, Body\n• Social – Our State, Our Country\n• English – Grammar basics\n• Tamil – Poetry & Prose\n\nGo to **Subjects** and pick your class! 💪`
      },
      {
        keys: ['class 7', 'class 8', 'class 9', 'class 10', 'grade 7', 'grade 8', 'grade 9', 'grade 10', 'std 7', 'std 8', 'std 9', 'std 10', 'tenth'],
        reply: `🎯 **Classes 7–10 on StudyMate:**\n\n📚 Topics:\n• Maths – Algebra, Geometry, Trigonometry\n• Science – Physics, Chemistry, Biology\n• Social – History, Geography, Civics\n• English – Essay, Literature\n• Board exam preparation! ✅\n\nGo to **Subjects → Your Class** to start preparing! 💯`
      },

      // --- HOW TO USE ---
      {
        keys: ['how to use', 'how to start', 'how do i', 'get started', 'begin', 'use studymate'],
        reply: `🚀 **How to Use StudyMate:**\n\n1️⃣ Click **"Start Learning Free"** on the homepage\n2️⃣ Choose your **Class** (1–10)\n3️⃣ Pick a **Subject** (Maths, Science, etc.)\n4️⃣ Start reading the lesson\n5️⃣ Take the **Quiz** to test yourself!\n\n💡 No signup needed to browse. Click **"Join Free"** to save your progress.`
      },

      // --- FREE / COST ---
      {
        keys: ['free', 'cost', 'price', 'fee', 'paid', 'money', 'charge'],
        reply: `💚 **StudyMate is 100% FREE!**\n\nNo hidden charges. No subscription. No ads.\n\nOur mission: Quality education for every rural student in India regardless of their economic background. 🙏\n\nJust click **"Start Learning Free"** and begin! ✅`
      },

      // --- LOGIN / SIGNUP ---
      {
        keys: ['login', 'sign up', 'register', 'account', 'signup', 'join', 'password', 'forgot'],
        reply: `🔐 **Login / Sign Up:**\n\n• Click **"Login"** (top right) to enter your account\n• Click **"Join Free"** to create a new account\n• You only need an email or phone number\n\n💡 You can still **browse lessons without logging in** — just login to save your progress & quiz scores!`
      },

      // --- COURSES ---
      {
        keys: ['course', 'courses', 'lesson', 'chapter', 'topic', 'curriculum'],
        reply: `📚 **Courses on StudyMate:**\n\nAll courses follow the **Tamil Nadu State Board** and **NCERT** curriculum.\n\n📌 Available:\n• 10 Classes (1 to 10)\n• 5+ Subjects per class\n• Multiple chapters per subject\n• Video explanations + text\n• Practice quizzes\n\nGo to **Courses** in the menu to explore! 🔍`
      },

      // --- HELP / CONTACT ---
      {
        keys: ['help', 'support', 'contact', 'problem', 'issue', 'error', 'not working'],
        reply: `🛠️ **Need Help?**\n\nFor any issues:\n📧 You can reach the StudyMate team via the **About** page\n📞 Look for the contact section on the website\n\n💡 Common fixes:\n• Refresh the page\n• Clear browser cache\n• Make sure you opened the lessons once with WiFi (for offline use)\n\nStill stuck? Describe your problem and I'll try to help! 😊`
      },

      // --- BYE ---
      {
        keys: ['bye', 'goodbye', 'see you', 'tata', 'cya', 'exit', 'close'],
        reply: `👋 **Goodbye!** Keep learning and growing!\n\n*"Education is the most powerful weapon which you can use to change the world."* — Nelson Mandela\n\nAll the best with your studies! 🌟 Come back anytime!`
      },

      // --- THANKS ---
      {
        keys: ['thanks', 'thank you', 'thank', 'thx', 'great', 'awesome', 'good bot', 'helpful'],
        reply: `😊 You're welcome! Happy to help!\n\nRemember: **StudyMate** is here for you anytime. Keep asking questions — curiosity is the key to learning! 🔑\n\nAnything else I can help with? 📚`
      },
    ],

    // Default fallback
    fallback: [
      `🤔 Hmm, I'm not sure about that. Try asking me about:\n• A subject (Maths, Science, English...)\n• A specific class (Class 7, Class 10...)\n• How to use StudyMate\n• Offline access\n• Quiz section`,
      `📚 I'm best at helping with StudyMate's subjects and features! Try asking:\n• "Tell me about Science for Class 9"\n• "How to use StudyMate offline"\n• "What topics are in Mathematics?"`,
      `🌱 I'm still learning! For this question, try the **Courses** or **Subjects** page directly.\n\nOr ask me about: Maths, Science, Tamil, English, Quizzes, or how to get started!`
    ]
  };

  // ── Helper Functions ──────────────────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function findResponse(input) {
    const lower = input.toLowerCase().trim();
    for (const item of KB.responses) {
      if (item.keys.some(k => lower.includes(k))) {
        return item.reply;
      }
    }
    return KB.fallback[Math.floor(Math.random() * KB.fallback.length)];
  }

  function formatBubble(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // ── Build UI ──────────────────────────────────────────────────────
  function buildChatbot() {
    // Toggle Button
    const toggle = document.createElement('button');
    toggle.id = 'sm-chat-toggle';
    toggle.setAttribute('aria-label', 'Open chat');
    toggle.innerHTML = `
      <svg class="toggle-icon icon-chat" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="toggle-icon icon-close" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span class="notif-dot"></span>
    `;

    // Chat Window
    const win = document.createElement('div');
    win.id = 'sm-chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'StudyMate Chatbot');

    win.innerHTML = `
      <div class="sm-chat-header">
        <div class="sm-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="sm-header-info">
          <div class="sm-header-name">Gyan — StudyMate Bot</div>
          <div class="sm-header-status">
            <span class="sm-status-dot"></span>
            Offline Ready · Always Available
          </div>
        </div>
        <div class="sm-header-actions">
          <button class="sm-header-btn" id="sm-clear-btn" title="Clear chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.36"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="sm-quick-topics" id="sm-quick-topics">
        <button class="sm-topic-chip" data-q="Tell me about StudyMate">About</button>
        <button class="sm-topic-chip" data-q="How to use offline">Offline</button>
        <button class="sm-topic-chip" data-q="Mathematics topics">Maths</button>
        <button class="sm-topic-chip" data-q="Science topics">Science</button>
        <button class="sm-topic-chip" data-q="Quiz section">Quiz</button>
        <button class="sm-topic-chip" data-q="Class 10 topics">Class 10</button>
      </div>

      <div class="sm-messages" id="sm-messages" role="log" aria-live="polite"></div>

      <div class="sm-chat-footer">
        <div class="sm-input-row">
          <textarea id="sm-chat-input" placeholder="Ask me anything about StudyMate..." rows="1" maxlength="400"></textarea>
          <button id="sm-chat-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div class="sm-footer-hint">Powered by <span>StudyMate</span> · Works 100% Offline 📶</div>
      </div>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(win);

    // ── Events ──────────────────────────────────────────────────────
    const messagesEl = win.querySelector('#sm-messages');
    const inputEl = win.querySelector('#sm-chat-input');
    const sendBtn = win.querySelector('#sm-chat-send');
    const clearBtn = win.querySelector('#sm-clear-btn');
    let isOpen = false;
    let typingTimeout = null;

    // Open / Close
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      toggle.classList.toggle('open', isOpen);
      win.classList.toggle('visible', isOpen);
      if (isOpen) {
        // Remove notif dot once opened
        const dot = toggle.querySelector('.notif-dot');
        if (dot) dot.style.display = 'none';
        inputEl.focus();
        // Show welcome message on first open
        if (messagesEl.children.length === 0) {
          setTimeout(() => addBotMsg(findResponse('hello')), 400);
        }
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && !win.contains(e.target) && e.target !== toggle) {
        isOpen = false;
        toggle.classList.remove('open');
        win.classList.remove('visible');
      }
    });

    // Send message
    function sendMsg() {
      const text = inputEl.value.trim();
      if (!text) return;
      addUserMsg(text);
      inputEl.value = '';
      autoResize();
      showTyping();
      const delay = 700 + Math.random() * 600;
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        removeTyping();
        addBotMsg(findResponse(text));
      }, delay);
    }

    sendBtn.addEventListener('click', sendMsg);

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMsg();
      }
    });

    inputEl.addEventListener('input', autoResize);

    function autoResize() {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
    }

    // Clear chat
    clearBtn.addEventListener('click', () => {
      messagesEl.innerHTML = '';
      setTimeout(() => addBotMsg(findResponse('hello')), 200);
    });

    // Quick topic chips
    win.querySelectorAll('.sm-topic-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q;
        if (!isOpen) return;
        addUserMsg(q);
        showTyping();
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          removeTyping();
          addBotMsg(findResponse(q));
        }, 800);
      });
    });

    // ── Message Helpers ──────────────────────────────────────────────
    function addUserMsg(text) {
      const div = document.createElement('div');
      div.className = 'sm-msg user';
      div.innerHTML = `
        <div class="sm-msg-body">
          <div class="sm-bubble">${escapeHTML(text)}</div>
          <div class="sm-timestamp">${getTime()}</div>
        </div>
        <div class="sm-msg-avatar">👤</div>
      `;
      messagesEl.appendChild(div);
      scrollBottom();
    }

    function addBotMsg(text) {
      const div = document.createElement('div');
      div.className = 'sm-msg bot';
      div.innerHTML = `
        <div class="sm-msg-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="sm-msg-body">
          <div class="sm-bubble">${formatBubble(text)}</div>
          <div class="sm-timestamp">${getTime()}</div>
        </div>
      `;
      messagesEl.appendChild(div);
      scrollBottom();
    }

    function showTyping() {
      removeTyping();
      const div = document.createElement('div');
      div.className = 'sm-msg bot sm-typing';
      div.id = 'sm-typing-indicator';
      div.innerHTML = `
        <div class="sm-msg-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="sm-bubble">
          <span class="sm-typing-dot"></span>
          <span class="sm-typing-dot"></span>
          <span class="sm-typing-dot"></span>
        </div>
      `;
      messagesEl.appendChild(div);
      scrollBottom();
    }

    function removeTyping() {
      const t = document.getElementById('sm-typing-indicator');
      if (t) t.remove();
    }

    function scrollBottom() {
      requestAnimationFrame(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    }

    function escapeHTML(str) {
      const d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }
  }

  // ── Init ──────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbot);
  } else {
    buildChatbot();
  }

})();
