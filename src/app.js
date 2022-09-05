const path = require('path');
const productsRoutes = require('./routes/products');
// const userRoutes = require('./routes/users');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3030, () => {
    console.log('Server has started in http://localhost:3030/');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/products', productsRoutes);
// app.use('/user', userRoutes);

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productCart.html'))
});

