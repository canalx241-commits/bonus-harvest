# Site Bonus Harvest

Site vitrine de **Bonus Harvest** (bois tropical, gestion forestière durable), inspiré de
la structure du site Precious Woods.

Site **statique** : uniquement des fichiers HTML, CSS et JavaScript. Pas d'installation,
pas de logiciel serveur, pas de base de données. Hébergeable gratuitement sur **GitHub Pages**.

---

## 1. Voir le site sur mon ordinateur

### Le plus simple

Double-clique sur `index.html`. Le site s'ouvre dans le navigateur. Tout fonctionne
(menu, pages de service, publications, outil de publication).

### Avec un petit serveur local (recommandé, plus proche du vrai site)

Dans le dossier `bonus-harvest`, lance :

```bash
python -m http.server 8000
```

Puis ouvre `http://localhost:8000/` dans le navigateur. Pour arrêter : `Ctrl + C`.

---

## 2. Contenu du site (première version)

| Page | Fichier |
|------|---------|
| Accueil | `index.html` |
| À propos | `a-propos.html` |
| Contact | `contact.html` |
| Vue d'ensemble des services | `services/index.html` |
| Une page par service | `services/<nom-du-service>.html` |
| Outil interne « Publier une fiche » | `outils/nouvelle-publication.html` |

### Menu « Services »

- **Direction Générale**
- **Direction de site**
- **Direction Gestion Durable** (page de présentation)
  - Gestion Durable · Aménagement · Monitoring · Contrôle Normes d'Exploitation ·
    Inventaire · Traçabilité · Cartographie · Hygiène Sécurité Environnement · FSAI ·
    Reboisement et Recherche · Social Externe · Ressource Humaine

Chaque service a une page avec deux sections : **Résumés de documents** et
**Photos de terrain**.

---

## 3. Publier un résumé de document ou une photo de terrain

Le contenu de chaque service est dans un fichier `data/<service>.js`
(exemple : `data/tracabilite.js`).

### Méthode assistée (conseillée)

1. Ouvre `outils/nouvelle-publication.html` dans le navigateur.
2. Choisis le service, le type (document ou photo), remplis les champs.
3. Clique sur **Générer la fiche**.
4. Copie le bloc affiché **dans le bon fichier `data/<service>.js`**, à l'intérieur du
   tableau `documents: [ ... ]` (pour un document) ou `photos: [ ... ]` (pour une photo).
   S'il y a déjà une fiche, ajoute une **virgule** entre les deux blocs.
5. Dépose la photo dans `assets/img/terrain/<service>/` ou le PDF dans `assets/docs/`,
   avec **exactement** le nom de fichier indiqué.
6. Publie (voir section 4).

### Exemple de fichier `data/<service>.js`

```js
window.BH_DATA = window.BH_DATA || {};
window.BH_DATA["tracabilite"] = {
  documents: [
    {
      titre: "Rapport trimestriel de traçabilité — T3 2026",
      date: "2026-09-01",
      resume: "Volumes suivis de la souche à l'expédition, anomalies traitées.",
      fichier: "assets/docs/tracabilite-t3-2026.pdf"   // ligne optionnelle
    }
  ],
  photos: [
    {
      image: "assets/img/terrain/tracabilite/marquage-grumes.jpg",
      legende: "Marquage et numérotation des grumes au parc forêt",
      date: "2026-08-20"
    }
  ]
};
```

Règles :
- Les dates s'écrivent `AAAA-MM-JJ` (ex. `2026-09-01`).
- Garde les guillemets droits `"` autour des textes.
- La ligne `fichier:` est facultative (à mettre seulement si un PDF accompagne la fiche).

---

## 4. Mettre le site en ligne (GitHub Pages)

> Cette partie se fait **une seule fois** pour la mise en place, puis 3 commandes à
> chaque publication. Elle sera faite ensemble, étape par étape.

Pour publier une modification une fois le dépôt en place, dans le dossier `bonus-harvest` :

```bash
git add .
git commit -m "Publication : <ce que tu as ajouté>"
git push
```

Le site en ligne se met à jour tout seul au bout d'une à deux minutes.

---

## 5. Personnalisation

### Logo

Le vrai logo est dans `assets/Logo_BH.png` (utilisé dans l'en-tête et comme favicon sur
toutes les pages). Pour le remplacer par une nouvelle version, dépose le nouveau fichier
sous le même nom `assets/Logo_BH.png` — aucune page à modifier.

### Couleur du site

La couleur principale a été prélevée sur le logo. Elle est définie **à un seul endroit** :
`assets/css/style.css`, tout en haut :

```css
--color-primary: #017a34;   /* vert du logo Bonus Harvest */
```

Change cette valeur si le logo change : liens, onglet actif, boutons, en-têtes de page et
pied de page suivent automatiquement.

---

## 6. Structure des dossiers

```
bonus-harvest/
├── index.html                  Accueil
├── a-propos.html               À propos
├── contact.html                Contact
├── services/                   Vue d'ensemble + une page par service
├── outils/
│   └── nouvelle-publication.html   Outil interne pour préparer une fiche
├── data/
│   ├── _services.js            Liste centrale des services (menu, vue d'ensemble, outil)
│   └── <service>.js            Publications d'un service (documents + photos)
├── assets/
│   ├── css/style.css           Styles + couleur principale
│   ├── Logo_BH.png             Logo Bonus Harvest (en-tête + favicon)
│   ├── js/site.js              En-tête et pied de page communs
│   ├── js/publications.js      Affichage des publications d'un service
│   ├── js/latest.js            Encart « Dernières publications » de l'accueil
│   ├── img/terrain/<service>/  Photos de terrain, un dossier par service
│   └── docs/                   Documents PDF
└── .nojekyll                   Pour GitHub Pages
```

---

## 7. À faire plus tard (version 2)

- Rubriques Durabilité / Produits / Actualités / Investisseurs.
- Vrai formulaire de contact (avec envoi côté serveur).
- Préciser l'intitulé du sigle **FSAI** et les missions détaillées du service.
- Compléter les coordonnées, les chiffres clés et les certifications réelles.
