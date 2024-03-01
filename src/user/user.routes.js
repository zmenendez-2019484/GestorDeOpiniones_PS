import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import {
    login, register, putProfile
} from './user.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { existenteEmail, existenteUserName } from '../helpers/db-validator.js';
import { validarJWT } from '../middlewares/validate-jwt.js';
import { validateFieldNames, validateFieldsRegister } from '../middlewares/validate-fieldnames.js';
const router = Router();

router.post('/', [
    validateFieldsRegister,
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es un correo valido').isEmail(),
    check('email').custom(existenteEmail),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], register);


router.post('/login', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
], login);

router.put('/', [
    check('username', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('email', 'El correo no es un correo valido').optional().isEmail(),
    check('email').optional().custom(existenteEmail),
    check('username').optional().custom(existenteUserName),
    validateFields
], register);

router.put('/profile', [
    validarJWT, validateFieldNames,
    check('password', 'La contraseña es obligatoria si se desea cambiarla').optional().not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
    validateFields
], putProfile);

export default router;