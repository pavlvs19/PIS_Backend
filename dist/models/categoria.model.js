"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const menuPlato = new Schema({
//     nombreCat:{
//         type: Schema.Types.ObjectId,
//         ref: "menuCatEsquem",
//         required: [true, 'Debe de existir una referencia a una categoría']
//     },
//     nombreItem:{
//         type: String,
//         required: [true, 'El nombre del ítem es necesario']
//     },
//     precio:{
//         type: Number,
//         required: [true, 'El precio del ítem es necesario']
//     }
// });
const menuCatEsquem = new mongoose_1.Schema({
    nombreCat: {
        type: String,
        required: [true, 'El nombre de la categoría es necesario']
    }
    // ,
    // components: [
    //     menuPlato
    // ],
});
//<IMenu> (abajo)
exports.categoria = mongoose_1.model('Categoria', menuCatEsquem);
