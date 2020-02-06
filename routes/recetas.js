/* Listado de servicios de recetas con los métodos
GET, POST, PUT, y DELETE de la parte de administración */

const express = require('express');
const multer = require('multer');

let Receta = require(__dirname + '/../models/receta.js');
let autentication = require(__dirname + '/../utils/auth.js');

let router = express.Router();

//Middelwere storage multer
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
let upload = multer({ storage: storage });

//Servicio GET listado de recetas 
router.get('/', autentication, (req, res) => {
    Receta.find().then(resultado => {
        res.render('admin_recetas', { recetas: resultado });
    }).catch(error => {
        res.render('admin_error');
    });
});

//Servicio GET renderizar Formulario de Recetas
router.get('/recetas/nueva', autentication, (req, res) => {
    res.render('admin_recetas_form');
});

//Servicio GET renderizar Editar Recetas
router.get('/recetas/editar/:id', autentication, (req, res) => {
    Receta.findById(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.render('admin_recetas_form', {
                    recetas: resultado
                });
            else
                res.render('admin_error', {
                    mensaje: "Receta no encontrada"
                });
        }).catch(error => {
            res.render('admin_error');
        });
});


//Servicio POST para recetas
router.post('/recetas', upload.single('imagen'), autentication, (req, res) => {
    let elemento1 = null;
    let elemento2 = null;
    let elemento3 = null;

    if (req.body.ingrediente && req.body.cantidad && req.body.unidad) {
        elemento1 = {
            ingrediente: req.body.ingrediente,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad,
        }
    }
    if (req.body.ingrediente2 && req.body.cantidad2 && req.body.unidad2) {
        elemento2 = {
            ingrediente: req.body.ingrediente2,
            cantidad: req.body.cantidad2,
            unidad: req.body.unidad2,
        }
    }
    if (req.body.ingrediente3 && req.body.cantidad3 && req.body.unidad3) {
        elemento3 = {
            ingrediente: req.body.ingrediente3,
            cantidad: req.body.cantidad3,
            unidad: req.body.unidad3,
        }
    }

    let nuevaReceta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        imagen: req.file.filename,
        elementos: [elemento1, elemento2, elemento3]
    });

    nuevaReceta.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { mensaje: "Error añadiendo receta" });
        console.log(error);
    }).catch(error => {
        res.render('admin_error');
        console.log(error);
    });
});


//Servicio Editar para recetas
router.put('/recetas/:id', autentication, (req, res) => {
    Receta.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion,
            // imagen: req.file.filename,
            elementos: [{
                    ingrediente: req.body.ingrediente,
                    cantidad: req.body.cantidad,
                    unidad: req.body.unidad,
                },
                {
                    ingrediente: req.body.ingrediente2,
                    cantidad: req.body.cantidad2,
                    unidad: req.body.unidad2,
                },
                {
                    ingrediente: req.body.ingrediente3,
                    cantidad: req.body.cantidad3,
                    unidad: req.body.unidad3,
                }
            ]
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl)
        else
            res.render('admin_error', { mensaje: "Error, no se ha encontrado la receta" });
    }).catch(error => {
        res.render('admin_error');
    });

});

// Servicio DELETE para recetas
router.delete('/recetas/:id', autentication, (req, res) => {
    Receta.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl)
        else
            res.render('admin_error', { mensaje: "Error, no se ha encontrado la receta" });
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;