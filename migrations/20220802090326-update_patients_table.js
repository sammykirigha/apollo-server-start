"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "patients",
                    "dateOfBirth",
                    {
                        type: Sequelize.DATE,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "patients",
                    "disability",
                    {
                        type: Sequelize.BOOLEAN,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "patients",
                    "county",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "patients",
                    "bloodGroup",
                    {
                        type: Sequelize.STRING, 
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "patients",
                    "nationality",
                    {
                        type: Sequelize.STRING,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "patients",
                    "maritalStatus",
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
        queryInterface.removeColumn('patients', 'dateOfBirth', { transaction: t }),
        queryInterface.removeColumn('patients', 'disability', { transaction: t }),
        queryInterface.removeColumn('patients', 'county', { transaction: t }),
        queryInterface.removeColumn('patients', 'bloodGroup', { transaction: t }),
        queryInterface.removeColumn('patients', 'nationality', { transaction: t }),
        queryInterface.removeColumn('patients', 'maritalStatus', { transaction: t })
      ]);
    });
    },
};
