module.exports = (sequelize, DataTypes) => {
    const alias = "VehiclesModels";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(4000)
        },
        model_name: {
            type: DataTypes.STRING(200)
        },
        year: {
            type: DataTypes.INTEGER
        },
        fuel_type: {
            type: DataTypes.STRING(100)
        },
        transmission_type: {
            type: DataTypes.STRING(100)
        },
        airbag: {
            type: DataTypes.BOOLEAN
        },
        doors_quantity: {
            type: DataTypes.TINYINT
        }
    }
    const config = {
        tableName: "vehicles_models",
        timestamps: false
    }
    
    const VehiclesModels = sequelize.define(alias, cols, config);

    VehiclesModels.associate = function(models) {
        VehiclesModels.hasMany(models.Vehicles, {
            as: "vehicles",
            foreignKey: "vehicle_model_id"
        })

        VehiclesModels.belongsTo(models.Brand, {
            as: "model_brand",
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

    return VehiclesModels;
}