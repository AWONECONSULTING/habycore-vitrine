# HabyCore — Site vitrine

Site corporate de HabyCore : entrepreneuriat digital, développement de marques
e-commerce, conseil technologique et transmission de compétences.

## Socle technique

- Astro 7.4.13, dernière version stable vérifiée lors de l’initialisation.
- Lenis 1.3.28 pour le défilement à inertie à la molette et au trackpad.
- Génération statique, composants `.astro`, CSS classique.
- JavaScript natif uniquement pour les interactions nécessaires.
- Configuration TypeScript stricte.
- Node.js >= 22.23.4 et npm >= 9.6.5.

## Démarrage

Les dépendances sont installées. Pour démarrer le serveur local :

```sh
npm run dev
```

Sous PowerShell, utiliser `npm.cmd` si la politique d’exécution bloque `npm.ps1`.
Le `package-lock.json` fixe les versions installées. Pour réinstaller les
dépendances, utiliser `npm ci` après validation.

Commandes de validation, à exécuter après accord :

```sh
npm run build
npm run preview
```

Aucune commande de lint ni suite de tests n’est configurée à ce stade.

## Organisation

```text
src/
  components/          Sections, navigation, SVG et pages légales
  components/en/       Sections issues directement de la maquette anglaise
  components/Site.astro Composition partagée des deux langues
  layouts/Base.astro   Document HTML, polices et métadonnées
  pages/index.astro    Accueil anglais (/)
  pages/fr/index.astro Version française (/fr/)
  scripts/main.js     Interactions et animations de la maquette
  scripts/smooth-scroll.js  Amélioration du défilement avec Lenis
  styles/global.css   Styles et responsive de la maquette anglaise
```

Les composants Astro n’ajoutent aucun conteneur HTML : les sélecteurs, la structure
des sections et la géométrie des SVG de la maquette sont conservés.

## Références et fidélité

- Référence graphique : `HabyCore — Website (EN).html`, fourni par la designer.
- Référence française : `HabyCore — Site vitrine.html`, dans le même dossier.
- Styles, couleurs, espacements, SVG, transitions et animations repris de la
  référence anglaise. L’accueil est en anglais ; `/fr/` conserve les textes français.
- Seuils responsive conservés : 1080, 960, 640 et 420 px.
- Polices identiques : Barlow Semi Condensed, Barlow et JetBrains Mono, via les
  mêmes liens Google Fonts que la maquette.
- Le sélecteur FR/EN relie les deux versions locales. Le lien FR de la maquette
  anglaise est remplacé par `/fr/`, sans renvoi vers l’outil de maquettage.
- La barre d’outils de développement Astro est désactivée pour préserver le rendu.

Lenis est chargé sur les appareils à pointeur précis lorsque
le mouvement réduit n’est pas demandé. Le défilement tactile conserve l’inertie
native. Les gestes horizontaux des carrousels restent natifs ; leur survol ne
désactive pas le lissage vertical de la page. Le champ de message et les pages
légales gardent leur défilement indépendant. Lenis est suspendu lors de l’ouverture
des pages légales.

Corrections demandées après intégration :

- Loader : les deux moitiés du logo s’écartent puis se rapprochent en boucle,
  avec pulsation lumineuse, orbite et reflet sur la barre. La durée et la sortie
  du loader restent inchangées ; le mode mouvement réduit continue de l’ignorer.
- Lissage CSS désactivé pendant l’exécution de Lenis, pour éviter deux animations
  concurrentes de la position de scroll et les oscillations lors d’un changement de sens.
- Ancres : le décalage de 69 px correspond exactement à la hauteur de la navigation
  compacte (logo 48 px, padding 20 px, bordure 1 px). Il est appliqué une seule fois
  via `scroll-padding-top`, que Lenis lit directement.
- Hero : titre, logo et boutons occupent au minimum un viewport stable (`100svh`,
  repli `100vh`). La bande noire des trois pôles est un bloc suivant, hors du premier
  écran. Le contenu reste libre de grandir sur un écran trop petit, sans être coupé.
- Les trois bulles autour du logo flottent légèrement avec des périodes différentes,
  après leur apparition, sur une amplitude verticale totale de 28 px. Les traits
  suivent leurs bords en coordonnées SVG, y compris lorsque le ratio du visuel
  change avec l’écran. L’effet est désactivé en mouvement réduit.
- Bulle Hero : le mot sortant reste hors du masque au-dessus jusqu’à sa prochaine
  entrée ; il ne redescend plus à travers le mot entrant.
- Logos Hero et Contact : passage lumineux normalisé sur la longueur du tracé,
  dans un seul sens, en environ 0,77 seconde, avec une pause uniquement hors du
  tracé entre deux passages. Le trait Hero est plus lumineux et légèrement épaissi.

## État et vérifications

- `npm run build` exécuté avec succès pour les deux pages.
- Les routes `/` et `/fr/` répondent HTTP 200 avec la bonne langue HTML.
- Comparaison initiale du HTML compilé anglais : structure et attributs du corps
  identiques à la maquette, à l’exception du lien FR local. Le tracé lumineux de
  Contact dispose désormais de `pathLength="1"` pour normaliser son animation.
- Le CSS anglais sert de référence, avec les corrections ciblées décrites ci-dessus.
  Une règle limitée à `html:lang(fr)` traduit le libellé « to complete ».
- Comparaison française : textes et géométrie SVG identiques à la source française.
- Interactions reprises de la maquette ; le défilement, la rotation des mots et le
  passage lumineux ont reçu les corrections demandées ci-dessus.
- Vérification syntaxique des scripts JavaScript réussie.
- Nouvelle tentative de contrôle visuel : Chrome a été accessible initialement,
  mais l’outil a de nouveau arrêté les interactions faute de pouvoir identifier
  avec certitude l’URL active. La comparaison visuelle desktop/tablette/mobile
  et la validation des interactions dans le navigateur restent à effectuer.

Le formulaire conserve le comportement de démonstration de la maquette : validation
locale et écran « Demande prête à être envoyée ». Il n’envoie aucun message.
Le raccordement à une messagerie reste à définir. Les coordonnées et textes légaux
présents sont repris de la maquette fournie.

Le domaine, les URL canoniques, le sitemap, les visuels de partage et l’hébergement
restent à configurer. Aucun suivi d’audience n’est ajouté.

Les conventions locales de développement sont décrites dans `AGENTS.md`, adapté
du projet Awone et ignoré par Git.
