const Announcement  = require('../models').Announcement;

Announcement.findAll({})
    .then((res) => console.log(res.dataValues))
    .catch((err) => console.log(err));