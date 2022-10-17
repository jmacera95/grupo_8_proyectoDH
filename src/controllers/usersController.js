const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const userPath = path.join(__dirname, '../database/users.json');
const readUser = fs.readFileSync(userPath, 'utf-8');
const users = JSON.parse(readUser);

const usersController = {
    register: (req, res) => {
        res.render('register');
    } ,
    postRegister: (req, res) => {

        const password = bcrypt.hashSync(req.body.password, 10)

        const newUser = {
           id: users.length + 1,
           fullName: req.body.fullName,
           email: req.body.email,
           phone: req.body.phone,
           CUIT: req.body.cuit,
           password: password,
           image: req.file.filename,
           userType: "basic"
        }
        users.push(newUser)
        const usersJson = JSON.stringify(users, null, 3);
        fs.writeFileSync(userPath, usersJson);
        res.redirect('/');
    } ,
    login:(req, res) => {
        res.render('login');
    } ,
}

module.exports = usersController;