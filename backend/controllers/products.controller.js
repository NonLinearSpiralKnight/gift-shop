const products = [
    {
        id: 1,
        name: 'Подарочный набор',
        description: 'Универсальный подарок для друзей и коллег',
        price: 1500,
        image: 'gift1.jpg',
    },
    {
        id: 2,
        name: 'Сладкий бокс',
        description: 'Набор шоколада и конфет в праздничной упаковке',
        price: 1200,
        image: 'gift2.jpg',
    },
    {
        id: 3,
        name: 'Букет цветов',
        description: 'Свежий букет для особого случая',
        price: 2000,
        image: 'gift3.jpg',
    },
];

function getAllProducts(req, res) {
    res.json(products);
}

function getProductById(req, res) {
    const productId = Number(req.params.id);
    const product = products.find((item) => item.id === productId);

    if (!product) {
        return res.status(404).json({
            message: 'Товар не найден',
        });
    }

    return res.json(product);
}

module.exports = {
    getAllProducts,
    getProductById,
};
