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
const menuarticulo_model_1 = require("../models/menuarticulo.model");
const platoRoutes = express_1.Router();
let plato;
//CREAR UN PLATO AL MENÚ
platoRoutes.post('/', (req, res) => {
    const body = req.body;
    menuarticulo_model_1.Plato.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        // await postDB.populate('articulos').execPopulate();
        plato = new menuarticulo_model_1.Plato();
        plato.nombreCat = req.body.nombreCat;
        plato.nombreArt = req.body.nombreArt;
        plato.precio = req.body.precio;
        res.json({
            ok: true,
            plato: postDB,
        });
    })).catch(err => {
        res.json(err);
    });
});
platoRoutes.post('/agregar', (req, res) => {
    const body = req.body;
    //AGREGAR UN NUEVO ARTÍCULO
    menuarticulo_model_1.Plato.updateOne({ nombreCat: req.body.nombreCat }, {
        $push: {
            articulos: {
                nombreArt: req.body.nombreArt,
                precio: req.body.precio
            }
        }
    }).then(postDB => {
        res.json({
            ok: true,
            articulos: postDB
        });
    }).catch(err => {
        res.json(err);
    });
});
platoRoutes.post('/borrar', (req, res) => {
    menuarticulo_model_1.Plato.updateOne({ nombreCat: req.body.nombreCat }, { $pull: { articulos: { nombreArt: req.body.nombreArt } } })
        .then(postDB => {
        res.json({
            ok: true,
            articulos: postDB
        });
    }).catch(err => {
        res.json(err);
    });
});
platoRoutes.get('/mostrarmenu', (req, res) => {
    const body = req.body;
    menuarticulo_model_1.Plato.find({}).then(getDB => {
        res.json({
            ok: true,
            plato: getDB,
        });
    })
        .catch(err => {
        res.json(err);
    });
});
platoRoutes.post('/updateCat', (req, res) => {
    const nombreCat = {
        nombreCat: req.body.nombreCat || req.plato.nombreCat
    };
    menuarticulo_model_1.Plato.findByIdAndUpdate(req.body._id, nombreCat, { new: true }, (err, postDB) => {
        if (err)
            throw err;
        if (!postDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        res.json({
            ok: true,
            token: postDB
        });
    });
});
//Borrar categoría
platoRoutes.post('/borrarCat', (req, res) => {
    menuarticulo_model_1.Plato.remove({ nombreCat: req.body.nombreCat }).then(postDB => {
        res.json({
            ok: true,
            postDB
        });
    }).catch(err => {
        res.json({
            err
        });
    });
});
exports.default = platoRoutes;
