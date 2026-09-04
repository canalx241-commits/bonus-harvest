/* Bonus Harvest — encart « Dernières publications » de la page d'accueil.
   Charge tous les fichiers data/<slug>.js (liste dans BH_SERVICES), puis affiche
   les publications les plus récentes, tous services confondus, dans #latest. */
(function () {
  "use strict";

  var host = document.getElementById("latest");
  if (!host) return;

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

  function render() {
    var data = window.BH_DATA || {};
    var items = [];
    services.forEach(function (s) {
      var d = data[s.slug];
      if (!d) return;
      (d.documents || []).forEach(function (x) {
        items.push({ type: "Document", titre: x.titre, date: x.date, service: s });
      });
      (d.photos || []).forEach(function (x) {
        items.push({ type: "Photo de terrain", titre: x.legende, date: x.date, service: s });
      });
    });

    if (!items.length) {
      host.innerHTML = '<p class="pub-empty">Aucune publication pour le moment.</p>';
      return;
    }

    items.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });

    host.innerHTML =
      '<div class="card-grid">' +
      items.slice(0, 6).map(function (it) {
        return (
          '<a class="card" href="' + ROOT + "services/" + it.service.slug + '.html">' +
          '<span class="card__tag">' + esc(it.type) + "</span>" +
          "<h3>" + esc(it.titre) + "</h3>" +
          '<p>' + esc(it.service.nom) + " · " + frDate(it.date) + "</p>" +
          "</a>"
        );
      }).join("") +
      "</div>";
  }
})();
