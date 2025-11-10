const app = document.getElementById("app");
let currentLang = "de";
let currentScreen = "intro"; // intro | question | result | tips
let scores = { humor: 0, resignation: 0, rebellion: 0, hope: 0 };
let currentQuestion = 0;
let history = [];

const translations = {
  
  de: {
    memeCreateText: "💡 Vorschlag: Hier können Sie eigene Memes erstellen, die Ihren Zustand genau darstellen würden.",
    userLabel: "% der Nutzer",
    statItems: [
  { label: "Humor / Ironie", labelEn: "Humor / Irony" },
  { label: "Resignation / Ablenkung", labelEn: "Resignation / Distraction" },
  { label: "Rebellion / Aktionismus", labelEn: "Rebellion / Activism" },
  { label: "Hoffnung / Motivation", labelEn: "Hope / Motivation" }
],
feedbackSamples: [
  "„Ich erkenne mich total wieder 😂“",
  "„Das Ergebnis passt erstaunlich gut!“",
  "„Ich wusste gar nicht, dass ich so hoffnungsvoll bin 😅“",
  "„Ziemlich akkurat, aber ich will ein Re-Match!“",
  "„Humor rettet mich jedes Mal.“"
],
    tooltipTexts: {
      humor: "Memes dienen als Werkzeug, um die Stimmung zu heben und sich besser zu fühlen. Sie liefern einen kurzen positiven Impuls und können helfen, eine optimistische Haltung gegenüber Problemen zu entwickeln.",
      resignation: "Memes helfen, der Realität zu entfliehen oder Probleme vorübergehend zu vergessen. Sie bieten die Gelegenheit, Stress abzubauen und negative Gefühle zu verarbeiten ohne dass direkt aktiv gehandelt werden muss. Dies kann eine Reaktion auf Müdigkeit, Angst oder das Gefühl der Ohnmacht sein.",
      rebellion: "Memes dienen der Ausdrucksform von Unzufriedenheit oder Protest. Humor wird als Katalysator für Kritik oder aktive Handlungen genutzt, teilweise auch aggressiv (z. B. Online-Diskussionen). Negative Memes helfen, Frustration auszudrücken und Solidarität mit Gleichgesinnten zu zeigen.",
      hope: "Memes werden als Werkzeug zur Selbstentwicklung oder Problemlösung genutzt. Sie vermitteln das Gefühl, dass Probleme überwindbar sind und motivieren zum Handeln."
    },
    copyAlert: "Link kopiert!",
    shareAlert: "Direktes Teilen über diese Plattform ist nicht möglich. Verwende den kopierten Link.",
    statsTitle: "📊 Statistik",
    feedbackTitle: "🗣️ Rückmeldungen",
    updatedNote: "Aktualisiert am 10. November 2025",
    shareBtn: "📤 Teilen",
    copyLink: "📋 Link kopieren",
    feedbackPlaceholder: "💬 Schreiben Sie Ihren Kommentar...",
    namePlaceholder: "👤 Ihr Name",
    sendBtn: "📨 Senden",
    thankYou: "🙏 Danke für Ihr Feedback!",
    enterName: "Bitte geben Sie Ihren Namen ein.",
    enterComment: "Bitte geben Sie einen Kommentar ein.",
    introTitle: "Meme Coping Test",
    introText: "Finde heraus, wie du mit Stress umgehst – mithilfe von Memes! Wähle jedes Mal das Meme, das dich am besten beschreibt.",
    startBtn: "Test starten",
    backBtn: "Zurück",
    skipBtn: "Überspringen",
    againBtn: "Noch einmal machen",
    tipsBtn: "Tipps für Selbsthilfe",
    tipsTitle: "Hier sind einige Aktivitäten, die Sie ausprobieren können, wenn Sie sich überfordert fühlen:",
    tipsList: [
      "• Führen Sie ein Tagebuch.",
      "• Laden Sie eine App herunter, die Entspannungsübungen (wie tiefes Atmen oder Visualisierung) oder Tipps zur Achtsamkeit anbietet.",
      "• Treiben Sie regelmäßig Sport und achten Sie auf eine gesunde, ausgewogene Ernährung.",
      "• Halten Sie sich an einen festen Schlafrhythmus und sorgen Sie dafür, dass Sie ausreichend schlafen.",
      "• Vermeiden Sie übermäßigen Koffeinkonsum, zum Beispiel durch Softdrinks oder Kaffee.",
      "• Erkennen und hinterfragen Sie negative oder hinderliche Gedanken.",
      "• Wenden Sie sich an Freunde oder Familienmitglieder, die Ihnen auf positive Weise helfen, mit schwierigen Situationen umzugehen."
    ],
    backToResultBtn: "Zurück zum Ergebnis",
    resultTitle: "Ihr Meme Coping Profil 🎯",
    questions: [
      "Wenn alles schiefläuft, aber Sie trotzdem weitermachen mussen:",
      "Sie hören schlechte Nachrichten in den Medien:",
      "Konflikt mit Vorgesetzten oder Lehrern:",
      "Keine Energie mehr für Arbeit/Uni:",
      "Große Veränderung (Umzug, Jobwechsel):",
      "Sie fühlen sich unvorbereitet für eine Prüfung:",
    ],
    labels: {
      top: "Positiv",
      bottom: "Negativ",
      left: "Passiv",
      right: "Aktiv",
      q1: "Humor / Ironie",
      q2: "Resignation / Ablenkung",
      q3: "Rebellion / Aktionismus",
      q4: "Hoffnung / Motivation",
    },
    statsBtn: "📊 Statistik",
  },
  en: {
    memeCreateText: "💡 Tip: You can create your own memes that perfectly represent your mood.",

    userLabel: "% of users",
    statItems: [
  { label: "Humor / Irony" },
  { label: "Resignation / Distraction" },
  { label: "Rebellion / Activism" },
  { label: "Hope / Motivation" }
],
feedbackSamples: [
  "“I totally see myself in this 😂”",
  "“The result fits surprisingly well!”",
  "“Didn’t know I was that hopeful 😅”",
  "“Pretty accurate, but I want a rematch!”",
  "“Humor saves me every time.”"
],

    tooltipTexts: {
      humor: "Memes serve as a tool to lift your spirits and make you feel better. They provide a brief positive boost and can help you develop an optimistic attitude toward problems.",
      resignation: "Memes serve as a way to escape reality or forget problems for a short time. They offer an opportunity to relieve stress and process negative feelings without having to take direct action. This can be a reaction to fatigue, anxiety, or feelings of powerlessness.",
      rebellion: "Memes serve as a form of expression for dissatisfaction or protest. Humor is used as a catalyst for criticism or active action, sometimes even aggressively (e.g., online discussions). Negative memes help to express frustration and show solidarity with like-minded people.",
      hope: "Memes are used as a tool for self-development or problem solving. They convey the feeling that problems can be overcome and motivate people to take action."
    },
    copyAlert: "Link copied!",
    shareAlert: "Direct sharing via this platform isn’t possible. Use the copied link instead.",
    statsTitle: "📊 Statistics",
    feedbackTitle: "🗣️ Feedback",
    updatedNote: "Updated on November 10, 2025",
    shareBtn: "📤 Share",
    copyLink: "📋 Copy link",
    feedbackPlaceholder: "💬 Write your comment...",
    namePlaceholder: "👤 Your name",
    sendBtn: "📨 Send",
    thankYou: "🙏 Thank you for your feedback!",
    enterName: "Please enter your name.",
    enterComment: "Please enter a comment.",
    introTitle: "Meme Coping Test",
    introText: "Find out how you deal with stress – through memes! Choose the meme that best describes you each time.",
    startBtn: "Start Test",
    backBtn: "Back",
    skipBtn: "Skip",
    againBtn: "Try Again",
    tipsBtn: "Self-help tips",
    tipsTitle: "Here are some activities you can try when you feel overwhelmed:",
    tipsList: [
      "• Keep a journal.",
      "• Download an app that offers relaxation exercises (like deep breathing or visualization) or mindfulness tips.",
      "• Exercise regularly and maintain a balanced, healthy diet.",
      "• Stick to a regular sleep schedule and make sure you get enough rest.",
      "• Avoid excessive caffeine intake, for example from soft drinks or coffee.",
      "• Recognize and challenge negative or limiting thoughts.",
      "• Reach out to friends or family members who can help you deal with difficult situations in a positive way."
    ],
    backToResultBtn: "Back to result",
    resultTitle: "Your Meme Coping Profile 🎯",
    questions: [
      "When everything goes wrong but you still have to keep going:",
      "You hear bad news in the media:",
      "Conflict with your boss or teacher:",
      "No energy left for work/university:",
      "A big life change (moving, new job):",
      "You feel unprepared for an exam:",
    ],
    labels: {
      top: "Positive",
      bottom: "Negative",
      left: "Passive",
      right: "Active",
      q1: "Humor / Irony",
      q2: "Resignation / Distraction",
      q3: "Rebellion / Activism",
      q4: "Hope / Motivation",
    },
    statsBtn: "📊 Statistics",

  },
};

// === Основные функции ===

function renderIntro() {
  const t = translations[currentLang];
  currentScreen = "intro";
  app.innerHTML = `
    <div class="intro">
      <h1>${t.introTitle}</h1>
      <p>${t.introText}</p>
      <button onclick="startTest()">${t.startBtn}</button>
    </div>
  `;
}

function startTest() {
  currentQuestion = 0;
  history = [];
  scores = { humor: 0, resignation: 0, rebellion: 0, hope: 0 };
  renderQuestion();
}

function renderQuestion() {
  const t = translations[currentLang];
  currentScreen = "question";

  if (currentQuestion >= t.questions.length) {
    renderEndScreen();
    return;
  }

  const q = t.questions[currentQuestion];
  const questionIndex = currentQuestion + 1;

  const optionsHtml = [1, 2, 3, 4]
    .map(
      (num) => `
      <div class="option" onclick="selectOption(${num})">
        <img src="мемы/${questionIndex}вопрос/${num}.jpg" alt="Meme ${num}">
      </div>`
    )
    .join("");

  app.innerHTML = `
    <div class="progress-container">
      <div class="progress-bar" style="width:${(currentQuestion / t.questions.length) * 100}%"></div>
    </div>
    <div class="question">${q}</div>
    <div class="options">${optionsHtml}</div>
    <div class="button-group">
      <button onclick="goBack()" ${currentQuestion === 0 ? "disabled" : ""}>${t.backBtn}</button>
      <button onclick="skipQuestion()">${t.skipBtn}</button>
    </div>
  `;
}

function selectOption(optionNum) {
  history.push(optionNum);
  switch (optionNum) {
    case 1: scores.humor++; break;
    case 2: scores.resignation++; break;
    case 3: scores.rebellion++; break;
    case 4: scores.hope++; break;
  }
  currentQuestion++;
  renderQuestion();
}

function skipQuestion() {
  history.push(null);
  currentQuestion++;
  renderQuestion();
}

function goBack() {
  if (currentQuestion === 0) return;
  const last = history.pop();
  if (last) {
    switch (last) {
      case 1: scores.humor--; break;
      case 2: scores.resignation--; break;
      case 3: scores.rebellion--; break;
      case 4: scores.hope--; break;
    }
  }
  currentQuestion--;
  renderQuestion();
}

function renderEndScreen() {
  const t = translations[currentLang];
  currentScreen = "result";

  const total = scores.humor + scores.resignation + scores.rebellion + scores.hope;
  if (total === 0) {
    renderIntro();
    return;
  }

  const x = scores.hope + scores.rebellion - (scores.humor + scores.resignation);
  const y = scores.hope + scores.humor - (scores.rebellion + scores.resignation);
  const maxVal = Math.max(Math.abs(x), Math.abs(y), 1);
  const normX = (x / maxVal) * 80;
  const normY = (y / maxVal) * 80;

  app.innerHTML = `
    <div class="result-screen">
      <h2 class="result-title">${t.resultTitle}</h2>
      <div class="axis-wrapper">
        <div class="axis fancy-axis">
          <div class="axis-label top">${t.labels.top}</div>
          <div class="axis-label bottom">${t.labels.bottom}</div>
          <div class="axis-label left">${t.labels.left}</div>
          <div class="axis-label right">${t.labels.right}</div>

          <div class="quadrant top-left">${t.labels.q1}</div>
          <div class="quadrant bottom-left">${t.labels.q2}</div>
          <div class="quadrant bottom-right">${t.labels.q3}</div>
          <div class="quadrant top-right">${t.labels.q4}</div>

          <div class="axis-lines"></div>
          <div class="point-glow" style="left:50%; top:50%;"></div>
        </div>
      </div>

      <div class="share-section">
        <button class="share-btn" onclick="toggleShareMenu()">${t.shareBtn}</button>
        <div id="shareMenu" class="share-menu hidden">
          <a href="#" onclick="shareTo('telegram')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram"></a>
          <a href="#" onclick="shareTo('whatsapp')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp"></a>
          <a href="#" onclick="shareTo('facebook')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook"></a>
          <a href="#" onclick="shareTo('x')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X"></a>
          <a href="#" onclick="shareTo('instagram')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"></a>
          <a href="#" onclick="shareTo('threads')"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/threads.svg" alt="Threads"></a>
          <button class="copy-link" onclick="copyLink()">${t.copyLink}</button>
        </div>
      </div>

      <div class="summary">
  <div class="tooltip-container">
    <button class="result-btn">Humor / Ironie: ${scores.humor}</button>
    <div class="tooltip-text">${t.tooltipTexts.humor}</div>

  </div>

  <div class="tooltip-container">
    <button class="result-btn">Resignation / Ablenkung: ${scores.resignation}</button>
    <div class="tooltip-text">${t.tooltipTexts.resignation}</div>
  </div>

  <div class="tooltip-container">
    <button class="result-btn">Rebellion / Aktionismus: ${scores.rebellion}</button>
 <div class="tooltip-text">${t.tooltipTexts.rebellion}</div>
  </div>

  <div class="tooltip-container">
    <button class="result-btn">Hoffnung / Motivation: ${scores.hope}</button>
   <div class="tooltip-text">${t.tooltipTexts.hope}</div>
  </div>
</div>



      <div class="button-group">
        <button class="restart-btn" onclick="renderIntro()">${t.againBtn}</button>
        <button class="tips-btn" onclick="renderTips()">${t.tipsBtn}</button>
        <button class="stats-btn" onclick="openStats()">${t.statsBtn}</button>
      </div>


    </div>
  `;

  setTimeout(() => {
    const point = document.querySelector(".point-glow");
    point.style.left = `${50 + normX / 2}%`;
    point.style.top = `${50 - normY / 2}%`;
  }, 200);
}

function renderTips() {
  const t = translations[currentLang];
  currentScreen = "tips";

  const tipsList = t.tipsList.map(item => `<p>${item}</p>`).join("");

  app.innerHTML = `
    <div class="tips-screen">
      <h2 class="result-title">${t.tipsTitle}</h2>
      <div class="tips-content">${tipsList}</div>

      <div class="meme-create-section">
        <hr>
       <p class="meme-create-text">${t.memeCreateText}</p>

        <div class="meme-create-buttons">
          <a href="https://www.kapwing.com/meme-maker" target="_blank" class="meme-btn">Kapwing Meme Maker</a>
          <a href="https://imageresizer.com/meme-generator" target="_blank" class="meme-btn">ImageResizer Generator</a>
        </div>
      </div>

      <button class="restart-btn" onclick="renderEndScreen()">${t.backToResultBtn}</button>
    </div>
  `;
}


// === Переключатель языка ===
function toggleLanguage() {
  currentLang = currentLang === "de" ? "en" : "de";
  const btn = document.getElementById("lang-btn");
  btn.innerText = currentLang === "de" ? "🇩🇪 Deutsch" : "🇬🇧 English";

  switch (currentScreen) {
    case "intro": renderIntro(); break;
    case "question": renderQuestion(); break;
    case "result": renderEndScreen(); break;
    case "tips": renderTips(); break;
  }
}
function openStats() {
  const t = translations[currentLang]; // <-- переместил в начало
  const modal = document.getElementById("statsModal");
  const statsData = document.getElementById("statsData");
  const feedbackList = document.getElementById("feedbackList");
  const oldForm = document.querySelector(".feedback-form");

  document.getElementById("statsTitle").innerText = t.statsTitle;
  document.getElementById("feedbackTitle").innerText = t.feedbackTitle;
  document.querySelector(".update-note").innerText = t.updatedNote;

  if (oldForm) oldForm.remove();

  // Фейковая "общая статистика"
const fakeStats = t.statItems.map((item, i) => ({
  label: item.label,
  percent: [34, 27, 18, 21][i]
}));


  statsData.innerHTML = fakeStats
    .map(s => `
      <div style="margin-bottom: 12px;">
        <p><strong>${s.label}</strong> — ${s.percent}${t.userLabel}</p>
        <div style="
          background: rgba(0,0,0,0.1);
          height: 10px;
          border-radius: 6px;
          overflow: hidden;
          margin-top: 5px;">
          <div style="
            width: ${s.percent}%;
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 6px;"></div>
        </div>
      </div>
    `)
    .join("");

  // Рандомные отзывы
 const feedbacks = t.feedbackSamples;


  feedbackList.innerHTML = feedbacks
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(f => `<p>💬 ${f}</p>`)
    .join("");

  modal.classList.remove("hidden");

  // === Форма для обратной связи ===
  const formHtml = `
    <div class="feedback-form">
      <input id="feedbackName" type="text" placeholder="${t.namePlaceholder}" />
      <textarea id="feedbackInput" placeholder="${t.feedbackPlaceholder}"></textarea>
      <button id="sendFeedbackBtn" class="hidden" onclick="sendFeedback()">${t.sendBtn}</button>
    </div>
  `;
  feedbackList.insertAdjacentHTML("afterend", formHtml);

  const nameInput = document.getElementById("feedbackName");
  const commentInput = document.getElementById("feedbackInput");
  const sendBtn = document.getElementById("sendFeedbackBtn");

  function toggleSendBtn() {
    if (nameInput.value.trim() && commentInput.value.trim()) {
      sendBtn.classList.remove("hidden");
    } else {
      sendBtn.classList.add("hidden");
    }
  }

  [nameInput, commentInput].forEach(inp => {
    inp.addEventListener("input", toggleSendBtn);
    inp.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey && !sendBtn.classList.contains("hidden")) {
        e.preventDefault();
        sendFeedback();
      }
    });
  });
}


function closeStats() {
  document.getElementById("statsModal").classList.add("hidden");
}

renderIntro();
// Закрытие окна кликом вне контента
document.getElementById("statsModal").addEventListener("click", function (e) {
  const modalContent = document.querySelector(".modal-content");
  // Проверяем, что клик был именно по подложке, а не по содержимому
  if (!modalContent.contains(e.target)) {
    closeStats();
  }
});
function sendFeedback() {
  const t = translations[currentLang];
  const nameInput = document.getElementById("feedbackName");
  const commentInput = document.getElementById("feedbackInput");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name) {
    alert(t.enterName);
    nameInput.focus();
    return;
  }

  if (!comment) {
    alert(t.enterComment);
    commentInput.focus();
    return;
  }

  // имитация "отправки"
  alert(t.thankYou);

  // очистка полей
  nameInput.value = "";
  commentInput.value = "";

  // скрываем кнопку
  document.getElementById("sendFeedbackBtn").classList.add("hidden");
}
function toggleShareMenu() {
  const menu = document.getElementById("shareMenu");
  if (!menu) return; // защита, если меню еще не существует

  const isVisible = menu.classList.contains("show");
  document.querySelectorAll(".share-menu.show").forEach(m => m.classList.remove("show"));
  
  if (!isVisible) {
    menu.classList.add("show");
    setTimeout(() => document.addEventListener("click", handleOutsideClick));
  } else {
    menu.classList.remove("show");
    document.removeEventListener("click", handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  const menu = document.getElementById("shareMenu");
  const button = document.querySelector(".share-btn");
  if (!menu || !button) return;
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.remove("show");
    document.removeEventListener("click", handleOutsideClick);
  }
}


function shareTo(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Mach den Meme Coping Test!");
  let shareUrl = "";

  switch (platform) {
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case "whatsapp":
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "x":
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case "instagram":
    case "threads":
      alert(t.shareAlert);
      return;
  }
  window.open(shareUrl, "_blank");
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(t.copyAlert);
  });
}
