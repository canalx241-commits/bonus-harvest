/* Bonus Harvest — aperçu (lightbox) des PDF et des photos avant téléchargement.
   Un seul composant, réutilisé par toutes les pages de service (voir publications.js).
   Écoute les clics par délégation sur [data-preview-img] et [data-preview-pdf]. */
(function () {
  "use strict";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.hidden = true;
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-labelledby", "lightbox-title");
  lb.innerHTML =
    '<div class="lightbox__panel">' +
    '<div class="lightbox__bar"><strong id="lightbox-title"></strong>' +
    '<button type="button" class="lightbox__close" aria-label="Fermer l’aperçu">&times;</button></div>' +
    '<div class="lightbox__body"></div>' +
    "</div>";
  document.body.appendChild(lb);

  var titleEl = lb.querySelector("#lightbox-title");
  var bodyEl = lb.querySelector(".lightbox__body");
  var closeBtn = lb.querySelector(".lightbox__close");
  var lastFocus = null;

  function close() {
    if (lb.hidden) return;
    lb.hidden = true;
    bodyEl.innerHTML = ""; // stoppe le chargement du PDF ou de l'image en cours
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function openImage(src, caption) {
    var ROOT = document.body.getAttribute("data-root") || "";
    lastFocus = document.activeElement;
    titleEl.textContent = caption || "Aperçu de la photo";
    bodyEl.innerHTML =
      '<img src="' + esc(src) + '" alt="' + esc(caption) + '"' +
      " onerror=\"this.onerror=null;this.src='" + ROOT + "assets/img/placeholder.svg'\">";
    lb.hidden = false;
    closeBtn.focus();
  }

  function openPdf(src, title) {
    lastFocus = document.activeElement;
    titleEl.textContent = title || "Aperçu du document";
    bodyEl.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(title || "Document PDF") + '"></iframe>';
    lb.hidden = false;
    closeBtn.focus();
  }

  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lb.hidden) close();
  });

  document.addEventListener("click", function (e) {
    var imgBtn = e.target.closest && e.target.closest("[data-preview-img]");
    if (imgBtn) {
      e.preventDefault();
      openImage(imgBtn.getAttribute("data-preview-img"), imgBtn.getAttribute("data-caption"));
      return;
    }
    var pdfBtn = e.target.closest && e.target.closest("[data-preview-pdf]");
    if (pdfBtn) {
      e.preventDefault();
      openPdf(pdfBtn.getAttribute("data-preview-pdf"), pdfBtn.getAttribute("data-title"));
    }
  });

  window.BHLightbox = { openImage: openImage, openPdf: openPdf, close: close };
})();
