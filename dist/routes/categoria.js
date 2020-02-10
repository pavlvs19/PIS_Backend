"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_model_1 = require("../models/categoria.model");
const token_1 = __importDefault(require("../dist/clases/token"));
const categoriaRoutes = express_1.Router();
//CREAR CATEGORÍA EN MENÚ
categoriaRoutes.post('/crearcategoria', (req, res) => {
    const cate = {
        nombreCat: req.body.nombreCat
    };
    categoria_model_1.categoria.create(cate).then(platoDB => {
        const tokenCat = token_1.default.getJWTToken({
            _id: platoDB._id,
            nombreCat: platoDB.nombreCat
        });
        res.json({
            ok: true,
            token: tokenCat
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
    // const body = req.body;
    // body.nombreCat = req.body.nombreCat;
    // categoria.create(body).then(postDB => {
    //     res.json({
    //         ok: true,
    //         mensaje: 'Plato creado exitosamente',
    //         plato: postDB
    //     })
    // }).catch((err => {
    //     res.json({
    //         err
    //     })
    // }));    
});
exports.default = categoriaRoutes;
