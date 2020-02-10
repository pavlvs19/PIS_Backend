import { Router, Request, Response, response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../dist/clases/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//Login
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    Usuario.findOne({email: body.email}, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
         
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos'
            })
        }

        if (userDB.compararContra(body.contrasena)) {
            const tokenUsr = Token.getJWTToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellido: userDB.apellido,
                email: userDB.email,
                rol: userDB.rol
            });

            res.json({
                ok: true,
                rol: userDB.rol,
                token: tokenUsr
            });


        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos ****'
            })
        }
    })
})

//Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        rol: req.body.rol
    }

    Usuario.create(user).then(userDB => {

        const tokenUsr = Token.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            rol: userDB.rol
        });

        res.json({
            ok: true,
            rol: userDB.rol,
            token: tokenUsr
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });



});

//Obtener todos los usuarios xd
userRoutes.get('/getRol', async (req: any, res: Response) => {

    const usuario = await Usuario.find({}, { rol: 'gerente', }).populate('-_id') 

    res.json({
        ok: true,
        rol: usuario
    })



})

//Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        email: req.body.email || req.usuario.email,
        rol: req.body.rol ||  req.usuario.rol
    }

    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err) throw err;
        

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            userDB,
            token: tokenUser
        });
    });




});

//Obtener usuario
userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const usuario = req.usuario;

    res.json({
        ok:true,
        usuario
    })

});

//Obtener usuarios
userRoutes.get('/getUsuarios',  async ( req: any, res: Response ) => {

    const usuario = await Usuario.find()

    res.json({
        ok: true,
        usuario
    })    

});

//ELIMINAR UN USUARIO DEL RESTAURANTE
userRoutes.post('/borrarUser', ( req: any, postDB: Response) => {

    Usuario.remove({ email: req.body.email }).then( res => {
        postDB.json({
            ok: true,
            res
        })
    }).catch(err => 
        
        postDB.json({
            err
        })
    )


})



export default userRoutes;