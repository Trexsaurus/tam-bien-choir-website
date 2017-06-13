const security  = require('../utils/security');

let username = 'admin';
let password = 'test';

security.updatePassword(username, password)
    .then(() => {
        security.verifyLogin(username, password)
            .then((isValid) => console.log(isValid ? 'Login successful!' : 'Login failed!'))
            .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));