'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('emails', {
      id: {
        type: Sequelize.UUID,
        defaultValeu: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      email: Sequelize.STRING,
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users'
          }
        },
        key: 'id',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('emails')
  }
};
