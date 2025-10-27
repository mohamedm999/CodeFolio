# CodeFolio

## 📦 Packages

### Dependencies
- **express** (^5.1.0) - Framework web pour créer le serveur HTTP
- **mongoose** (^8.19.2) - ODM MongoDB pour la gestion de la base de données
- **dotenv** (^17.2.3) - Gestion des variables d'environnement

### Dev Dependencies
- **typescript** (^5.9.3) - Langage de programmation typé
- **ts-node** (^10.9.2) - Exécution TypeScript sans compilation
- **nodemon** (^3.1.10) - Rechargement automatique du serveur
- **@types/express** (^5.0.4) - Types TypeScript pour Express
- **@types/node** (^24.9.1) - Types TypeScript pour Node.js

## 📁 Structure du Projet

```
CodeFolio/
├── src/
│   ├── config/          # Configuration DB et variables d'environnement
│   ├── models/          # Schémas Mongoose pour MongoDB
│   ├── graphql/         # TypeDefs et Resolvers GraphQL
│   ├── utils/           # Utilitaires (gestion erreurs, validation)
│   └── index.ts         # Point d'entrée du serveur Express
├── .env                 # Variables d'environnement (non versionné)
├── .gitignore          # Fichiers à ignorer par Git
├── package.json        # Dépendances et scripts npm
└── tsconfig.json       # Configuration TypeScript
```

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

Créer un fichier `.env` avec les variables nécessaires:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/codefolio
```

## 🏃 Démarrage

```bash
# Développement
npm run dev

# Production
npm start
```
