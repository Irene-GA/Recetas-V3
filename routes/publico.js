/* Listado de servicios de la parte pública de recetas con los métodos
GET para renderizar la vista, para buscar e ir a la ficha de la receta */

const express = require('express');

let Receta = require(__dirname + '/../models/receta.js');
let router = express.Router();

//Servicio Inicio de la Aplicación
router.get('/', (req, res) => {
    res.render('publico_index');
});

//Servicio de Buscar Recetas
router.post('/buscar', (req, res) => {
    let busqueda = req.body.buscar;
    Receta.find({
        titutlo: busqueda
    }).then(resultado => {
        if (resultado) {
            res.render('publico_index', { receta: resultado });
        } else {
            res.render('publico_error', { mensaje: "No se encontraron recetas" });
        }
    });
});


// GET Receta por ID
router.get('/receta/:id', (req, res) => {
    Receta.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('publico_receta', { receta: resultado });
        } else
            res.render('publico_error', { mensaje: "Receta no encontrada" });
    }).catch(error => {
        res.render('publico_error');
    });
});


module.exports = router;