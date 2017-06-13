"use strict";

const path      = require("path");
const Sequelize = require("sequelize");
const fs        = require("fs");
const config    = require(path.join(__dirname, "..", "config.json"));
const database  = config.database;

let dbConfig = database;
dbConfig.storage = path.join(__dirname, "..", database.storage);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

let db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
        model.sync();
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
