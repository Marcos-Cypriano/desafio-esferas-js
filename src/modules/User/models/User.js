const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            document: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "users"
        })
    }

    static associate(models) {
        this.hasMany(models.Phone, { foreignKey: 'user_id', as: 'phones'})
        this.hasMany(models.Email, { foreignKey: 'user_id', as: 'emails'})
    }
}

module.exports = User