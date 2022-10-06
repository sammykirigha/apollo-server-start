'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "patients",
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
        queryInterface.removeColumn('patients', 'age', { transaction: t }),
      ]);
    });
    },
};

