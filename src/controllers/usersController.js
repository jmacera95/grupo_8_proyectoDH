const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const getUsers = () => {
    const usersJson = fs.readFileSync(path.join(__dirname, '../database/users.json'));
    return JSON.parse(usersJson);
};

const usersController = {
    register: (req, res) => {
        res.render('register');
    } ,
    login:(req, res) => {
        res.render('login');
    } ,
    processLogin: (req, res) => {
        const existingUsers = getUsers();
        const userToLogin = existingUsers.find(user => user.email == req.body.email);
        if (userToLogin) {
            const passwordIsOk = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (passwordIsOk) {
                return res.render('login');
            } else {
                res.render('login', {
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta'
                        }
                    },
                    old: req.body
                })
            }
        } 
        
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No existe un usuario registrado con este email.'
                }
            },
            old: req.body
        })
    },
    profile: (req, res) => {
        res.render('userProfile');
    }
}

module.exports = usersController;