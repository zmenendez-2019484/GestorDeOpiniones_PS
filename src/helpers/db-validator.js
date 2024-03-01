import User from '../models/user.model';

export const existenteEmail = async (email = '') => {
    // Buscar el usuario por correo electrónico
    const existeEmail = await User.findOne({ email });

    // Si el correo ya está registrado, lanzar un error
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existenteUserName = async (username = '') => {
    // Buscar el usuario por nombre de usuario
    const existeUserName = await User.findOne({ username });
    if (existeUserName) {
        throw new Error(`El nombre de usuario ${username} ya fue registrado`);
    }
}