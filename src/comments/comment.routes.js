import { Router } from 'express';
import { createComment, deleteComment, editComment } from '../comments/comment.controller.js';
import { validarJWT } from '../middlewares/validate-jwt.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateFieldsPostComment } from '../middlewares/validate-fieldnames.js';

const router = Router();

router.post('/', [
    validateFieldsPostComment,
    validarJWT,
    check('content', 'El contenido es obligatorio').not().isEmpty(),
    check('post', 'El post es obligatorio').not().isEmpty(),
    validateFields
], createComment);

router.put('/:id', [
    validarJWT,
    validateFieldsPostComment,
    check('content', 'El contenido es obligatorio').not().isEmpty(),
    check('post', 'El post es obligatorio').not().isEmpty(),
    validateFields
], editComment);

router.delete('/:id',
    validarJWT,
    deleteComment
);

export default router;