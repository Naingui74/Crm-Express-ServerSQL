const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/create', companyController.createCompany);
router.get('/:id', companyController.viewCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.get('/:id/users', companyController.viewCompanyUsers);

module.exports = router;