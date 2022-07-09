'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
         queryInterface.addColumn('appointments', 'description', {
           type: Sequelize.STRING,
        }, { transaction: t }),
       ])
     })
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'description', {transaction: t})
      ])
    })
  }
};
