"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioEsquem = new mongoose_1.Schema({
    nombre: {
        type: String,
        //True indica que es obligatorio y el mensaje correspondiente a su derecha
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    rol: {
        type: String,
        required: [true, 'El rol es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
});
usuarioEsquem.method('compararContra', function (contrasena = '') {
    if (bcrypt_1.default.compareSync(contrasena, this.contrasena)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioEsquem);
