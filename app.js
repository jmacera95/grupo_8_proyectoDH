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