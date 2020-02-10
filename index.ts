import Server from './clases/server';
import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import pedidosRoutes from './routes/pedidos';
import platoRoutes from './routes/menuarticulo';
import restauranteRoutes from './routes/restaurante';

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//FileUpload (?)
server.app.use(fileUpload());

//Configurar Cors
server.app.use(cors({origin : true, credentials: true}));


//Rutas de mi app
server.app.use('/user', userRoutes); 
server.app.use('/pedidos', pedidosRoutes); 
server.app.use('/menuarticulo', platoRoutes);
server.app.use('/restaurante',restauranteRoutes)

//Conectar DB
mongoose.connect(
    'mongodb+srv://pablo:pablo2020@cluster0-qdj2m.mongodb.net/appmesero?retryWrites=true&w=majority',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},(err)=>{
        if (err) throw err;
        console.log('Base de datos online ');
})

server.app.set('port',process.env.PORT || 3000);

//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});



