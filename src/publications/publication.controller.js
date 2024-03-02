import Post from '../publications/publication.model.js';
import Category from '../categories/category.model.js ';

export const createPost = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            category: category._id,
            createdBy: req.user.id
        });

        await post.save();

        res.status(201).json({
            msg: 'Publicación creada exitosamente',
            post
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const editPost = async (req, res) => {
    try {
        // Buscar por su ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para editar esta publicación' });
        }

        // Actualizar los campos de la publicación
        if (req.body.title) post.title = req.body.title;
        if (req.body.text) post.text = req.body.text;
        if (req.body.category) {
            const category = await Category.findById(req.body.category);
            if (!category) {
                console.log(category);
                return res.status(404).json({ msg: 'Categoría no encontrada' });
            }
            post.category = category._id;
        }
        await post.save();

        res.json({
            msg: 'Publicación actualizada exitosamente',
            post
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const deletePost = async (req, res) => {
    try {
        // Buscar por su ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar esta publicación' });
        }

        // Cambiar el estado de la publicación a false
        post.status = false;
        await post.save();

        res.json({
            msg: 'Publicación eliminada exitosamente'
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

