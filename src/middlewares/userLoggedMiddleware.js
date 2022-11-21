const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail != undefined ? req.cookies.userEmail : null;
    const userFromCookie = await db.Users.findAll({include: "user_type", where: {email: emailInCookie}}).then(user => user[0]); 

    if (userFromCookie) {
        delete userFromCookie.password;
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;