'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('patients', 'image', {
          type: Sequelize.STRING,
         defaultValue:"https://nellions.co.ug/wp-content/uploads/2018/06/male-placeholder-image.jpeg", 
        }, { transaction: t }),
         queryInterface.addColumn('patients', 'description', {
           type: Sequelize.STRING,
        }, { transaction: t }),
       ])
     })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('patients', 'image', { transaction: t }),
        queryInterface.removeColumn('patients', 'description', {transaction: t})
      ])
    })
  }
};
