import { Schema, model, Document } from 'mongoose';



const restauranteEsquem = new Schema({
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


interface IRestaurante extends Document{
    nombreRes: string,
    ruc: string,
    telefono: string,
    ciudad: string,
    direccion: string,
    mesas: number
}

export const Restaurante = model<IRestaurante>('Restaurante', restauranteEsquem)


