const { Model, DataTypes } = require('sequelize')

class Phone extends Model{
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            phone: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "phones"
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
    }
}

module.exports = Phone