const db = require('../config/db');

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS companies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            logo VARCHAR(255),
            name VARCHAR(255) NOT NULL,
            creationDate DATE,
            vatNumber VARCHAR(50),
            siretNumber VARCHAR(50),
            adminId INT,
            FOREIGN KEY (adminId) REFERENCES users(id)
        )
    `;
    db.query(query, (err) => {
        if (err) throw err;
    });
};

module.exports = { createTable };
