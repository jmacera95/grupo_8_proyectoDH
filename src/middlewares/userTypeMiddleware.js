function userTypeMiddleware(req, res, next) {
    const userLogged = req.session.userLogged;
    if (userLogged) {
        if (userLogged.user_type.user_type !== "admin") {
            res.status(403);
            return res.send("Unauthorized");
        }
    } else {
        res.status(403);
        return res.send("Unauthorized");
    }
    next();
}

module.exports = userTypeMiddleware;