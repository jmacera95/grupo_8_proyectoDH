const mainAPIController = {
    getSession: (req, res) => {
        res.send(
            req.session
        )
    }
}

module.exports = mainAPIController;