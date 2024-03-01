import { validationResult } from 'express-validator';

export const validateFields = (req, res, next) => {

    // Obtener los errores de validación
    const errors = validationResult(req);

    // Verificar si existen errores
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Si no hay errores, pasar al siguiente middleware
    next();
};