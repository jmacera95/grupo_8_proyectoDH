const fs = require('fs');
const path = require('path');

const usersJSONPath = path.join(__dirname, '../database/users.json');
const getUsers = () => {
    const usersJson = fs.readFileSync(usersJSONPath);
    return JSON.parse(usersJson);
};

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    const userFromCookie = getUsers().find(user => user.email == emailInCookie);

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