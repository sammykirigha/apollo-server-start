'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "appointments",
                    "age",
                    {
                        type: Sequelize.INTEGER,
                    },
                    { transaction: t }
                ),
            ]);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'age', { transaction: t }),
      ]);
    });
    },
};

