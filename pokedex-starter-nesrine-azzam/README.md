📚 Projet Pokédex Pokémon - Nesrine Azzam
Bienvenue dans mon projet Pokédex développé avec React, Node.js, Express et MongoDB.

Ce projet a été réalisé dans le cadre du cours de Développement Full Stack.
Il permet de gérer une liste de Pokémon via une API et de les afficher côté Frontend.

✨ Fonctionnalités principales
Afficher tous les Pokémon de la base de données.

Rechercher un Pokémon par son nom.

Filtrer les Pokémon par type.

Trier par points de vie (HP) pour voir les Pokémon les plus forts.

Ajouter / Retirer des Pokémon en favoris ⭐ :

Possibilité d'ajouter un Pokémon en favori.

Une page /favorites dédiée pour voir uniquement ses favoris.

Retirer un favori directement depuis cette page.

🛠️ Technologies utilisées
Frontend : React, React Router, Axios

Backend : Node.js, Express.js

Base de données : MongoDB + Mongoose

Stockage local : LocalStorage (pour les favoris)

Authentification : JWT

🚀 Comment lancer le projet
1. Backend (API Pokémon)
bash
Copier
cd pokedex-api-nesrine-azzam
npm install
npm run dev
Le serveur tourne sur http://localhost:3000.

2. Frontend (Site Pokémon)
bash
Copier
cd pokedex-nesrine-azzam
npm install
npm run dev
L'application est accessible sur http://localhost:5173 (ou autre port selon Vite).

📖 Documentation rapide de l'API

Méthode	URL	Description
GET	/api/pokemons	Récupérer tous les Pokémon
GET	/api/pokemons/:id	Récupérer un Pokémon par ID
POST	/api/pokemons	Créer un nouveau Pokémon
PUT	/api/pokemons/:id	Modifier un Pokémon existant
DELETE	/api/pokemons/:id	Supprimer un Pokémon
⚡ Toutes les routes POST/PUT/DELETE sont protégées par authentification.

🎥 Démo Vidéo
Lien vers la vidéo YouTube ➔ (à compléter ici)

👩‍💻 Projet réalisé par
Nesrine Azzam – 2025

