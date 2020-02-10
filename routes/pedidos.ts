import { Router, Response, Request } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Pedido } from '../models/pedido.model';



const pedidosRoutes = Router();


//OBTENER PEDIDOS paginados(?)
pedidosRoutes.get('/obtenerpedidos', async (req: any, resp: Response) => {

    const pedido = await Pedido.find()
                                    .sort({ _id: -1 })
                                    //.skip(skip)
                                    .populate('usuario', '-contrasena')
                                    //.limit(10)
                                    .exec();

    resp.json({
        ok: true,
        // pagina,
        pedido

    })
});


//CREAR PEDIDO
pedidosRoutes.post('/', [verificaToken], (req: any, resp: Response) => {

    const body = req.body;

    body.usuario = req.usuario._id;

    Pedido.create(body).then(async postDB => {

        await postDB.populate('usuario', '-contrasena').execPopulate();

        resp.json({
            ok: true,
            pedidos: postDB
        });

    }).catch(err => {
        resp.json(err)
    });

});


//Borrar pedido
pedidosRoutes.post('/borrarPed', [verificaToken], (req: any, resp: Response) => {

    Pedido.remove({mesa: req.body.mesa}).then( postDB => {

        resp.json({
            ok: true,
            postDB
        })

    })

});


//ACTUALIZAR EL PEDIDO LISTO A TRUE
pedidosRoutes.post('/listoTrue', (req: any, resp: Response) => {

    const data = {
        //Aquí vendría el listo = true
        listo: req.body.listo || req.pedido.listo
    }

    Pedido.findByIdAndUpdate( req.body._id, data, {new: true}, (err, postDB) => {
        if (err) throw err;

            if (!postDB) {
                return resp.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            } else {

                resp.json({
                    ok: true,
                    token: postDB
                });
            }

    })


})

export default pedidosRoutes;