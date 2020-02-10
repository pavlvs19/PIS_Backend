import { Schema,model, Document } from 'mongoose';


const platoEsquem = new Schema({
   
    nombreCat:{
        type: String,
        required: [false, 'Debe existir una referencia a una categoría']                
    },
    articulos: [
        {    
            nombreArt: {
                type: String,
                required: [true, 'El nombre del artículo es necesario']
            },

            precio:{
                type: Number,
                required: [true, 'El precio del artículo es necesario']
            }
        }
    ]
});

interface IPlato extends Document{
    nombreCat: string,
    nombreArt: string,
    precio: number
}

export const Plato = model <IPlato> ('Plato', platoEsquem);

