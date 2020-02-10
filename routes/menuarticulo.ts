import { Router, Response, response } from 'express';
import { Plato } from '../models/menuarticulo.model';


const platoRoutes = Router();
let plato;

//CREAR UN PLATO AL MENÚ
platoRoutes.post('/', (req: any, res: Response) => {
    const body = req.body;

    Plato.create(body).then(async postDB => {
        // await postDB.populate('articulos').execPopulate();

        plato = new Plato();
        plato.nombreCat = req.body.nombreCat;
        plato.nombreArt = req.body.nombreArt;
        plato.precio = req.body.precio;

        
        res.json({
            ok: true,
            plato: postDB,
            
        });

    }).catch(err => {
        res.json(err)
    });
});

platoRoutes.post('/agregar', (req: any, res: Response) => {
    const body = req.body;

    //AGREGAR UN NUEVO ARTÍCULO
    Plato.updateOne({ nombreCat: req.body.nombreCat }, {
        $push: {
            articulos: {
                nombreArt: req.body.nombreArt,
                precio: req.body.precio
            }
        }
    }).then(postDB => {


        res.json({
            ok: true,
            articulos: postDB
        })

    }).catch(err => {
        res.json(err);
    }
    );
});

platoRoutes.post('/borrar', (req: any, res: Response) => {

    Plato.updateOne({ nombreCat: req.body.nombreCat },
        { $pull: { articulos: { nombreArt: req.body.nombreArt } } })

        .then(postDB => {
            res.json({
                ok: true,
                articulos: postDB
            })

        }
        ).catch(err => {
            res.json(err);
        })
}
);

platoRoutes.get('/mostrarmenu', (req: any, res: Response) => {
    const body = req.body;

    Plato.find({}).then(getDB => {
        res.json({
            ok: true,
            plato: getDB,

        })
    })
        .catch(err => {
            res.json(err);
        })

});


platoRoutes.post('/updateCat', (req: any, res: Response) => {

    const nombreCat = {
        nombreCat: req.body.nombreCat || req.plato.nombreCat
    }

    Plato.findByIdAndUpdate(req.body._id, nombreCat, { new: true }, (err, postDB) => {
        if (err) throw err;

        if (!postDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        
        res.json({
            ok: true,
            token: postDB
        });
    
    });
});

//Borrar categoría
platoRoutes.post('/borrarCat', (req: any, res: Response) => {

    Plato.remove({ nombreCat: req.body.nombreCat }).then(postDB => {

        res.json({
            ok: true,
            postDB
        })

    }).catch(err => {
        res.json({
            err
        })
    })

})

export default platoRoutes;


