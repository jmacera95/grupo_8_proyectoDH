const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const { send } = require('process');


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
        db.Users.findAll()
        .then(users => {
            const userExist = users.find(user => (user.email === req.body.email))
            console.log(userExist)
            /*console.log(Array.from(users));*/
            /*return res.send(Array.from(users))*/
            if(userExist){
            return res.render('register', {errors: {
                email: {
                    msg: 'El email ya existe'
                } 
            },
            old: req.body /* revisar porque no aparece la info que ya se escribio anteriormente */
        });
        } else {
            const password = bcrypt.hashSync(req.body.password, 10)
            db.Users.create({
                id: users.length + 1,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                phone_number: req.body.phone,
                legal_identifier: Number(req.body.cuit),
                postal_code: req.body.cp,
                password: password,
                image: req.file.filename,
                user_type_id: 2    
            })
            .then(response => {
                res.redirect('/')
            })    
        }
        })        
        
    },
    login:(req, res) => {
        res.render('login');
    },

    processLogin: (req, res) => {
        db.Users.findAll()
        .then(users => {
            const userToLogin = users.find(user => (user.email == req.body.email));
            console.log(userToLogin);
    
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
        })
        
    },

    edit: (req, res) => {
        db.Users.findByPk (req.params.id)
            .then(
            userEdit => {
                return res.render('userEdit', {usuario: userEdit})
            }
        )
    },

    actualizar: (req,res) => {
        db.Users.update(
            {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                phone_number: req.body.phone,
                legal_identifier: Number(req.body.cuit),
                postal_code: req.body.cp,    
            },
            {
                where: {id: req.params.id}
            }
        )
            .then(response => {
                res.redirect(`/user/edit/${req.params.id}`);
            })
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