module.exports = (sequelize, DataTypes) => {
    const alias = "users";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.VARCHAR(500)
        },
        last_name: {
            type: DataTypes.VARCHAR(500)
        },
        legal_identifier: {
            type: DataTypes.VARCHAR(250)
        },
        phone_number: {
            type: DataTypes.VARCHAR(300)
        },
        email: {
            type: DataTypes.VARCHAR(500)
        },
        postal_code: {
            type: DataTypes.VARCHAR(200)
        },
        password: {
            type: DataTypes.VARCHAR(400)
        },
        image_path: {
            type: DataTypes.VARCHAR(300)
        },
        user_type_id: {
            type: DataTypes.INTEGER
        }

    }
    const config = {
        tableName: "users",
        timestamps: false
    }
    const users = sequelize.define(alias, cols, config)

    users.associate = function(models) {
        users.hasMany(models.userType, {
            as: "user_type",
            foreignKey: "user_type_id"
        })
    }
    return users
}