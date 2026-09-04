/* Bonus Harvest — en-tête et pied de page communs.
   Injecte le menu (avec le sous-menu Services) et le footer sur chaque page.
   Le menu est décrit UNE SEULE FOIS ici. */
(function () {
  "use strict";

  var body = document.body;
  var ROOT = body.getAttribute("data-root") || ""; // "" à la racine, "../" dans /services
  var PAGE = body.getAttribute("data-page") || ""; // ex. "accueil", "services/tracabilite"

  var services = window.BH_SERVICES || [];
  function byGroup(g) {
    return services.filter(function (s) { return s.groupe === g; });
  }

  /* ---------- En-tête ---------- */

  function serviceLink(s) {
    var key = "services/" + s.slug;
    var current = key === PAGE ? ' aria-current="page"' : "";
    return '<li><a href="' + ROOT + "services/" + s.slug + '.html"' + current + ">" + s.nom + "</a></li>";
  }

  var dgdParent = byGroup("dgd-parent")[0];
  var submenuHtml =
    "<ul>" +
    byGroup("direction").map(serviceLink).join("") +
    '<li class="submenu__group">Direction Gestion Durable</li>' +
    (dgdParent ? serviceLink(dgdParent) : "") +
    '<li><ul class="submenu__nested">' +
    byGroup("dgd").map(serviceLink).join("") +
    "</ul></li>" +
    "</ul>";

  function topLink(page, href, label) {
    var current = page === PAGE ? ' aria-current="page"' : "";
    return '<li><a href="' + ROOT + href + '"' + current + ">" + label + "</a></li>";
  }

  var servicesActive = PAGE.indexOf("services") === 0;

  var headerHtml =
    '<a class="skip-link" href="#main">Aller au contenu</a>' +
    '<div class="container site-header__inner">' +
    '<a class="brand" href="' + ROOT + 'index.html">' +
    '<img src="' + ROOT + 'assets/Logo_BH.png" alt="" width="56" height="38">' +
    "<span>Bonus Harvest<small>Bois &amp; gestion durable</small></span>" +
    "</a>" +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
    '<nav class="main-nav" id="main-nav" aria-label="Navigation principale">' +
    "<ul>" +
    topLink("accueil", "index.html", "Accueil") +
    topLink("a-propos", "a-propos.html", "À propos") +
    '<li class="has-sub" data-open="false">' +
    '<button type="button" aria-expanded="false"' +
    (servicesActive ? ' style="box-shadow:inset 0 -2px 0 var(--color-primary)"' : "") +
    ">Services <span aria-hidden=\"true\">▾</span></button>" +
    '<div class="submenu">' + submenuHtml + "</div>" +
    "</li>" +
    topLink("apercu", "apercu.html", "Aperçu") +
    topLink("contact", "contact.html", "Contact") +
    "</ul>" +
    "</nav>" +
    "</div>";

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = headerHtml;
  body.insertBefore(header, body.firstChild);

  /* ---------- Pied de page ---------- */

  var year = new Date().getFullYear();
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="container">' +
    '<div class="site-footer__grid">' +
    "<div>" +
    '<p class="site-footer__brand">Bonus Harvest</p>' +
    "<p>Exploitation forestière responsable et gestion durable de la ressource bois.</p>" +
    '<div class="site-footer__cert"><span>FSC (à confirmer)</span><span>PEFC (à confirmer)</span><span>FSAI</span></div>' +
    "</div>" +
    "<div>" +
    "<h4>Naviguer</h4>" +
    "<ul>" +
    '<li><a href="' + ROOT + 'index.html">Accueil</a></li>' +
    '<li><a href="' + ROOT + 'a-propos.html">À propos</a></li>' +
    '<li><a href="' + ROOT + 'services/index.html">Services</a></li>' +
    '<li><a href="' + ROOT + 'apercu.html">Aperçu</a></li>' +
    '<li><a href="' + ROOT + 'contact.html">Contact</a></li>' +
    "</ul>" +
    "</div>" +
    "<div>" +
    "<h4>Contact</h4>" +
    "<ul>" +
    "<li>Adresse : à compléter</li>" +
    '<li><a href="mailto:contact@bonusharvest.example">contact@bonusharvest.example</a></li>' +
    "<li>Tél. : à compléter</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<div class="site-footer__legal">' +
    "<span>&copy; " + year + " Bonus Harvest. Tous droits réservés.</span>" +
    "<span>Mentions légales · Confidentialité (à rédiger)</span>" +
    "</div>" +
    "</div>";
  body.appendChild(footer);

  /* ---------- Interactions ---------- */

  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector(".main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  var sub = header.querySelector(".has-sub");
  var subBtn = sub.querySelector("button");

  function openSub(open) {
    sub.setAttribute("data-open", String(open));
    subBtn.setAttribute("aria-expanded", String(open));
  }

  subBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    openSub(sub.getAttribute("data-open") !== "true");
  });

  // Survol souris sur grand écran
  sub.addEventListener("mouseenter", function () {
    if (window.matchMedia("(min-width: 901px)").matches) openSub(true);
  });
  sub.addEventListener("mouseleave", function () {
    if (window.matchMedia("(min-width: 901px)").matches) openSub(false);
  });

  // Fermer au clic extérieur et à Échap
  document.addEventListener("click", function (e) {
    if (!sub.contains(e.target)) openSub(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      openSub(false);
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
