"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_model_1 = require("../models/menu.model");
const menuRoutes = express_1.Router();
//CREAR CATEGORÍA EN MENÚ
menuRoutes.post('/crearplato', (req, res) => {
    const body = req.body;
    body.nombreCat = req.body.nombreCat;
    menu_model_1.Menu.create(body).then(postDB => {
        res.json({
            ok: true,
            mensaje: 'Plato creado exitosamente',
            plato: postDB
        });
    }).catch((err => {
        res.json({
            err
        });
    }));
});
exports.default = menuRoutes;
