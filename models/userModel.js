const db = require('../config/db');

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phoneNumber VARCHAR(15),
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            profilePicture VARCHAR(255)
        )
    `;
    db.query(query, (err) => {
        if (err) throw err;
    });
};

module.exports = { createTable };
