"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restauranteEsquem = new mongoose_1.Schema({
    nombreRes: {
        type: String,
        required: [true, 'El nombre de restaurante es necesario']
    },
    ruc: {
        type: String,
        required: [true, 'El RUC de su restaurante es necesario']
    },
    telefono: {
        type: String,
        required: [false]
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es necesaria']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es necesaria']
    },
    mesas: {
        type: Number,
        required: [true, 'El número de mesas es necesario']
    }
});
exports.Restaurante = mongoose_1.model('Restaurante', restauranteEsquem);
