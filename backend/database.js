const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/giftshop.sqlite', (err) => {
    if (err) {
        console.error('Database error:', err.message);
    } else {
        console.log('SQLite connected');
    }
});

module.exports = db;
