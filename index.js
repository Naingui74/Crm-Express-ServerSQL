const express = require('express');
const bodyParser = require('body-parser');
const { createTable: createUserTable } = require('./models/userModel');
const { createTable: createCompanyTable } = require('./models/companyModel');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

createUserTable();
createCompanyTable();

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
