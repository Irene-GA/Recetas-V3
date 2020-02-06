//Ayuda para generar usuarios directamente enl a base de datos

let Usuario = require(__dirname + '/../models/usuario.js');

const mongoose = require('mongoose');
//const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");

mongoose.connect('mongodb://localhost:27017/recetasV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'admin',
    password: SHA256('admin')
});
usu1.save();

let usu2 = new Usuario({
    login: 'usuario',
    password: SHA256('12345678')
});
usu2.save();

module.exports = Usuario;