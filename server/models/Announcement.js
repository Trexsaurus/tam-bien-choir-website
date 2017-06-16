"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Announcement", {
        announcementId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            validate: {
                isDate: true
            }
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deleted: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        deletedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "announcement"
    });
};
