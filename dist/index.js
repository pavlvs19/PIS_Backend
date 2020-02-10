"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const pedidos_1 = __importDefault(require("./routes/pedidos"));
const menuarticulo_1 = __importDefault(require("./routes/menuarticulo"));
const restaurante_1 = __importDefault(require("./routes/restaurante"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload (?)
server.app.use(express_fileupload_1.default());
//Configurar Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/pedidos', pedidos_1.default);
server.app.use('/menuarticulo', menuarticulo_1.default);
server.app.use('/restaurante', restaurante_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb+srv://pablo:pablo2020@cluster0-qdj2m.mongodb.net/appmesero?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos online ');
});
server.app.set('port', process.env.PORT || 3000);
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});
