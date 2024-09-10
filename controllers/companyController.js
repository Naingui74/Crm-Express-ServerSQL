const db = require('../config/db');

// Créer une entreprise
const createCompany = (req, res) => {
    const { logo, name, creationDate, vatNumber, siretNumber, adminId } = req.body;

    const query = 'INSERT INTO companies (logo, name, creationDate, vatNumber, siretNumber, adminId) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [logo, name, creationDate, vatNumber, siretNumber, adminId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Entreprise créée avec succès', companyId: results.insertId });
    });
};

// Afficher les informations de l'entreprise
const viewCompany = (req, res) => {
    const companyId = req.params.id;
    const query = 'SELECT * FROM companies WHERE id = ?';

    db.query(query, [companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Entreprise non trouvée' });
        res.json(results[0]);
    });
};

// Mettre à jour les informations de l'entreprise
const updateCompany = (req, res) => {
    const companyId = req.params.id;
    const { logo, name, creationDate, vatNumber, siretNumber, adminId } = req.body;

    const query = 'UPDATE companies SET logo = ?, name = ?, creationDate = ?, vatNumber = ?, siretNumber = ?, adminId = ? WHERE id = ?';

    db.query(query, [logo, name, creationDate, vatNumber, siretNumber, adminId, companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Entreprise mise à jour avec succès' });
    });
};

// Supprimer l'entreprise
const deleteCompany = (req, res) => {
    const companyId = req.params.id;
    const query = 'DELETE FROM companies WHERE id = ?';

    db.query(query, [companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Entreprise supprimée avec succès' });
    });
};

// Afficher tous les utilisateurs d'une entreprise
const viewCompanyUsers = (req, res) => {
    const companyId = req.params.id;
    const query = 'SELECT * FROM users WHERE companyId = ?';

    db.query(query, [companyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { createCompany, viewCompany, updateCompany, deleteCompany, viewCompanyUsers };