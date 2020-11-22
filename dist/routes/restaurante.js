"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurante_model_1 = require("../models/restaurante.model");
const restauranteRoutes = express_1.Router();
//LLEVAR DATOS DEL RESTAURANTE CREADO
restauranteRoutes.get('/getDataRestaurante', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const datosRes = yield restaurante_model_1.Restaurante.find();
    resp.json({
        ok: true,
        datos: datosRes
    });
}));
//CREAR UN RESTAURANTE
restauranteRoutes.post('/createRes', (req, resp) => {
    const body = req.body;
    restaurante_model_1.Restaurante.create(body).then(restDB => {
        resp.json({
            ok: true,
            restaurantData: restDB
        });
    }).catch(err => {
        resp.json({
            ok: false,
            err
        });
    });
});
//ACTUALIZAR EL RESTAURANTE
restauranteRoutes.post('/updateRes', (req, resp) => {
    const restaurante = {
        nombreRes: req.body.nombreRes || '',
        ruc: req.body.ruc || '',
        telefono: req.body.telefono || '',
        ciudad: req.body.ciudad || '',
        direccion: req.body.direccion || '',
        mesas: req.body.mesas || '',
    };
    const _id = req.body._id;
    // console.log('_id que vino1: ', _id);
    restaurante_model_1.Restaurante.findByIdAndUpdate({ _id }, restaurante, { new: true }, (err, resDB) => {
        // console.log('_id que vino2: ', _id);
        if (err)
            throw err;
        if (!resDB) {
            return resp.json({
                ok: false,
                mensaje: 'No existe un restaurante con ese ID'
            });
        }
        resp.json({
            ok: true,
            token: resDB
        });
    });
});
exports.default = restauranteRoutes;
