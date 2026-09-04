/* Bonus Harvest — page Aperçu : liste TOUTES les publications (documents + photos)
   de TOUS les services, avec un filtre. Charge tous les data/<service>.js (liste dans
   BH_SERVICES), agrège, trie par date décroissante, puis affiche dans #apercu-list. */
(function () {
  "use strict";

  var listHost = document.getElementById("apercu-list");
  var countsHost = document.getElementById("apercu-counts");
  if (!listHost) return;

  var ROOT = document.body.getAttribute("data-root") || "";
  var services = window.BH_SERVICES || [];
  var pending = services.length;
  if (!pending) return;

  services.forEach(function (s) {
    var el = document.createElement("script");
    el.src = ROOT + "data/" + s.slug + ".js";
    el.onload = el.onerror = done;
    document.head.appendChild(el);
  });

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function frDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return esc(iso);
    var p = iso.split("-");
    var mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin",
      "juill.", "août", "sept.", "oct.", "nov.", "déc."];
    return p[2].replace(/^0/, "") + " " + mois[+p[1] - 1] + " " + p[0];
  }

  function done() {
    if (--pending > 0) return;
    render();
  }

  var items = [];

  function collect() {
    var data = window.BH_DATA || {};
    services.forEach(function (s) {
      var d = data[s.slug];
      if (!d) return;
      (d.documents || []).forEach(function (x) {
        items.push({ kind: "document", titre: x.titre, date: x.date, service: s });
      });
      (d.photos || []).forEach(function (x) {
        items.push({ kind: "photo", titre: x.legende, date: x.date, service: s });
      });
    });
    items.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
  }

  function renderList(filter) {
    var shown = filter === "tous" ? items : items.filter(function (it) { return it.kind === filter; });
    if (!shown.length) {
      listHost.innerHTML = '<p class="pub-empty">Aucune publication dans cette catégorie pour le moment.</p>';
      return;
    }
    listHost.innerHTML =
      '<div class="card-grid">' +
      shown.map(function (it) {
        var tag = it.kind === "document" ? "Document" : "Photo de terrain";
        return (
          '<a class="card" href="' + ROOT + "services/" + it.service.slug + '.html">' +
          '<span class="card__tag">' + esc(tag) + "</span>" +
          "<h3>" + esc(it.titre) + "</h3>" +
          "<p>" + esc(it.service.nom) + " · " + frDate(it.date) + "</p>" +
          "</a>"
        );
      }).join("") +
      "</div>";
  }

  function render() {
    collect();

    var nbDoc = items.filter(function (it) { return it.kind === "document"; }).length;
    var nbPhoto = items.filter(function (it) { return it.kind === "photo"; }).length;
    if (countsHost) {
      countsHost.textContent = items.length
        ? nbDoc + " document" + (nbDoc > 1 ? "s" : "") + " · " + nbPhoto + " photo" + (nbPhoto > 1 ? "s" : "") + " de terrain publiés"
        : "Aucune publication pour le moment.";
    }

    var filterHost = document.getElementById("apercu-filtres");
    if (filterHost) {
      var buttons = filterHost.querySelectorAll("button");
      buttons.forEach(function (b) {
        b.addEventListener("click", function () {
          buttons.forEach(function (o) { o.classList.remove("btn--primary"); o.classList.add("btn--ghost"); o.setAttribute("aria-pressed", "false"); });
          b.classList.remove("btn--ghost");
          b.classList.add("btn--primary");
          b.setAttribute("aria-pressed", "true");
          renderList(b.getAttribute("data-filter"));
        });
      });
    }

    renderList("tous");
  }
})();
