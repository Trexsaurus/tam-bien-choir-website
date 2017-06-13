let express     = require('express');
let bodyParser  = require('body-parser');
let path        = require('path');
let config      = require('./config.json');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, config.client.path)));

module.exports = app;