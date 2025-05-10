const express = require('express');
const app = express();
const PORT = 3001;

// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 999.99, inStock: true },
    { id: 2, name: 'Smartphone', price: 699.99, inStock: true },
    { id: 3, name: 'Headphones', price: 149.99, inStock: false }
];

// Middleware
app.use(express.json());

// Routes
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});