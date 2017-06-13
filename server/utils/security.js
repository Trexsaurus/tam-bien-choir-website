"use strict";

const User          = require('../models').User;
const bcrypt        = require("bcrypt");

const saltRounds    = 10;

module.exports = {
    updatePassword: function (username, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds)
                .then((hash) => {
                    User.update({
                        hash: hash,
                        updated: new Date()
                    }, {
                        where: {
                            username: username,
                            deleted: null
                        }
                    })
                        .then((res) => resolve(res))
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    },

    verifyLogin: function (username, password) {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: {
                    username: username,
                    deleted: null
                },
                attributes: ['hash']
            })
                .then((res) => {
                    resolve(res.dataValues.hash);
                });
        })
            .then((hash) => bcrypt.compare(password, hash))
            .catch((err) => console.log(err));
    }
};
