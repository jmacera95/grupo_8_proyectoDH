const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const { send } = require('process');
const { validationResult } = require('express-validator');

const usersController = {
    register: (req, res) => {
        res.render('register');
    },
    postRegister: (req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register',{errors: errors.mapped()})
        
        } else {    
        db.Users.findAll()
            .then(users => {
                const userExist = users.find(user => (user.email === req.body.email))
                if (userExist) {
                    return res.render('register', {
                        errors: {
                            email: {
                                msg: 'El email ya existe'
                            }
                        },
                        old: req.body /* revisar porque no aparece la info que ya se escribio anteriormente */
                    });
                } else {
                    const password = bcrypt.hashSync(req.body.password, 10)
                    db.Users.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        phone_number: req.body.phone,
                        legal_identifier: req.body.cuit,
                        postal_code: req.body.cp,
                        password: password,
                        image_path: req.file.filename,
                        user_type_id: 2
                    })
                        .then(response => {
                            return res.redirect('/user/login')
                        })
                }
            }) 
    }},
    
        
    login: (req, res) => {
        res.render('login');
    },

    processLogin: (req, res) => {
        db.Users.findAll(
            {
                include: "user_type"
            }
        )
        .then(users => {
            const userToLogin = users.find(user => (user.email == req.body.email));
    
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
            db.Users.findByPk(req.params.id)
                .then(
                    userEdit => {
                        return res.render('userEdit', { usuario: userEdit })
                    }
                )
    },

    actualizar: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            db.Users.findByPk(req.params.id)
            .then(user => {return res.render('userEdit',{errors: errors.mapped(), old: req.body, usuario: user})})
        } else {
            db.Users.update(
                {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    phone_number: req.body.phone,
                    legal_identifier: req.body.cuit,
                    postal_code: req.body.cp
                },
                {
                    where: { id: req.params.id }
                }
            )
                .then(response => {
                    db.Users.findByPk(
                        req.params.id,
                        {
                            include: "user_type"
                        }
                    )
                    .then(user => {
                        req.session.userLogged = user;
                        return res.redirect(`/user/profile`);
                    })                
                })
        }
    },

    delete: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(
                user => {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/usersImage', user.image_path));
                    db.Users.destroy(
                        {
                            where: { id: req.params.id }
                        }
                    )
                        .then(response => {
                            res.clearCookie('userEmail');
                            req.session.destroy();
                            return res.redirect('/')
                        })
                }
            )
    },

    profile: (req, res) => {
        res.render('userProfile', { user: req.session.userLogged });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = usersController;