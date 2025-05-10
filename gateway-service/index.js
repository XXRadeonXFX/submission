const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3003;

// Middleware
app.use(express.json());

// User service endpoints
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3000/users');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://user-service:3000/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'User not found' });
        } else {
            console.error('Error fetching user:', error.message);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
});

// Product service endpoints
app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('http://product-service:3001/products');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://product-service:3001/products/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            console.error('Error fetching product:', error.message);
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'UP', service: 'API Gateway' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Gateway service running on port ${PORT}`);
});