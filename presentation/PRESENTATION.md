# 🚀 CodeFolio
## Portfolio API GraphQL

### *API moderne & sécurisée pour développeurs*

---

## 🎯 Présentation du Projet

### API GraphQL de nouvelle génération

<div class="tech-item">

✅ **Authentification JWT** sécurisée  
✅ **Architecture TypeScript/Node.js**  
✅ **Base de données MongoDB**  
✅ **Tests automatisés** avec Jest  
✅ **Docker ready** pour déploiement

</div>

---

## ✨ Fonctionnalités Clés

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; text-align: left;">

<div>

### 🔐 Sécurité
- JWT Auth complet
- Access + Refresh tokens
- Blacklist serveur
- Hachage bcrypt

</div>

<div>

### 🛠️ Développement
- API GraphQL complète
- Logging Winston/Morgan
- Tests Jest + Coverage
- CI/CD GitHub Actions

</div>

</div>

---

## 🛠️ Stack Technique

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 0.8em;">

<div style="background: rgba(76,175,80,0.2); padding: 20px; border-radius: 10px;">

### 💻 Backend
- **Node.js** 20.x
- **TypeScript** 5.9
- **Express** 5.1
- **Apollo Server** 5.0

</div>

<div style="background: rgba(33,150,243,0.2); padding: 20px; border-radius: 10px;">

### 💾 Database
- **MongoDB** 6.x
- **Mongoose** 8.19
- ODM complet
- Schémas typés

</div>

<div style="background: rgba(255,152,0,0.2); padding: 20px; border-radius: 10px;">

### 🐳 DevOps
- **Docker** ready
- **GitHub Actions**
- **Jest** testing
- **Winston** logs

</div>

</div>

---

## 🏗️ Architecture

```
src/
├── models/          # Schémas MongoDB
├── graphql/         # Types & Resolvers
├── utils/           # Auth & Logging
└── config/          # Configuration DB
```

---

## 🔐 Authentification

<div style="display: flex; justify-content: space-around; align-items: center;">

<div style="text-align: center; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; min-width: 250px;">

### ⏱️ Access Token
**15 minutes**

<small>Accès rapide & sécurisé</small>

</div>

<div style="font-size: 3em; color: #4CAF50;">🔄</div>

<div style="text-align: center; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; min-width: 250px;">

### 🔑 Refresh Token
**7 jours**

<small>Session prolongée</small>

</div>

</div>

---

### 🛡️ Sécurité Renforcée
✓ Hachage bcrypt | ✓ Middleware protection | ✓ Blacklist serveur

---

## 📊 API GraphQL

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; text-align: left; font-size: 0.75em;">

<div>

### 📖 Queries
```graphql
getProjets(userId: ID!): [Project]
getProfile(userId: ID!): Profile
getSkills(userId: ID!): [Skill]
getExperiences(userId: ID!): [Experience]
```

</div>

<div>

### ✏️ Mutations
```graphql
createProjet(input: ProjectInput!): Project
updateProfile(input: ProfileInput!): Profile
login(username: String!): AuthPayload
refreshToken(token: String!): AuthPayload
```

</div>

</div>

---

## 🧪 Tests & Qualité

<div style="text-align: center;">

### 📈 Couverture de Code

<div style="display: flex; justify-content: space-around; margin: 30px 0;">

<div style="background: rgba(76,175,80,0.3); padding: 20px; border-radius: 10px; min-width: 150px;">
**Jest**  
✓ Tests unitaires
</div>

<div style="background: rgba(33,150,243,0.3); padding: 20px; border-radius: 10px; min-width: 150px;">
**Supertest**  
✓ Tests HTTP
</div>

<div style="background: rgba(255,152,0,0.3); padding: 20px; border-radius: 10px; min-width: 150px;">
**CI/CD**  
✓ GitHub Actions
</div>

</div>

</div>

---

## 🐳 Déploiement

### Docker Compose
```yaml
services:
  api:
    build: .
    ports: ["4001:4000"]
  mongo:
    image: mongo:latest
    ports: ["27018:27017"]
```

### Commandes
```bash
docker-compose up -d
npm run seed:admin
```

---

## 📈 Monitoring

### Logging
- **Winston** pour logs structurés
- **Morgan** pour logs HTTP
- Niveaux: error, warn, info, debug

### Fichiers
- `logs/error.log`
- `logs/combined.log`

---

## 🚀 Démo Live

<div style="background: rgba(0,0,0,0.5); padding: 40px; border-radius: 15px; border: 2px solid #4CAF50;">

### 🌐 Endpoint GraphQL

<div style="font-size: 1.2em; color: #4CAF50; margin: 20px 0;">

`http://localhost:4000/graphql`

</div>

---

### 👤 Utilisateur Test

<div style="display: flex; justify-content: center; gap: 50px; margin-top: 20px;">

**Username:** `admin`  
**Password:** `admin123`

</div>

</div>

---

## 🔮 Évolutions Futures

- Rate limiting
- Cache Redis
- Upload fichiers
- Notifications temps réel
- API REST complémentaire

---

## 🎉 Merci !

<div style="text-align: center; padding: 50px;">

### Questions & Réponses

<div style="font-size: 3em; margin: 30px 0;">💬</div>

---

### 📫 Contact

<div style="display: flex; justify-content: center; gap: 40px; margin-top: 30px; font-size: 1.2em;">

<a href="https://github.com/mohamedm999/CodeFolio" style="color: #4CAF50; text-decoration: none;">
<i class="fab fa-github"></i> GitHub
</a>

</div>

<div style="margin-top: 50px; font-size: 0.8em; color: #888;">
CodeFolio © 2024 - Made with ❤️
</div>

</div>