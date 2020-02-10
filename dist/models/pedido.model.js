"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pedidoEsquem = new mongoose_1.Schema({
    mesa: {
        type: String
    },
    nombrePlato_Precio: [
        {
            nombreArt: { type: String }, precio: { type: Number }, cantidad: { type: Number }
        }
    ],
    notas: {
        type: String
    },
    precioTotal: {
        type: Number
    },
    listo: {
        type: Boolean
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un mesero']
    },
});
pedidoEsquem.pre('save', function (next) {
    next();
});
exports.Pedido = mongoose_1.model('Pedido', pedidoEsquem);
