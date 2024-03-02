import Comment from '../comments/comment.model.js';

export const createComment = async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            createdBy: req.user.id,
            post: req.body.post
        });

        await comment.save();

        res.status(201).json({
            msg: 'Comentario creado exitosamente',
            comment
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const editComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        if (comment.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para editar este comentario' });
        }

        if (req.body.content) comment.content = req.body.content;

        await comment.save();

        res.json({
            msg: 'Comentario actualizado exitosamente',
            comment
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        if (comment.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar este comentario' });
        }

        comment.status = false;
        await comment.save();

        res.json({
            msg: 'Comentario eliminado exitosamente',
            comment
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

