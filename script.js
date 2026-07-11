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
const sunIcon = themeToggle.querySelector(".icon-sun");
const moonIcon = themeToggle.querySelector(".icon-moon");

function setSvgHidden(svg, hidden) {
  if (hidden) {
    svg.setAttribute("hidden", "");
  } else {
    svg.removeAttribute("hidden");
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  setSvgHidden(sunIcon, isDark);
  setSvgHidden(moonIcon, !isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

const storedTheme = localStorage.getItem("card-theme");
const initialTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("card-theme", next);
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
