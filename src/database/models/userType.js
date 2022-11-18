module.exports = (sequelize, DataTypes) => {
    const alias = "UserType";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type:{
            type: DataTypes.STRING(200)
        }
    }

    const config = {
        tableName: "user_type",
        timestamps: false
    }

    const userType = sequelize.define(alias, cols, config);

    userType.associate = function(models) {
        userType.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_type_id"
        })
    }

    return userType
}