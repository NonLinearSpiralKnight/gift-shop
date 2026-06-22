const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database(
    './backend/db/giftshop.sqlite',
    (error) => {

        if (error) {

            console.log(error.message);

        } else {

            console.log('Database connected');

        }

    }
);

module.exports = database;
