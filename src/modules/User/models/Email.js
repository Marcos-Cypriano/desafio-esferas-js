const { Model, DataTypes } = require('sequelize')

class Email extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            email: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "emails"
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
    }
}

module.exports = Email