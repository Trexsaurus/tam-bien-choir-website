"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "This username is already taken."
            },
            validate: {
                len: 6
            }
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                isEmail: true
            }
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            validate: {
                isDate: true
            }
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        deleted: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user"
    });
};
