import bcrypt from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            msg: 'No se pudo registrar el usuario'
        });
    }

}

export const login = async (req, res) => {
    try {
        let user;

        // Comprueba si se envió un email
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email });
        }

        // Comprueba si se envió un username
        if (!user && req.body.username) {
            user = await User.findOne({ username: req.body.username });
        }

        // Si no se encontró el usuario, envía un mensaje de error
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        // Compara la contraseña
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        // Genera el token JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador",
        });
    }
}
