import { Router, Response, Request } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Restaurante } from '../models/restaurante.model';


const restauranteRoutes = Router();

//LLEVAR DATOS DEL RESTAURANTE CREADO
restauranteRoutes.get('/getDataRestaurante', async (req: Request, resp: Response) => {
    const datosRes = await Restaurante.find()
    
    resp.json({
        ok:true,
        datos: datosRes
    })
    
})

//CREAR UN RESTAURANTE
restauranteRoutes.post('/createRes', (req: Request, resp: Response) => {

    const body = req.body;

    Restaurante.create(body).then(  restDB => {
        
        resp.json({
            ok: true,
            restaurantData: restDB
        })
        

    }).catch(err => {
        resp.json({
            ok: false,
            err
        });
    });

});


//ACTUALIZAR EL RESTAURANTE
restauranteRoutes.post('/updateRes', (req: any, resp: Response) => {

    const restaurante = {
   
        nombreRes: req.body.nombreRes || '',
        ruc: req.body.ruc || '',
        telefono: req.body.telefono || '',
        ciudad: req.body.ciudad || '',
        direccion: req.body.direccion || '',
        mesas: req.body.mesas || '',
    }

    const _id = req.body._id;
    
    Restaurante.findByIdAndUpdate(_id, restaurante, {new: true}, (err, resDB) =>{
        console.log('_id que vino: ', _id);

        if (err) throw err;

        if (!resDB) {
            return resp.json({
                ok: false,
                mensaje: 'No existe un restaurante con ese ID'
            });
        }
        
        resp.json({
            ok: true,
            token: resDB
        });

    })
   
});








export default restauranteRoutes;