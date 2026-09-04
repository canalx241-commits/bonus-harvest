/* Liste centrale des services de Bonus Harvest.
   Une seule source pour le menu, la vue d'ensemble et le formulaire de publication.
   Pour ajouter un service : ajoute une ligne ici, crée la page HTML et le fichier data/<slug>.js. */
(function () {
  "use strict";

  window.BH_SERVICES = [
    // --- Directions principales ---
    { slug: "direction-generale", nom: "Direction Générale", groupe: "direction" },
    { slug: "direction-de-site", nom: "Direction de site", groupe: "direction" },

    // --- Sous-direction : Direction Gestion Durable ---
    { slug: "direction-gestion-durable", nom: "Direction Gestion Durable", groupe: "dgd-parent" },
    { slug: "gestion-durable", nom: "Gestion Durable", groupe: "dgd" },
    { slug: "amenagement", nom: "Aménagement", groupe: "dgd" },
    { slug: "monitoring", nom: "Monitoring", groupe: "dgd" },
    { slug: "controle-normes-exploitation", nom: "Contrôle Normes d'Exploitation", groupe: "dgd" },
    { slug: "inventaire", nom: "Inventaire", groupe: "dgd" },
    { slug: "tracabilite", nom: "Traçabilité", groupe: "dgd" },
    { slug: "cartographie", nom: "Cartographie", groupe: "dgd" },
    { slug: "hygiene-securite-environnement", nom: "Hygiène Sécurité Environnement", groupe: "dgd" },
    { slug: "fsai", nom: "FSAI", groupe: "dgd" },
    { slug: "reboisement-recherche", nom: "Reboisement et Recherche", groupe: "dgd" },
    { slug: "social-externe", nom: "Social Externe", groupe: "dgd" },
    { slug: "ressource-humaine", nom: "Ressource Humaine", groupe: "dgd" }
  ];

  window.BH_SERVICE_BY_SLUG = {};
  window.BH_SERVICES.forEach(function (s) {
    window.BH_SERVICE_BY_SLUG[s.slug] = s;
  });
})();
