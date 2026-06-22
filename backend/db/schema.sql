DROP TABLE IF EXISTS products;

CREATE TABLE products (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    description TEXT NOT NULL,

    price REAL NOT NULL,

    image TEXT NOT NULL

);