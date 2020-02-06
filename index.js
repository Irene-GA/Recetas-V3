// Librerías externas
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const session = require('express-session');

// Enrutadores
const auth = require(__dirname + '/routes/auth.js');
const publico = require(__dirname + '/routes/publico.js');
const recetas = require(__dirname + '/routes/recetas.js');

// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/recetasV3', { useNewUrlParser: true });

let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false,
    //   expires: new Date(Date.now() + (30 * 60 * 1000))
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Carga de middleware y enrutadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//Middlewere method-override para el metodo borrar
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' &&
        '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Enrutadores para cada grupo de rutas
app.use('/', publico);
app.use('/admin', recetas);
app.use('/auth', auth);

// Puesta en marcha del servidor
app.listen(8080);