'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('patients', 'confirmed', {
           type: Sequelize.BOOLEAN
        }, { transaction: t }),
       ])
     })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('patients', 'confirmed', {transaction: t})
      ])
    })
  }
};
