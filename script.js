const STAGES = [
  { id: "applied", label: "Applied", color: "#3b82f6" },
  { id: "screening", label: "Screening", color: "#6366f1" },
  { id: "interview", label: "Interview", color: "#8b5cf6" },
  { id: "offered", label: "Offered", color: "#10b981" },
  { id: "rejected", label: "Rejected", color: "#f43f5e" },
];

const AVATAR_COLORS = ["#4f46e5", "#2563eb", "#0ea5e9", "#7c3aed", "#0891b2", "#4338ca"];

let candidates = [
  {
    id: "c1",
    name: "Priya Menon",
    email: "priya.menon@gmail.com",
    phone: "+91 98450 11234",
    qualification: "B.Com",
    experience: 3,
    ctc: 7.5,
    skills: ["Excel", "Reconciliation"],
    noticePeriod: "30 days",
    notes: "Strong month-end close discipline. Previously owned a 180-invoice aging book at a mid-market FMCG distributor.",
    stage: "applied",
    resumeName: "Priya_Menon_AR.pdf",
  },
  {
    id: "c2",
    name: "Rohan Kapoor",
    email: "rohan.kapoor@outlook.com",
    phone: "+91 98110 44521",
    qualification: "B.Com",
    experience: 1,
    ctc: 4.2,
    skills: ["Tally"],
    noticePeriod: "Immediate",
    notes: "Junior AR associate from a CA firm. Fast Tally operator; needs coaching on dispute resolution and dunning cadence.",
    stage: "applied",
    resumeName: "Rohan_Kapoor_Resume.pdf",
  },
  {
    id: "c3",
    name: "Meera Nair",
    email: "meera.nair@yahoo.com",
    phone: "+91 98840 77812",
    qualification: "MBA Finance",
    experience: 5,
    ctc: 12.0,
    skills: ["SAP", "Excel"],
    noticePeriod: "60 days",
    notes: "SAP FI-AR experience at a listed manufacturing group. Comfortable with lockbox, dunning, and credit limit workflows.",
    stage: "applied",
    resumeName: "Meera_Nair_CV.pdf",
  },
  {
    id: "c4",
    name: "Daniel Okonkwo",
    email: "daniel.okonkwo@email.com",
    phone: "+44 7700 900281",
    qualification: "B.Com (Hons)",
    experience: 4,
    ctc: 9.0,
    skills: ["Reconciliation", "Excel"],
    noticePeriod: "30 days",
    notes: "Bank rec and customer statement specialist. Reduced unapplied cash by 22% in the last fiscal year.",
    stage: "screening",
    resumeName: "Daniel_Okonkwo.pdf",
  },
  {
    id: "c5",
    name: "Aisha Rahman",
    email: "aisha.rahman@gmail.com",
    phone: "+91 90080 33410",
    qualification: "M.Com",
    experience: 6,
    ctc: 13.5,
    skills: ["SAP", "Tally"],
    noticePeriod: "45 days",
    notes: "Led a 4-person collections pod. Mix of SAP AR and Tally for group companies. High ownership of overdue >90 days.",
    stage: "screening",
    resumeName: "Aisha_Rahman_AR.docx",
  },
  {
    id: "c6",
    name: "Vikram Singh",
    email: "vikram.singh@northmail.com",
    phone: "+91 97111 22009",
    qualification: "MBA",
    experience: 7,
    ctc: 16.0,
    skills: ["SAP"],
    noticePeriod: "60 days",
    notes: "Senior AR executive targeting shared-service roles. Deep FBL5N / customer master / dispute case experience.",
    stage: "interview",
    resumeName: "Vikram_Singh_Profile.pdf",
  },
  {
    id: "c7",
    name: "Elena Petrova",
    email: "elena.petrova@mail.com",
    phone: "+49 151 2345678",
    qualification: "B.Com",
    experience: 3,
    ctc: 8.0,
    skills: ["Excel", "Tally"],
    noticePeriod: "30 days",
    notes: "Bilingual collections support. Strong Excel aging models; Tally used for a subsidiary books close.",
    stage: "interview",
    resumeName: "Elena_Petrova.pdf",
  },
  {
    id: "c8",
    name: "Arjun Desai",
    email: "arjun.desai@finance.in",
    phone: "+91 98200 55673",
    qualification: "CA Inter",
    experience: 8,
    ctc: 18.0,
    skills: ["SAP", "Reconciliation"],
    noticePeriod: "90 days",
    notes: "Complex intercompany AR and provision for doubtful debts. Interview panel noted excellent control mindset.",
    stage: "interview",
    resumeName: "Arjun_Desai_CA.pdf",
  },
  {
    id: "c9",
    name: "Sarah Chen",
    email: "sarah.chen@outlook.com",
    phone: "+1 415 555 0198",
    qualification: "MBA Finance",
    experience: 5,
    ctc: 14.0,
    skills: ["SAP", "Excel"],
    noticePeriod: "30 days",
    notes: "Offer pending compensation confirmation. Background verified. Would own US/APAC collections calendar.",
    stage: "offered",
    resumeName: "Sarah_Chen_Resume.pdf",
  },
  {
    id: "c10",
    name: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    phone: "+91 98180 66721",
    qualification: "B.Com",
    experience: 2,
    ctc: 6.0,
    skills: ["Tally"],
    noticePeriod: "Immediate",
    notes: "Rejected after screening: limited exposure to customer disputes and three-way matching. May revisit for junior billing.",
    stage: "rejected",
    resumeName: "Karan_Malhotra.pdf",
  },
];

let activeCandidateId = null;
let searchQuery = "";
let draggedId = null;

const views = {
  landing: document.getElementById("view-landing"),
  signup: document.getElementById("view-signup"),
  login: document.getElementById("view-login"),
  dashboard: document.getElementById("view-dashboard"),
};

function showView(name) {
  Object.values(views).forEach((el) => el.classList.add("hidden"));
  views[name].classList.remove("hidden");
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function avatarColor(id) {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

function formatCtc(value) {
  return `₹${Number(value).toFixed(1)} LPA`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function matchesSearch(candidate, query) {
  if (!query) return true;
  const hay = `${candidate.name} ${candidate.skills.join(" ")} ${candidate.email}`.toLowerCase();
  return hay.includes(query);
}

function renderKanban() {
  const root = document.getElementById("kanban");
  const query = searchQuery.trim().toLowerCase();
  const visible = candidates.filter((c) => matchesSearch(c, query));
  document.getElementById("candidate-count").textContent = `${visible.length} candidate${visible.length === 1 ? "" : "s"}`;

  root.innerHTML = STAGES.map((stage) => {
    const items = visible.filter((c) => c.stage === stage.id);
    return `
      <section class="column" data-stage="${stage.id}">
        <div class="column-head">
          <div class="column-title">
            <span class="dot" style="background:${stage.color}"></span>
            ${stage.label}
          </div>
          <span class="count-pill">${items.length}</span>
        </div>
        <div class="column-body" data-drop-stage="${stage.id}">
          ${items.map(cardMarkup).join("") || emptyColumn()}
        </div>
      </section>
    `;
  }).join("");

  root.querySelectorAll(".candidate-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("dragstart", onDragStart);
    card.addEventListener("dragend", onDragEnd);
  });

  root.querySelectorAll("[data-drop-stage]").forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("drag-over");
    });
    col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");
      const id = e.dataTransfer.getData("text/plain") || draggedId;
      moveCandidate(id, col.dataset.dropStage);
    });
  });
}

function emptyColumn() {
  return `<p class="text-xs text-slate-400 text-center py-6">No candidates</p>`;
}

function cardMarkup(c) {
  const chips = c.skills
    .map((s) => `<span class="skill-chip">${s}</span>`)
    .join("");
  return `
    <article class="candidate-card" draggable="true" data-id="${c.id}">
      <div class="card-top">
        <div class="avatar" style="background:${avatarColor(c.id)}">${initials(c.name)}</div>
        <div class="min-w-0">
          <p class="font-semibold text-slate-900 text-sm truncate">${c.name}</p>
          <p class="text-xs text-slate-500 mt-0.5">${c.experience} yr · ${formatCtc(c.ctc)}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 mt-3">${chips}</div>
      <p class="text-[11px] text-slate-400 mt-2 truncate"><i class="fa-regular fa-clock mr-1"></i>${c.noticePeriod}</p>
    </article>
  `;
}

function onDragStart(e) {
  draggedId = e.currentTarget.dataset.id;
  e.dataTransfer.setData("text/plain", draggedId);
  e.currentTarget.classList.add("dragging");
}

function onDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  draggedId = null;
}

function moveCandidate(id, stage) {
  const candidate = candidates.find((c) => c.id === id);
  if (!candidate || !stage || candidate.stage === stage) return;
  candidate.stage = stage;
  renderKanban();
  if (activeCandidateId === id) {
    document.getElementById("stage-select").value = stage;
  }
  const label = STAGES.find((s) => s.id === stage).label;
  showToast(`${candidate.name} moved to ${label}`);
}

function openModal(id) {
  const c = candidates.find((x) => x.id === id);
  if (!c) return;
  activeCandidateId = id;
  document.getElementById("modal-name").textContent = c.name;
  document.getElementById("modal-contact").innerHTML =
    `<i class="fa-regular fa-envelope mr-1"></i>${c.email}<br/><i class="fa-solid fa-phone mr-1 mt-1"></i>${c.phone}`;
  document.getElementById("modal-qualification").textContent = c.qualification;
  document.getElementById("modal-experience").textContent = `${c.experience} year${c.experience === 1 ? "" : "s"}`;
  document.getElementById("modal-ctc").textContent = formatCtc(c.ctc);
  document.getElementById("modal-notice").textContent = c.noticePeriod;
  document.getElementById("modal-notes").textContent = c.notes;
  document.getElementById("modal-avatar").style.background = avatarColor(c.id);
  document.getElementById("modal-avatar").textContent = initials(c.name);
  document.getElementById("modal-skills").innerHTML = c.skills
    .map((s) => `<span class="skill-chip">${s}</span>`)
    .join("");
  const select = document.getElementById("stage-select");
  select.innerHTML = STAGES.map(
    (s) => `<option value="${s.id}" ${s.id === c.stage ? "selected" : ""}>${s.label}</option>`
  ).join("");
  document.getElementById("modal-overlay").classList.remove("hidden");
}

function closeModal() {
  activeCandidateId = null;
  document.getElementById("modal-overlay").classList.add("hidden");
}

document.getElementById("go-login").addEventListener("click", () => showView("login"));
document.getElementById("go-signup").addEventListener("click", () => showView("signup"));
document.querySelectorAll("[data-back]").forEach((btn) =>
  btn.addEventListener("click", () => showView("landing"))
);

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const resumeInput = document.getElementById("resume");
  const newApplicant = {
    id: `c${Date.now()}`,
    name: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    qualification: form.qualification.value.trim(),
    experience: Number(form.experience.value || 0),
    ctc: Number(form.ctc.value),
    skills: [form.skill.value],
    noticePeriod: "Not specified",
    notes: `Applied via career portal for Accounts Receivable Executive. Resume: ${
      resumeInput.files[0] ? resumeInput.files[0].name : "not attached"
    }.`,
    stage: "applied",
    resumeName: resumeInput.files[0] ? resumeInput.files[0].name : "Not uploaded",
  };
  candidates.unshift(newApplicant);
  form.reset();
  document.getElementById("resume-label").textContent = "Click to attach a resume (PDF or Word)";
  showToast("Application submitted. You are now in the Applied stage.");
  showView("landing");
});

document.getElementById("resume").addEventListener("change", (e) => {
  const file = e.target.files[0];
  document.getElementById("resume-label").textContent = file
    ? file.name
    : "Click to attach a resume (PDF or Word)";
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const error = document.getElementById("login-error");
  if (email === "admin@company.com" && password === "password") {
    error.classList.add("hidden");
    document.getElementById("login-form").reset();
    showView("dashboard");
    switchPanel("kanban");
    renderKanban();
  } else {
    error.classList.remove("hidden");
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  closeModal();
  document.getElementById("search-input").value = "";
  searchQuery = "";
  showView("landing");
});

document.querySelectorAll(".nav-item[data-panel]").forEach((btn) => {
  btn.addEventListener("click", () => switchPanel(btn.dataset.panel));
});

function switchPanel(panel) {
  document.querySelectorAll(".nav-item[data-panel]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.panel === panel);
  });
  document.getElementById("panel-kanban").classList.toggle("hidden", panel !== "kanban");
  document.getElementById("panel-settings").classList.toggle("hidden", panel !== "settings");
  document.getElementById("page-title").textContent =
    panel === "settings" ? "Settings" : "Hiring pipeline";
  document.getElementById("page-subtitle").textContent =
    panel === "settings" ? "Workspace preferences" : "Accounts Receivable Executive";
}

document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderKanban();
});

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeModal();
});
document.getElementById("stage-select").addEventListener("change", (e) => {
  if (activeCandidateId) moveCandidate(activeCandidateId, e.target.value);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
