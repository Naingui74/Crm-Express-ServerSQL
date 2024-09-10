const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription de l'utilisateur
const register = (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hachage du mot de passe

    const query = 'INSERT INTO users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [firstName, lastName, email, phoneNumber, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Utilisateur enregistré avec succès' });
    });
};

// Connexion de l'utilisateur
const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id }, 'votre_secret', { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    });
};

// Afficher les informations du profil utilisateur
const viewProfile = (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(results[0]);
    });
};

// Mettre à jour le profil utilisateur
const updateProfile = (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, password = ? WHERE id = ?';
    const hashedPassword = bcrypt.hashSync(password, 10); // Hachage du mot de passe

    db.query(query, [firstName, lastName, email, phoneNumber, hashedPassword, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Profil mis à jour avec succès' });
    });
};

// Supprimer le compte utilisateur
const deleteAccount = (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT
    const query = 'DELETE FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Compte supprimé avec succès' });
    });
};

module.exports = { register, login, viewProfile, updateProfile, deleteAccount };