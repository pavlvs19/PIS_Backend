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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../dist/clases/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
//Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos'
            });
        }
        if (userDB.compararContra(body.contrasena)) {
            const tokenUsr = token_1.default.getJWTToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellido: userDB.apellido,
                email: userDB.email,
                rol: userDB.rol
            });
            res.json({
                ok: true,
                rol: userDB.rol,
                token: tokenUsr
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos ****'
            });
        }
    });
});
//Crear un usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: bcrypt_1.default.hashSync(req.body.contrasena, 10),
        rol: req.body.rol
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUsr = token_1.default.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            rol: userDB.rol,
            token: tokenUsr
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtener todos los usuarios xd
userRoutes.get('/getRol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_model_1.Usuario.find({}, { rol: 'gerente', }).populate('-_id');
    res.json({
        ok: true,
        rol: usuario
    });
}));
//Actualizar usuario
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        email: req.body.email || req.usuario.email,
        rol: req.body.rol || req.usuario.rol
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = token_1.default.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            userDB,
            token: tokenUser
        });
    });
});
//Obtener usuario
userRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
//Obtener usuarios
userRoutes.get('/getUsuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_model_1.Usuario.find();
    res.json({
        ok: true,
        usuario
    });
}));
//ELIMINAR UN USUARIO DEL RESTAURANTE
userRoutes.post('/borrarUser', (req, postDB) => {
    usuario_model_1.Usuario.remove({ email: req.body.email }).then(res => {
        postDB.json({
            ok: true,
            res
        });
    }).catch(err => postDB.json({
        err
    }));
});
exports.default = userRoutes;
