import commentService from '../services/comment.js';

const commentController = {
    create: async function(req, res) {
                try {
                    const userId = req.user.id;
                    const postId = req.params.postId;
                    const message = req.body.message;

                    const comment = await commentService.create(userId, postId, message);

                    return res.status(201).json({ message: 'Comment created successfully', comment });

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },

    getAll: async function(req, res) {
                try {
                    const comments = await commentService.getAll();

                    return res.status(200).json({ message: 'Success', comments });

                } catch (error) {
                    return res.status(500).json({ error: error.message });
                };   
            },

    update: async function(req, res) {
                try {
                    await commentService.update(req.params.commentId, req.body.message);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };
            },

    delete: async function(req, res) {
                try {
                    await commentService.delete(req.params.commentId);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },    
};

export default commentController;