const User  = require('../models').User;

User.findOne({ where: { username: 'admin', deleted: null } })
    .then((res) => console.log(res.dataValues))
    .catch((err) => console.log(err));