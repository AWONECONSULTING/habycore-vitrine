# HabyCore

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

- Références graphiques : fichiers HTML HabyCore en anglais et en français, fournis par la designer dans le même dossier.
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
- Le cadre du logo reste carré et centré dans la Hero, même sur les tablettes
  portrait larges (> 960 px). Les bulles ne s’étirent plus sur toute la hauteur
  du viewport ; le visuel est aussi limité par la hauteur disponible en paysage.
- Tablettes de 641 à 1100 px et appareils tactiles plus larges, en portrait comme
  en paysage (dont Surface Pro 10) : même composition verticale resserrée,
  titre de 52 à 64 px, introduction de 21 px et illustration carrée agrandie avec
  ses trois bulles flottantes. Les espaces sont fixes entre les éléments ; la
  hauteur libre centre l’ensemble plutôt que d’étirer chaque rangée. Les traits
  restent attachés aux bulles à ce format également.
- CTA de la Hero sur tablette : hauteur minimale de 64 px, texte de 18 px et
  espacements agrandis pour une lecture et une utilisation tactile confortables.
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
- Contrôle visuel effectué en émulation Chrome : iPhone SE (375 × 667), iPad Mini
  portrait (768 × 1024) et paysage (1024 × 768). Comparaison avec le fichier anglais
  aux formats mobile et tablette ; les ajustements validés sont conservés.
- Éléments inspectés : Hero, CTA, menu replié, cartes d’activités et leurs flèches,
  méthode et ses flèches, formulaire, messages de validation et pages légales.
  Les seuils de la maquette (1080, 960, 640 et 420 px) sont conservés, avec
  l’adaptation ciblée des tablettes portrait décrite ci-dessus.
- Hero Surface Pro 10 contrôlée visuellement en émulation à 960 × 1440 après
  adaptation : titre agrandi, illustration et trois bulles visibles, composition
  regroupée et bande noire hors du premier écran.
- Menu : le libellé du bouton revient à « Open menu » / « Ouvrir le menu » après
  sélection d’une section, en cohérence avec son état fermé.
- Méthode : une sélection manuelle annule désormais le prochain changement
  automatique avant de programmer un nouveau minuteur. La lecture automatique
  initiale et les animations restent identiques.

Le formulaire FR/EN utilise l’URL publique centralisée dans `src/config/contact.js` :
`https://n8n.awone.eu/webhook/habycore-contact-v1`.
Le workflow unique [HABYCORE | Formulaire de contact](https://n8n.awone.eu/workflow/PiSBgAgiXukZZ1gT)
valide les champs, les longueurs, le consentement et le champ anti-spam `website`,
puis envoie le contenu en texte brut à `contact@habycore.com` avec la connexion
Gmail existante. L’adresse du visiteur est utilisée comme adresse de réponse.
La confirmation JSON `{ "ok": true }` suit l’envoi Gmail réussi ; une demande
invalide reçoit un statut 400. Le site conserve les champs en cas d’échec et
n’effectue aucune nouvelle tentative automatique. Sans JavaScript, le formulaire
effectue un POST natif et affiche la réponse JSON du service.

Les origines autorisées sont `https://habycore.com`, `https://www.habycore.com`,
`http://localhost:4321` et `http://127.0.0.1:4321`. Une nouvelle URL d’aperçu ou un
autre domaine nécessite une adaptation du webhook et de sa validation d’origine.
L’URL du webhook est publique ; aucun secret n’est placé dans le site.
Le champ anti-spam ne remplace pas une protection contre les abus à fort volume.
Les coordonnées et textes légaux présents sont repris de la maquette fournie.

Vérification du raccordement le 26 novembre 2026 :

- `npm run build` réussi : les deux pages statiques sont générées.
- Envois FR et EN depuis le site compilé en aperçu local : confirmations affichées,
  deux mails reçus et classés automatiquement sous `HABYCORE 🛸` dans Gmail.
- Contenu, accents, retours à la ligne et adresse de réponse contrôlés.
- Champs vides bloqués dans le navigateur ; le webhook renvoie un statut 400 pour
  les champs vides, un e-mail invalide, un consentement absent, un objet inconnu,
  un message trop long, une injection d’en-têtes ou une origine non autorisée.
- Champ anti-spam rempli : réponse neutre 200, sans envoi de mail.
- Le workflow n8n est publié. Le site modifié n’a pas été déployé.

Le domaine, les URL canoniques, le sitemap, les visuels de partage et l’hébergement
restent à configurer. Aucun suivi d’audience n’est ajouté.

Les conventions locales de développement sont décrites dans `AGENTS.md`, adapté
du projet Awone et ignoré par Git.
