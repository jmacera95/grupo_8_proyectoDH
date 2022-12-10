const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
// api routers
const productsAPIRoutes = require('./routes/api/products');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({secret: "Esto es un secreto!", resave: false, saveUninitialized: true}));
app.use(cookieParser());
app.use(userLoggedMiddleware);
// app.use((req, res, next) => {
//     res.status(404).render('not-found');
// });

app.use('/', mainRoutes)
app.use('/products', productsRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

// api routes
app.use('/api/products', productsAPIRoutes);

app.listen(3030, () => {
    console.log('Server has started in http://localhost:3030/');
});