const db = require("../../database/models");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersAPIController = {
  getUsers: async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const resultsPerPage = page !== 0 ? 10 : null;
    const users = await db.Users.findAll({
      attributes: ["id", "first_name", "last_name", "email"],
      limit: resultsPerPage,
      offset: resultsPerPage * (page - 1),
    });
    users.map((user) => (user.dataValues.detail = `/api/users/${user.id}`));
    const response = {
      count: users.length,
      users: users,
    };
    if (page > 1) {
      response.previous = `/api/users/?page=${page - 1}`;
    }
    if (users.length == 10) {
      response.next = `/api/users/?page=${page + 1}`;
    }
    return res.json(response);
  },
  getUser: async (req, res) => {
    const user = await db.Users.findByPk(req.params.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "legal_identifier",
        "phone_number",
        "email",
        "postal_code",
      ],
    });
    user.dataValues.image_url = `/api/users/${user.id}/image`;
    return res.json(user);
  },
  getUserImage: async (req, res) => {
    const userImagePath = await db.Users.findByPk(req.params.id, {
      attributes: ["image_path"],
    });
    res.set({ "Content-Type": "image/png" });
    return res.sendFile(
      path.resolve(
        __dirname,
        `../../../public/images/usersImage/${userImagePath.image_path}`
      )
    );
  },
  processLogin: (req, res) => {
    db.Users.findAll({
      include: "user_type",
    }).then((users) => {
      const userToLogin = users.find((user) => user.email == req.body.email);
      if (userToLogin) {
        const passwordIsOk = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (passwordIsOk) {
          delete userToLogin.dataValues.password;
          req.session.userLogged = userToLogin;
          return res.json({ isLogged: true, user: req.session.userLogged });
        } else {
          return res.json({ isLogged: false });
        }
      } else {
        return res.json({ isLogged: false });
      }
    });
  },
};

module.exports = usersAPIController;
