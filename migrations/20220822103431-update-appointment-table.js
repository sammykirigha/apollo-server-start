"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "appointments",
                    "patient_firstname",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "appointments",
                    "patient_lastname",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
              ),
                queryInterface.removeColumn('appointments', 'comments', { transaction: t }),
            ]);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'patient_firstname', { transaction: t }),
        queryInterface.removeColumn('appointments', 'patient_lastname', { transaction: t }),
      ]);
    });
    },
};
