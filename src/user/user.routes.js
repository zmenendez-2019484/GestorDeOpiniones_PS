import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import {
    login, register
} from './user.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { existenteEmail, existenteUserName } from '../helpers/db-validator.js';
const router = Router();

router.post('/', [
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


export default router;