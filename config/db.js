const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db', // Nom du service Docker
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpassword',
    database: process.env.DB_NAME || 'my_database'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1);
    } else {
        console.log('Connecté à la base de données MySQL.');
    }
});

module.exports = db;
