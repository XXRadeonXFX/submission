const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 3003;

// Configuration - can be moved to environment variables
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3000';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://product-service:3001';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://order-service:3002';

app.get('/health', (req, res) => {
    res.json({ status: 'Gateway Service is healthy' });
});

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/users`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/orders`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.listen(port, () => {
    console.log(`Gateway service running on port ${port}`);
    console.log(`Configured services:
  - User service: ${USER_SERVICE_URL}
  - Product service: ${PRODUCT_SERVICE_URL}
  - Order service: ${ORDER_SERVICE_URL}`);
});