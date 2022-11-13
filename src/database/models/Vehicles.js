module.exports = (sequelize, DataTypes) => {
    const alias = "Vehicles";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vehicle_model_id: {
            type: DataTypes.INTEGER
        },
        kilometers: {
            type: DataTypes.INTEGER
        },
        last_service_date: {
            type: DataTypes.DATE
        },
        color: {
            type: DataTypes.STRING(200)
        },
        last_balancing_alignment_date: {
            type: DataTypes.DATE
        },
        timing_belt_age_kilometers: {
            type: DataTypes.INTEGER
        },
        airbag_status: {
            type: DataTypes.STRING(200)
        },
        total_owners: {
            type: DataTypes.TINYINT
        },
        legal_identifier: {
            type: DataTypes.STRING(250)
        },
        location_province: {
            type: DataTypes.STRING(300)            
        },
        clutch_status: {
            type: DataTypes.STRING(250)
        },
        image_path: {
            type: DataTypes.STRING(300)
        },
        outstanding: {
            type: DataTypes.BOOLEAN
        }
    }
    const config = {
        tableName: "vehicles",
        timestamps: false
    }
    
    const Vehicles = sequelize.define(alias, cols, config);

    Vehicles.associate = function(models) {
        Vehicles.belongsTo(models.VehiclesModels, {
            as: "vehicles_models",
            foreignKey: "vehicle_model_id"
        })
    //     Movies.belongsToMany(models.Actor, {
    //         as: "actors",
    //         through: "actor_movie",
    //         foreignKey: "movie_id",
    //         otherKey: "actor_id",
    //         timestamps: false
    //     })
    }

    return Vehicles;
}