module.exports = (sequelize, DataTypes) => {
    const alias = "Brand";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200)
        }
    }
    const config = {
        tableName: "brands",
        timestamps: false
    }
    
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models) {
        Brand.hasMany(models.VehiclesModels, {
            as: "vehicles_models",
            foreignKey: "brand_id"
        })
    //     Movies.belongsToMany(models.Actor, {
    //         as: "actors",
    //         through: "actor_movie",
    //         foreignKey: "movie_id",
    //         otherKey: "actor_id",
    //         timestamps: false
    //     })
    }

    return Brand;
}