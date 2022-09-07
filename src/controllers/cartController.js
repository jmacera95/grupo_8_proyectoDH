const path = require('path');

const cartController = {
    cart : (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productCart.html'))
    }
}

module.exports = cartController;