# Projet OnSpace — Démarrage et Utilisation

## Comment lancer cette application (Guide rapide)

Prérequis:
- Node.js 18+ (recommandé: utiliser nvm) — [installer via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm (fourni avec Node). Vous pouvez aussi utiliser pnpm, yarn, ou bun si vous préférez.

Étapes:
```sh
# 1) Cloner le dépôt
git clone <URL_DU_DEPOT>
cd hhh  # ou le nom de votre dossier cloné

# 2) Installer les dépendances
npm install  # ou: pnpm i | yarn | bun install

# 3) Lancer le serveur de développement
npm run dev   # Vite démarre (par défaut http://localhost:5173)
```

Aperçu build de production:
```sh
# Construire l'application
npm run build

# Prévisualiser le build (serveur statique Vite)
npm run preview  # généralement sur http://localhost:4173
```

Dépannage rapide:
- Si npm run dev échoue, vérifiez votre version de Node: `node -v` (>= 18 recommandé).
- Si un port est occupé, relancez avec: `PORT=5174 npm run dev` (ou modifiez la config Vite si nécessaire).
- Supprimez node_modules et package-lock.json puis réinstallez si les dépendances posent problème.

## Modifier le code

Plusieurs options s’offrent à vous.

**Utiliser OnSpace**
- Ouvrez le [projet OnSpace]() et commencez à proposer vos changements.
- Les modifications faites via OnSpace sont automatiquement commit dans ce repo.

**Utiliser votre IDE préféré (localement)**
- Clonez ce repo et poussez vos changements; ils seront reflétés dans OnSpace.

## Technologies utilisées
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Déployer
- Ouvrez [OnSpace]() puis Share -> Publish.
