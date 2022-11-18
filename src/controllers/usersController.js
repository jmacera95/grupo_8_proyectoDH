const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");


const usersJSONPath = path.join(__dirname, '../database/users.json');
const getUsers = () => {
    const usersJson = fs.readFileSync(usersJSONPath);
    return JSON.parse(usersJson);
};


const usersController = {
    register: (req, res) => {
        res.render('register');
    } ,
    postRegister: (req, res) => {
        const users = getUsers();
        const userExist = users.find(user => (user.email === req.body.email));
        if(userExist){
            return res.render('register', {errors: {
                email: {
                    msg: 'El email ya existe'
                } 
            },
            old: req.body
        });
        }
        const password = bcrypt.hashSync(req.body.password, 10)

        const newUser = {
           id: users.length + 1,
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           phone: req.body.phone,
           CUIT: Number(req.body.cuit),
           cp: req.body.cp,
           password: password,
           image: req.file.filename,
           userType: "basic"
        }
        users.push(newUser)
        const usersJson = JSON.stringify(users, null, 3);
        fs.writeFileSync(usersJSONPath, usersJson);
        res.redirect('/');
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
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_me) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24 * 15 }); // the cookie will exist for fifteen days
                }

                return res.render('userProfile', {user: userToLogin});
            } else {
                return res.render('login', {
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
    edit: (req, res) => {
        db.Users.findByPK(req.params.id, {
            include: [
                {
                  model: db.Users,
                  as: 'users'  
                }
            ]
        })
        .then(
            user => {
                return res.render('userEdit', {usuario: user});
            }
        )
    },
    profile: (req, res) => {
        res.render('userProfile', {user: req.session.userLogged});
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = usersController;