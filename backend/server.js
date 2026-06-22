const express = require('express');
const cors = require('cors');

const productsRoutes = require('./routes/products.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'GiftShop API is running',
    });
});

app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
