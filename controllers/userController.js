const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();


const register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hachage du mot de passe

    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashedPassword,
            }
        });
        res.json({ message: 'Utilisateur enregistré avec succès', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id }, 'votre_secret', { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const viewProfile = async (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hachage du mot de passe

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashedPassword,
            }
        });
        res.json({ message: 'Profil mis à jour avec succès', updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAccount = async (req, res) => {
    const userId = req.user.id; // ID utilisateur depuis le token JWT

    try {
        await prisma.user.delete({
            where: { id: userId }
        });
        res.json({ message: 'Compte supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { register, login, viewProfile, updateProfile, deleteAccount };