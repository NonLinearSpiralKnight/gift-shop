const db = require('../database');

// Получить все товары
function getAllProducts(req, res) {
    const query = `
        SELECT products.id,
               products.name,
               products.description,
               products.price,
               products.image,
               categories.name AS category
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
}

// Получить товар по ID
function getProductById(req, res) {
    const id = req.params.id;

    const query = `
        SELECT products.id,
               products.name,
               products.description,
               products.price,
               products.image,
               categories.name AS category
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
        WHERE products.id = ?
    `;

    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(row);
    });
}

module.exports = {
    getAllProducts,
    getProductById
};
