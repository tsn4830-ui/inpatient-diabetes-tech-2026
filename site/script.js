"use strict";
const slides = [...document.querySelectorAll(".slide")],
  total = slides.length;
const stage = document.querySelector("#stage"),
  deck = document.querySelector("#deck"),
  counter = document.querySelector("#counter"),
  toc = document.querySelector("#toc"),
  notes = document.querySelector("#notes");
let current = 0,
  slideData = [],
  touchStart = null;
function fit() {
  if (innerWidth <= 700) {
    stage.style.height = "auto";
    return;
  }
  const scale = Math.min(
    (innerWidth - 48) / 1280,
    (innerHeight - 150) / 720,
    1.5,
  );
  stage.style.width = `${1280 * scale}px`;
  stage.style.height = `${720 * scale}px`;
  deck.style.transform = `scale(${scale})`;
}
function readHash() {
  const n = Number(location.hash.slice(1));
  return Number.isInteger(n) && n >= 1 && n <= total ? n - 1 : 0;
}
function show(n, updateHash = true) {
  current = Math.max(0, Math.min(total - 1, n));
  slides.forEach((s, i) => (s.hidden = i !== current));
  counter.textContent = `${current + 1} / ${total}`;
  document.querySelector("#prev").disabled = current === 0;
  document.querySelector("#next").disabled = current === total - 1;
  document.querySelector("#progress-fill").style.width =
    `${((current + 1) / total) * 100}%`;
  document
    .querySelector(".progress")
    .setAttribute("aria-valuenow", String(current + 1));
  document.querySelectorAll("#toc-items button").forEach((b, i) => {
    if (i === current) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  document.querySelector("#notes-content").textContent =
    slideData[current]?.notes || "正在載入教學備註…";
  if (updateHash) history.replaceState(null, "", `#${current + 1}`);
  if (innerWidth <= 700) window.scrollTo({ top: 0, behavior: "instant" });
}
slides.forEach((s, i) => {
  const b = document.createElement("button");
  b.textContent = `${i + 1}. ${s.querySelector("h1").innerText.replaceAll("\n", " ")}`;
  b.addEventListener("click", () => {
    show(i);
    toc.close();
  });
  document.querySelector("#toc-items").append(b);
});
document.querySelector("#prev").onclick = () => show(current - 1);
document.querySelector("#next").onclick = () => show(current + 1);
document.querySelector("#toc-button").onclick = () => toc.showModal();
document.querySelector("#close-toc").onclick = () => toc.close();
document.querySelector("#notes-button").onclick = (e) => {
  notes.hidden = !notes.hidden;
  e.currentTarget.setAttribute("aria-expanded", String(!notes.hidden));
};
document.querySelector("#print-button").onclick = () => window.print();
document.querySelector("#fullscreen-button").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.body.requestFullscreen)
      await document.body.requestFullscreen();
    else alert("此瀏覽器未支援全螢幕；可使用瀏覽器的「隱藏工具列」。");
  } catch {
    alert("無法切換全螢幕，請使用瀏覽器的全螢幕功能。");
  }
};
document.addEventListener("fullscreenchange", () => {
  document.querySelector("#fullscreen-button").textContent =
    document.fullscreenElement ? "離開全螢幕" : "全螢幕";
  fit();
});
document.addEventListener("keydown", (e) => {
  if (
    toc.open ||
    e.altKey ||
    e.ctrlKey ||
    e.metaKey ||
    /INPUT|TEXTAREA|SELECT|BUTTON|A/.test(e.target.tagName) ||
    e.target.isContentEditable
  )
    return;
  if (
    [
      "ArrowRight",
      "PageDown",
      "ArrowLeft",
      "PageUp",
      "Home",
      "End",
      " ",
    ].includes(e.key)
  ) {
    e.preventDefault();
    if (["ArrowRight", "PageDown", " "].includes(e.key)) show(current + 1);
    else if (["ArrowLeft", "PageUp"].includes(e.key)) show(current - 1);
    else show(e.key === "Home" ? 0 : total - 1);
  }
});
stage.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length === 1 && !e.target.closest("a,button"))
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    else touchStart = null;
  },
  { passive: true },
);
stage.addEventListener(
  "touchend",
  (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x,
      dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5)
      show(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  },
  { passive: true },
);
stage.addEventListener("touchcancel", () => (touchStart = null), {
  passive: true,
});
window.addEventListener("resize", fit);
window.addEventListener("hashchange", () => show(readHash(), false));
fetch("slides.json")
  .then((r) => {
    if (!r.ok) throw Error("notes");
    return r.json();
  })
  .then((data) => {
    slideData = data;
    show(current, false);
  })
  .catch(() => {
    document.querySelector("#notes-content").textContent =
      "教學備註暫時無法載入，請重新整理或查閱原文。";
  });
fit();
show(readHash(), false);
