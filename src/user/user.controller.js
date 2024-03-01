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
export const putProfile = async (req, res) => {
    try {
        const { username, email, password, oldPassword } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log('Cuerpo de la solicitud:', req.body);
        console.log('Usuario autenticado:', req.user);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        if (password && oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'La contraseña anterior es incorrecta' });
            }
            if (oldPassword === password) {
                return res.status(400).json({ msg: 'La nueva contraseña no puede ser igual a la contraseña anterior' });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        // Verifica si el username o email ya están en uso
        if (username) {
            const userExists = await User.findOne({ username });
            if (userExists && userExists.id !== userId) {
                return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });
            }
            user.username = username;
        }

        if (email) {
            const userExists = await User.findOne({ email });
            if (userExists && userExists.id !== userId) {
                return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });
            }
            user.email = email;
        }

        // Guarda los cambios en la base de datos
        await user.save();

        res.status(200).json({
            msg: 'Perfil actualizado exitosamente',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al actualizar el perfil' });
    }
};
