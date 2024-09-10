const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.viewProfile);
router.put('/profile', userController.updateProfile);
router.delete('/account', userController.deleteAccount);

module.exports = router;