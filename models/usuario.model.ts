import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioEsquem = new Schema({
    nombre: {
        type: String,
        //True indica que es obligatorio y el mensaje correspondiente a su derecha
        required: [true, 'El nombre es necesario']
    },
    apellido:{
        type:String,
        required: [true, 'El apellido es necesario']
    },
    rol:{
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

usuarioEsquem.method('compararContra', function(contrasena: string = ''): boolean {
    if (bcrypt.compareSync( contrasena, this.contrasena)){
        return true;
    }else{
        return false;
    }
}); 

interface Iusuario extends Document{
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    rol: string;

    compararContra (contrasena: string):boolean;
}

export const Usuario = model <Iusuario>('Usuario', usuarioEsquem);