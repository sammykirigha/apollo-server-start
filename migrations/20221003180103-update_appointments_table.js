'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "appointments",
                    "appointment_type",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
              ),
              queryInterface.addColumn(
                    "appointments",
                    "other_type",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
                ),
            ]);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'appointment_type', { transaction: t }),
        queryInterface.removeColumn('appointments', 'other_type', { transaction: t }),
      ]);
    });
    },
};

