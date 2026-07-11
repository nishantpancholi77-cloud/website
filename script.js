const root = document.documentElement;
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("card-theme");
if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
  themeToggle.checked = storedTheme === "dark";
} else {
  themeToggle.checked = window.matchMedia("(prefers-color-scheme: dark)").matches;
}

themeToggle.addEventListener("change", () => {
  const theme = themeToggle.checked ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  localStorage.setItem("card-theme", theme);
});

// Mask / unmask email
const maskToggle = document.getElementById("maskToggle");
const emailLabel = document.getElementById("emailLabel");
const fullEmail = emailLabel.textContent;
const maskedEmail = fullEmail.replace(/^(.{2}).*(@.*)$/, "$1••••••$2");
let isMasked = false;

maskToggle.addEventListener("click", () => {
  isMasked = !isMasked;
  emailLabel.textContent = isMasked ? maskedEmail : fullEmail;
  maskToggle.setAttribute("aria-pressed", String(isMasked));
  maskToggle.querySelector(".icon-eye").hidden = isMasked;
  maskToggle.querySelector(".icon-eye-off").hidden = !isMasked;
});

// Share
async function shareCard() {
  const shareData = {
    title: "Nishant Pancholi — Digital Card",
    text: "Here's my digital business card",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== "AbortError") showToast("Couldn't share");
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(shareData.url);
    showToast("Link copied to clipboard");
  } catch (err) {
    showToast("Couldn't copy link");
  }
}

document.getElementById("shareBtn").addEventListener("click", shareCard);
document.getElementById("navShare").addEventListener("click", shareCard);

// Save contact (vCard)
function saveContact() {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Pancholi;Nishant;;;",
    "FN:Nishant Pancholi",
    "TITLE:Software Engineer",
    "EMAIL;TYPE=INTERNET:nishantpancholi77@gmail.com",
    "URL:https://github.com/nishantpancholi77-cloud",
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Nishant-Pancholi.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("Contact saved");
}

document.getElementById("saveContact").addEventListener("click", saveContact);
document.getElementById("navSave").addEventListener("click", saveContact);

// Bottom nav scroll + active state
const navButtons = document.querySelectorAll(".nav-btn[data-scroll]");
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.scroll;
    if (targetId === "top") {
      document.querySelector(".card").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth", block: "center" });
    }
    navButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
});
