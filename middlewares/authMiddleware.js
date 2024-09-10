/*
** EPITECH PROJECT, 2024
** crm-express
** File description:
** authMiddleware.js
*/

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Token manquant');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token invalide');
        req.user = decoded;
        next();
    });
};

module.exports = { authenticate };
