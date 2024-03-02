import { Router } from 'express';
import { createPost, editPost, deletePost } from '../publications/publication.controller.js';
import { validarJWT } from '../middlewares/validate-jwt.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateFieldsPost } from '../middlewares/validate-fieldnames.js';

const router = Router();

router.post('/', [
    validateFieldsPost,
    validarJWT,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('text', 'El texto es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    validateFields
], createPost);

router.put('/:id', [
    validarJWT,
    validateFieldsPost,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('text', 'El texto es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    validateFields
], editPost);

router.delete('/deletePost/:id',
    validarJWT,
    deletePost
);

export default router;
