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
const autenticacion_1 = require("../middlewares/autenticacion");
const pedido_model_1 = require("../models/pedido.model");
const pedidosRoutes = express_1.Router();
//OBTENER PEDIDOS paginados(?)
pedidosRoutes.get('/obtenerpedidos', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedido_model_1.Pedido.find()
        .sort({ _id: -1 })
        //.skip(skip)
        .populate('usuario', '-contrasena')
        //.limit(10)
        .exec();
    resp.json({
        ok: true,
        // pagina,
        pedido
    });
}));
//CREAR PEDIDO
pedidosRoutes.post('/', [autenticacion_1.verificaToken], (req, resp) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    pedido_model_1.Pedido.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-contrasena').execPopulate();
        resp.json({
            ok: true,
            pedidos: postDB
        });
    })).catch(err => {
        resp.json(err);
    });
});
//Borrar pedido
pedidosRoutes.post('/borrarPed', [autenticacion_1.verificaToken], (req, resp) => {
    pedido_model_1.Pedido.remove({ mesa: req.body.mesa }).then(postDB => {
        resp.json({
            ok: true,
            postDB
        });
    });
});
//ACTUALIZAR EL PEDIDO LISTO A TRUE
pedidosRoutes.post('/listoTrue', (req, resp) => {
    const data = {
        //Aquí vendría el listo = true
        listo: req.body.listo || req.pedido.listo
    };
    pedido_model_1.Pedido.findByIdAndUpdate(req.body._id, data, { new: true }, (err, postDB) => {
        if (err)
            throw err;
        if (!postDB) {
            return resp.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        else {
            resp.json({
                ok: true,
                token: postDB
            });
        }
    });
});
exports.default = pedidosRoutes;
