import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const validarJWT = async (req, res, next) => {
    // Obtener el token de la cabecera de la petición
    const token = req.header("x-token");

    // Verificar si no hay token en la petición y devolver un error
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        // Verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario correspondiente al UID
        const user = await User.findById(uid);

        // Verificar que el usuario exista
        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            });
        }

        req.user = user;

        // Llamar a la siguiente función en la cadena de middlewares
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}