const path = require('path');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.listen(3030, () => {
    console.log('Server has started in http://localhost:3030/');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productList.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productCart.html'))
});

app.get('/product-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productDetail.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});