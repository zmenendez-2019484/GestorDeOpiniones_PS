import Category from '../categories/category.model.js';

export const postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        return res.status(201).json({
            msg: 'Category successfully created',
            category
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            msg: 'Internal server error',
            e
        });
    }
};

