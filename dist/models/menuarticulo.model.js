"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const platoEsquem = new mongoose_1.Schema({
    nombreCat: {
        type: String,
        required: [false, 'Debe existir una referencia a una categoría']
    },
    articulos: [
        {
            nombreArt: {
                type: String,
                required: [true, 'El nombre del artículo es necesario']
            },
            precio: {
                type: Number,
                required: [true, 'El precio del artículo es necesario']
            }
        }
    ]
});
exports.Plato = mongoose_1.model('Plato', platoEsquem);
