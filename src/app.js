const path = require('path');
const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', mainRoutes)
app.use('/products', productsRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

app.listen(3030, () => {
    console.log('Server has started in http://localhost:3030/');
});