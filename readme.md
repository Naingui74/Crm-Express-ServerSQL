# CRM Boounce

## Présentation

Bienvenue dans le système de gestion de la relation client (CRM) développé pour l'entreprise Boounce. Ce CRM a été conçu pour gérer efficacement les utilisateurs et les entreprises, avec des fonctionnalités robustes pour l'administration et la gestion des données.

## Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Routes API](#routes-api)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

## Fonctionnalités

- **Gestion des Utilisateurs**
  - Enregistrement et connexion des utilisateurs
  - Affichage, mise à jour et suppression du profil utilisateur
  
- **Gestion des Entreprises**
  - Création, mise à jour et suppression d'entreprises
  - Affichage des détails d'une entreprise
  - Gestion des utilisateurs associés à une entreprise
  
- **Sécurité**
  - Authentification JWT pour sécuriser les routes
  - Contrôle d'accès basé sur les rôles pour les opérations sensibles

## Technologies

- **Node.js**: Environnement d'exécution pour JavaScript
- **Express.js**: Framework pour la création des API
- **MySQL**: Base de données relationnelle
- **Docker**: Conteneurisation de la base de données
- **bcryptjs**: Hachage des mots de passe
- **jsonwebtoken**: Gestion des tokens JWT

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/Naingui74/crm-boounce.git
   cd crm-boounce

## Installer les dépendances

2. **Cloner le dépôt**

npm install

## Configurer l'environnement

3. **Copiez le fichier .env.example en .env et ajustez les variables d'environnement selon vos besoins.**

cp .env.example .env

## Démarrer les services

4. **Assurez-vous que Docker est installé et démarrez les services avec Docker Compose.**

docker-compose up -d

## Démarrer l'application

5. **Démarrer le Serveur** 

npm start

## Configuration

6. **Le fichier .env doit contenir les informations suivantes :**

DB_HOST=**db**
DB_USER=**user**
DB_PASSWORD=***userpassword**
DB_NAME=**my_database**
JWT_SECRET=**your_jwt_secret**

## Routes API

Utilisateurs

    POST /api/users/register: Enregistre un nouvel utilisateur
    POST /api/users/login: Connecte un utilisateur et retourne un token JWT
    GET /api/users/profile: Affiche les informations du profil utilisateur (authentification requise)
    PUT /api/users/profile: Met à jour les informations du profil utilisateur (authentification requise)
    DELETE /api/users/profile: Supprime le compte utilisateur (authentification requise)

## Entreprises 

POST /api/companies/create: Crée une nouvelle entreprise (authentification requise)
GET /api/companies/
: Affiche les informations d'une entreprise
PUT /api/companies/
: Met à jour les informations d'une entreprise (admin requis)
DELETE /api/companies/
: Supprime une entreprise (admin requis)
GET /api/companies/
/users: Affiche tous les utilisateurs d'une entreprise (admin requis)

## Contributeurs

**Naingui74: Développeur principal**

## Licence

***Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus d'informations.***