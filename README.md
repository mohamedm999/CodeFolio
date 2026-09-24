# CodeFolio - Portfolio API GraphQL

API GraphQL pour gérer un portfolio professionnel avec authentification JWT, construite avec Node.js, TypeScript, Express, Apollo Server et MongoDB.

## 📚 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Démarrage](#-démarrage)
- [Tests](#-tests)
- [Docker](#-docker)
- [API GraphQL](#-api-graphql)
- [Structure du Projet](#-structure-du-projet)

## ✨ Fonctionnalités

- 🔐 **Authentification JWT** avec access & refresh tokens (15min + 7 jours)
- � **Logout sécurisé** avec blacklist côté serveur
- �📝 **API GraphQL** complète (Queries & Mutations)
- 🛡️ **Middleware d'authentification** pour protéger les mutations
- 📊 **Logging avancé** avec Winston et Morgan
- 🧪 **Tests unitaires** avec Jest
- 🐳 **Docker & Docker Compose** pour le déploiement
- 🔄 **CI/CD** avec GitHub Actions
- 💾 **Base de données MongoDB** avec Mongoose
- 📦 **Collection Postman** complète et testée (v2)

## 🛠️ Technologies

### Backend
- **Node.js** (20.x) - Runtime JavaScript
- **TypeScript** (5.9.3) - Langage typé
- **Express** (5.1.0) - Framework web
- **Apollo Server** (5.0.0) - Serveur GraphQL
- **MongoDB** - Base de données NoSQL
- **Mongoose** (8.19.2) - ODM MongoDB

### Authentification & Sécurité
- **jsonwebtoken** (9.0.2) - Génération JWT
- **bcryptjs** (3.0.2) - Hachage des mots de passe

### Logging
- **Winston** - Logging avancé
- **Morgan** - Logging HTTP

### Tests
- **Jest** (30.2.0) - Framework de tests
- **ts-jest** (29.4.5) - Support TypeScript pour Jest
- **Supertest** (7.1.4) - Tests HTTP

### DevOps
- **Docker** - Conteneurisation
- **Docker Compose** - Orchestration
- **GitHub Actions** - CI/CD

## 💻 Prérequis

- **Node.js** >= 20.x
- **npm** >= 10.x
- **MongoDB** >= 6.x (ou Docker)
- **Git**

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/mohamedm999/CodeFolio.git
cd CodeFolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer le fichier .env

```bash
cp .env.example .env
```

Puis éditez `.env` avec vos valeurs.

## ⚙️ Configuration

### Variables d'environnement requises

Créez un fichier `.env` à la racine du projet:

```env
# Server Configuration
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017/codefolio

# JWT Secrets (CHANGEZ CES VALEURS EN PRODUCTION!)
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this-in-production

# Logging (optional)
LOG_LEVEL=info
```

### Description des variables

| Variable | Description | Valeur par défaut | Requis |
|----------|-------------|-------------------|--------|
| `PORT` | Port du serveur | 4000 | Non |
| `MONGO_URI` | URI de connexion MongoDB | - | **Oui** |
| `JWT_SECRET` | Secret pour access tokens | - | **Oui** |
| `JWT_REFRESH_SECRET` | Secret pour refresh tokens | - | **Oui** |
| `LOG_LEVEL` | Niveau de log (error, warn, info, debug) | info | Non |

### Générer des secrets sécurisés

```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🏃 Démarrage

### Développement Local

#### 1. Démarrer MongoDB (si local)

```bash
# Avec Laragon (Windows)
# Démarrer MongoDB depuis l'interface Laragon

# Avec MongoDB installé localement
mongod

# Ou avec Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2. Créer un utilisateur admin

```bash
npm run seed:admin
```

Cela crée un utilisateur:
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Changez ce mot de passe en production!**

#### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:4000/graphql`

### Production

#### 1. Compiler le TypeScript

```bash
npm run build
```

#### 2. Lancer le serveur

```bash
npm start
```

## 🧪 Tests

### Exécuter tous les tests

```bash
npm test
```

### Mode watch (développement)

```bash
npm run test:watch
```

### Avec couverture de code

```bash
npm run test:coverage
```

Les rapports de couverture sont générés dans `coverage/`

## 🐳 Docker

### Démarrage rapide avec Docker Compose

#### 1. Créer le fichier .env

```bash
cp .env.example .env
```

#### 2. Démarrer tous les services

```bash
docker-compose up -d
```

Cela démarre:
- **API** sur `http://localhost:4001/graphql`
- **MongoDB** sur `localhost:27018`

#### 3. Créer l'utilisateur admin

```bash
docker-compose exec api npm run seed:admin
```

### Commandes Docker utiles

```bash
# Voir les logs
docker-compose logs -f api

# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Reconstruire les images
docker-compose build

# Redémarrer un service
docker-compose restart api

# Exécuter une commande dans le conteneur
docker-compose exec api npm test
```

### Build Docker manuel

```bash
# Construire l'image
docker build -t codefolio-api .

# Exécuter le conteneur
docker run -p 4000:4000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/codefolio \
  -e JWT_SECRET=your-secret \
  -e JWT_REFRESH_SECRET=your-refresh-secret \
  codefolio-api
```

## 📊 API GraphQL

### Accès

- **Endpoint:** `http://localhost:4000/graphql`
- **Playground:** Ouvrez l'URL dans votre navigateur

### Authentification

#### 1. Login

```graphql
mutation {
  login(username: "admin", password: "admin123") {
    accessToken
    refreshToken
  }
}
```

#### 2. Utiliser le token

Ajoutez le header HTTP:

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Exemples de requêtes

#### Query publique

```graphql
query {
  getProjets(userId: "USER_ID") {
    id
    title
    description
    technologies
  }
}
```

#### Mutation protégée

```graphql
mutation {
  createProjet(input: {
    title: "Mon Projet"
    description: "Description du projet"
    technologies: ["React", "TypeScript"]
    featured: true
  }) {
    id
    title
  }
}
```

## 📁 Structure du Projet

```
CodeFolio/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
├── __tests__/              # Tests unitaires
│   ├── auth.test.ts
│   ├── queries.test.ts
│   └── mutations.test.ts
├── src/
│   ├── config/
│   │   └── database.ts      # Configuration MongoDB
│   ├── models/              # Schémas Mongoose
│   │   ├── User.model.ts
│   │   ├── Profile.model.ts
│   │   ├── Project.model.ts
│   │   ├── Skill.model.ts
│   │   └── Experience.model.ts
│   ├── graphql/
│   │   ├── typeDefs.ts      # Schéma GraphQL
│   │   └── resolvers.ts     # Résolveurs GraphQL
│   ├── utils/
│   │   ├── auth.ts          # Middleware JWT
│   │   ├── logger.ts        # Winston logger
│   │   └── morganStream.ts  # Morgan integration
│   ├── scripts/
│   │   └── seedAdmin.ts     # Création admin
│   └── index.ts             # Point d'entrée
├── logs/                   # Fichiers de logs
├── coverage/               # Rapports de tests
├── .env                    # Variables d'environnement (non versionné)
├── .env.example            # Template .env
├── .gitignore
├── .dockerignore
├── Dockerfile              # Image Docker
├── docker-compose.yml      # Orchestration Docker
├── jest.config.js          # Configuration Jest
├── tsconfig.json           # Configuration TypeScript
├── package.json
└── README.md
```

## 📝 Scripts NPM

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrage en mode développement avec hot-reload |
| `npm run build` | Compilation TypeScript vers JavaScript |
| `npm start` | Démarrage en mode production |
| `npm test` | Exécution des tests |
| `npm run test:watch` | Tests en mode watch |
| `npm run test:coverage` | Tests avec couverture de code |
| `npm run seed:admin` | Création de l'utilisateur admin |

## 🔒 Sécurité

### Bonnes pratiques

1. **Changez les secrets JWT** en production
2. **N'exposez jamais** le fichier `.env`
3. **Utilisez HTTPS** en production
4. **Limitez les tentatives** de connexion
5. **Validez toutes les entrées** utilisateur
6. **Mettez à jour** régulièrement les dépendances

### Tokens JWT

- **Access Token:** Expire après 15 minutes
- **Refresh Token:** Expire après 7 jours

## 🐛 Dépannage

### Port déjà utilisé

```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### MongoDB ne se connecte pas

- Vérifiez que MongoDB est démarré
- Vérifiez l'URI dans `.env`
- Vérifiez les logs: `docker-compose logs mongo`

### Tests échouent

- Vérifiez que `JWT_SECRET` et `JWT_REFRESH_SECRET` sont définis
- Nettoyez le cache: `npm run test -- --clearCache`

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/mohamedm999/CodeFolio/issues)
- **Email:** votre-email@example.com

## 📝 Licence

ISC

## ✍️ Auteur

**Mohamed** - [GitHub](https://github.com/mohamedm999)

---

⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub!
