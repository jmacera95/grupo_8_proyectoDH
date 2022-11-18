module.exports = (sequelize, DataTypes) => {
    const alias = "Users";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(500)
        },
        last_name: {
            type: DataTypes.STRING(500)
        },
        legal_identifier: {
            type: DataTypes.STRING(250)
        },
        phone_number: {
            type: DataTypes.STRING(300)
        },
        email: {
            type: DataTypes.STRING(500)
        },
        postal_code: {
            type: DataTypes.STRING(200)
        },
        password: {
            type: DataTypes.STRING(400)
        },
        image_path: {
            type: DataTypes.STRING(300)
        },
        user_type_id: {
            type: DataTypes.INTEGER
        }

    }
    const config = {
        tableName: "users",
        timestamps: false
    }
    const Users = sequelize.define(alias, cols, config)

    Users.associate = function(models) {
        Users.hasMany(models.UserType, {
            as: "user_type",
            foreignKey: "user_type_id"
        })
    }
    return Users
}