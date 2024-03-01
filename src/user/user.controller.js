import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });

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
        const user = await User.findOne({ email: req.body.email });

        // Compara la contraseña
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'No se pudo iniciar sesión'
        });
    }
}

