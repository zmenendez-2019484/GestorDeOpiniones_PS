import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import { postCategory } from '../categories/category.controller.js';
const router = Router();
router.post('/addCategory',
    [
        check('name', 'Category name is required').not().isEmpty(),
        validateFields
    ],
    postCategory
);
export default router;