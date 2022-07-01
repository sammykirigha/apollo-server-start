'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('patients', 'password', {
           type: Sequelize.STRING
        }, { transaction: t }),
       ])
     })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('patients', 'password', {transaction: t})
      ])
    })
  }
};
