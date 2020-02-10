import { Schema, Document, model } from 'mongoose';

const pedidoEsquem = new Schema({

    mesa: {
        type: String
    },
    nombrePlato_Precio:[
        {            
            nombreArt: { type: String }, precio: { type: Number }, cantidad: {type: Number}
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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un mesero']
    },
    
});

pedidoEsquem.pre<IPedido>('save', function (next) {
    next();
}); 

interface IPedido extends Document {
    mesa: string;
    nombrePlato_Precio: any[];
    nombreCat: string;
    nombreArt: string;
    precio: number;
    cantidad: number;
    listo: boolean;
    notas: string;
    precioTotal: number;
    usuario: string;
}

export const Pedido = model<IPedido>('Pedido', pedidoEsquem);
