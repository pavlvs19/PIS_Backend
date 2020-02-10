"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const articuloEsquem = new mongoose_1.Schema({
    nombreCat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Debe existir una referencia a una categoría']
    },
    articulos: [
        {
            nombreArt: {
                type: String,
                required: [true, 'El nombre del artículo es necesario']
            }
        },
        {
            precio: {
                type: String,
                required: [true, 'El precio del artículo es necesario']
            }
        }
    ]
});
exports.Articulo = mongoose_1.model('Articulo', articuloEsquem);
