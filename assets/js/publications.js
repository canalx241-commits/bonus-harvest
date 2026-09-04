/* Bonus Harvest — affichage des publications d'un service.
   Lit window.BH_DATA[slug] (fourni par data/<slug>.js) et remplit :
     #documents  -> résumés de documents
     #photos     -> photos de terrain
   Le slug vient de <body data-page="services/<slug>">. */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "";
  var slug = page.indexOf("services/") === 0 ? page.slice("services/".length) : "";
  var data = (window.BH_DATA && window.BH_DATA[slug]) || { documents: [], photos: [] };

  var ROOT = document.body.getAttribute("data-root") || "";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function frDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return esc(iso);
    var p = iso.split("-");
    var mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin",
      "juill.", "août", "sept.", "oct.", "nov.", "déc."];
    return p[2].replace(/^0/, "") + " " + mois[+p[1] - 1] + " " + p[0];
  }

  function withRoot(path) {
    if (/^(https?:)?\/\//.test(path) || path.charAt(0) === "/") return path;
    return ROOT + path;
  }

  /* ---------- Documents ---------- */

  var docsHost = document.getElementById("documents");
  if (docsHost) {
    var docs = Array.isArray(data.documents) ? data.documents : [];
    if (!docs.length) {
      docsHost.innerHTML =
        '<p class="pub-empty">Aucun résumé de document publié pour le moment.</p>';
    } else {
      docsHost.innerHTML =
        '<ul class="doc-list">' +
        docs
          .slice()
          .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); })
          .map(function (d) {
            var actions = "";
            if (d.fichier) {
              var pdfPath = withRoot(esc(d.fichier));
              actions =
                '<div class="doc-item__actions">' +
                '<button type="button" class="doc-item__action" data-preview-pdf="' + pdfPath +
                '" data-title="' + esc(d.titre) + '">Aperçu</button>' +
                '<a class="doc-item__action" href="' + pdfPath + '">Télécharger le PDF</a>' +
                "</div>";
            }
            return (
              '<li class="doc-item">' +
              '<p class="doc-item__meta">' + frDate(d.date) + "</p>" +
              "<h3>" + esc(d.titre) + "</h3>" +
              "<p>" + esc(d.resume) + "</p>" +
              actions +
              "</li>"
            );
          })
          .join("") +
        "</ul>";
    }
  }

  /* ---------- Photos de terrain ---------- */

  var photosHost = document.getElementById("photos");
  if (photosHost) {
    var photos = Array.isArray(data.photos) ? data.photos : [];
    if (!photos.length) {
      photosHost.innerHTML =
        '<p class="pub-empty">Aucune photo de terrain publiée pour le moment.</p>';
    } else {
      photosHost.innerHTML =
        '<div class="gallery">' +
        photos
          .slice()
          .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); })
          .map(function (p) {
            var imgPath = withRoot(esc(p.image));
            return (
              "<figure>" +
              '<button type="button" class="thumb" data-preview-img="' + imgPath +
              '" data-caption="' + esc(p.legende) + '">' +
              '<img src="' + imgPath + '" alt="' + esc(p.legende) +
              '" loading="lazy" width="800" height="600"' +
              " onerror=\"this.onerror=null;this.src='" + ROOT + "assets/img/placeholder.svg'\">" +
              "</button>" +
              "<figcaption>" + esc(p.legende) +
              (p.date ? "<time>" + frDate(p.date) + "</time>" : "") +
              "</figcaption>" +
              "</figure>"
            );
          })
          .join("") +
        "</div>";
    }
  }
})();
