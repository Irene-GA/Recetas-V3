//Esquema de las Recetas con sus Elementos

const mongoose = require('mongoose');

let recetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    comensales: {
        type: Number,
        required: true,
        nim: 1
    },
    preparacion: {
        type: Number,
        required: true,
        nim: 1
    },
    coccion: {
        type: Number,
        require: true,
        nim: 0
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    imagen: {
        type: String,
        trim: true,
    },
    elementos: [{
        ingrediente: {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1,
            trim: true
        },
        unidad: {
            type: String,
            required: true,
            minlength: 5,
            trim: true
        }
    }],
});

let Receta = mongoose.model('receta', recetaSchema);
module.exports = Receta;