# 👋 Welcome to the Yoga Studio App!

**Bienvenue dans votre projet d'apprentissage OpenClassrooms p4-dfsjs.**

---

## 🚀 Pour commencer (5 minutes)

### 1️⃣ Installation rapide

```bash
# Backend
cd backend
npm install

# Frontend (nouveau terminal)
cd frontend
npm install

# Base de données
cd ..
docker-compose up -d

# Setup database
cd backend
npx prisma migrate dev --name init
npm run prisma:seed
```

### 2️⃣ Lancer l'application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 3️⃣ Tester

Ouvrir http://localhost:3000

**Se connecter avec:**
- Email: `yoga@studio.com`
- Password: `test!1234`

---

## 📚 Documentation

Lisez dans cet ordre:

1. **QUICK_START.md** - Guide de démarrage détaillé (5 min)
2. **README.md** - Documentation complète (15 min)
3. **PROJECT_STRUCTURE.md** - Architecture du projet (10 min)
4. **ANTI-PATTERNS.md** - Liste des problèmes à corriger (20 min)
5. **TESTING_GUIDE.md** - Guide des tests (30 min)

---

## 🎯 Vos objectifs

### Exercice 1: Amélioration du code (40-50h)
Identifier et corriger **27 anti-patterns intentionnels** :
- Backend: 15 problèmes (service layer, erreurs, validation)
- Frontend: 12 problèmes (hooks, types, patterns)

### Exercice 2: Tests (30-40h)
Écrire des tests complets pour atteindre **80% de couverture** :
- Backend: Tests unitaires + intégration
- Frontend: Tests unitaires + E2E

---

## ✅ Quick Check

L'application fonctionne si vous pouvez :
- ✅ Vous connecter
- ✅ Voir la liste des sessions
- ✅ Créer une session (admin)
- ✅ S'inscrire à une session (utilisateur)
- ✅ Voir votre profil

---

## 🆘 Besoin d'aide ?

- **Setup ne fonctionne pas ?** → Lire **QUICK_START.md**
- **Comprendre l'architecture ?** → Lire **PROJECT_STRUCTURE.md**
- **Trouver les problèmes ?** → Lire **ANTI-PATTERNS.md**
- **Écrire les tests ?** → Lire **TESTING_GUIDE.md**
- **Questions techniques ?** → Lire **DEPENDENCIES.md**

---

## 🔑 Informations importantes

### Comptes de test
```
Admin: yoga@studio.com / test!1234
User:  user@test.com / test!1234
```

### Ports
```
Frontend: http://localhost:3000
Backend:  http://localhost:8080
Database: localhost:5432
```

### Commandes utiles
```bash
# Voir la base de données
cd backend && npx prisma studio

# Redémarrer la base de données
docker-compose restart postgres

# Reset database
cd backend && npx prisma migrate reset
```

---

## 📊 Statistiques du projet

- **48 fichiers** créés
- **~3,000 lignes** de code
- **12 endpoints** API
- **6 pages** React
- **4 controllers** backend
- **27 anti-patterns** à corriger

---

## 🎓 Conseils pour réussir

1. **Faites fonctionner l'app d'abord** - Testez toutes les fonctionnalités
2. **Comprenez le code existant** - Lisez chaque fichier
3. **Identifiez les problèmes** - Utilisez ANTI-PATTERNS.md comme guide
4. **Planifiez vos améliorations** - Ne codez pas au hasard
5. **Écrivez les tests AVANT** de refactoriser
6. **Refactorisez progressivement** - Un problème à la fois
7. **Vérifiez que tout fonctionne** après chaque changement

---

## ⏱️ Timeline suggéré

| Semaine | Tâches | Heures |
|---------|--------|--------|
| 1-2 | Comprendre le code, identifier les problèmes | 10-15h |
| 3-4 | Refactoring backend + tests | 20-25h |
| 5-6 | Refactoring frontend + tests | 20-25h |
| 7 | Finalisation, couverture, documentation | 10-15h |

**Total: 60-80 heures**

---

## 🏆 Critères de réussite

Vous avez réussi quand:
- ✅ Les 27 anti-patterns sont corrigés
- ✅ La couverture de tests dépasse 80%
- ✅ Tous les tests passent
- ✅ L'application fonctionne toujours
- ✅ Le code est propre et documenté
- ✅ Pas d'utilisation de `any` en TypeScript

---

## 🚀 Prêt ? C'est parti !

1. Suivez **QUICK_START.md** pour l'installation
2. Testez que tout fonctionne
3. Commencez à explorer le code
4. Bonne chance ! 💪

---

**Questions ?** Consultez d'abord la documentation complète dans les fichiers .md

**Problèmes techniques ?** Vérifiez **VERIFICATION.md** pour diagnostiquer

**Bon courage ! 🎉**
