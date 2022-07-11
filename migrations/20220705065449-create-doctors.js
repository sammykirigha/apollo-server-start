"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("doctors", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: Sequelize.STRING,
                required: true,
            },
            lastname: {
                type: Sequelize.STRING,
                required: true,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
            },
            phone: {
                type: Sequelize.STRING,
                required: true,
            },
            gender: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                required: true,
            },
            department: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            specialization: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue:
                    "https://nellions.co.ug/wp-content/uploads/2018/06/male-placeholder-image.jpeg",
            },
            facebooklLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            linkedinlLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            instagramlLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            twitterlLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
          },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("doctors");
    },
};
