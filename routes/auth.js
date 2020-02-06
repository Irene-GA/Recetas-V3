/* Listado de servicios para la autentificación de usuarios y administradores
con el método GEt para la vista y logout y el servicio POST para confirmar usuario */

const express = require('express');
//const session = require('express-session');
let router = express.Router();

let Usuario = require(__dirname + '/../models/usuario.js');


//const AES = require("crypto-js/sha256");
const SHA256 = require("crypto-js/sha256");

//Get login de los usuarios
router.get('/login', (req, res) => {
    res.render('auth_login');
});

//Salir de la sesión
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

//usuario logeado
router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    let passwordCript = SHA256(password)

    Usuario.find({
        login: login,
        password: passwordCript.toString()
    }).then(resultado => {
        if (resultado.length == 0) {
            res.render('auth_login', { error: "Usuario incorrecto" });
        } else {
            req.session.usuario = resultado;
            res.redirect('/admin')
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;