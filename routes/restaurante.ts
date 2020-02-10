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
        _id: req.body._id || req.restaurant._id,
        nombreRes: req.body.nombreRes || req.restaurant.nombreRes,
        ruc: req.body.ruc || req.restaurant.ruc,
        telefono: req.body.telefono || req.restaurant.telefono,
        ciudad: req.body.ciudad || req.restaurant.ciudad,
        direccion: req.body.direccion || req.restaurant.direccion,
        mesas: req.body.mesas || req.restaurant.mesas,
    }
   
    Restaurante.findByIdAndUpdate(restaurante._id, restaurante, {new: true}, (err, resDB) =>{

        if (err) throw err;

        if (!resDB) {
            return resp.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        
        resp.json({
            ok: true,
            token: resDB
        });

    })
   
});








export default restauranteRoutes;