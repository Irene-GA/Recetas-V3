//autentificacion: función para la auentificación de los usuarios
//const session = require('express-session');

let autentication = (req, res, next) => {
    if (req.session && req.session.usuario)
        return next();
    else
        res.render('auth_login');
};
module.exports = autentication;