module.exports = (sequelize, DataTypes) => {
    const alias = "userType";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type:{
            type: DataTypes.VARCHAR(200)
        }
    }

    const config = {
        tableName: "user_type",
        timestamps: false
    }

    const userType = sequelize.define(alias, cols, config);

    userType.associate = function(models) {
        userType.belongsTo(models.users, {
            as: "users",
            foreignKey: "user_type_id"
        })
    }

    return userType
}