const db = require("../../database/models");
const path = require("path");

const usersAPIController = {
  getUsers: async (req, res) => {
    const users = await db.Users.findAll({
      attributes: ["id", "first_name", "last_name", "email"],
    });
    users.map((user) => (user.dataValues.detail = `/api/users/${user.id}`));
    return res.json({
      count: users.length,
      users: users,
    });
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
        "postal_code"
      ],
    });
    user.dataValues.image_url = `api/users/${user.id}/image`
    return res.json(user);
  },
  getUserImage: async (req, res) => {
    const userImagePath = await db.Users.findByPk(req.params.id, {
        attributes: [
          "image_path"
        ],
      });
    res.set({ "Content-Type": "image/png" });
    return res.sendFile(
      path.resolve(
        __dirname,
        `../../../public/images/usersImage/${userImagePath.image_path}`
      )
    );
  },
};

module.exports = usersAPIController;
