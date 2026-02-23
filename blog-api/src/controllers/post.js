import postService from '../services/post.js';

const postController = {
    create: async function(req, res) {
                try {
                    const post = await postService.create(req.user.id, req.body);

                    return res.status(201).json({ message: 'Post created successfully', post });

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },

    getAll: async function(req, res) {
                try {
                    const page = Number(req.query.page) || 1;
                    const limit = Number(req.query.limit) || 5;

                    const data = await postService.getAll(page, limit);

                    return res.status(200).json({ ...data });

                } catch (error) {
                    return res.status(500).json({ error: error.message });
                };   
            },

    update: async function(req, res) {   
                try {
                    await postService.update(req.params.postId, req.body);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };
            },

    delete: async function(req, res) {
                try {
                    await postService.delete(req.params.postId);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },

    publish: async function(req, res) {
                try {
                    await postService.publish(req.params.postId);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },

    unpublish: async function(req, res) {
                try {
                    await postService.unpublish(req.params.postId);

                    return res.sendStatus(204);

                } catch (error) {
                    return res.status(400).json({ error: error.message });
                };    
            },

    getBySlug: async function(req, res) {
                try {
                    const post = await postService.getBySlug(req.params.slug);

                    return res.status(200).json({ message: 'Success', post });

                } catch (error) {
                    return res.status(500).json({ error: error.message });
                };   
            },

    search: async function(req, res) {
                try {
                    const data = await postService.search(req.query);

                    return res.status(200).json({ message: 'Success', ...data });

                } catch (error) {
                    return res.status(500).json({ error: error.message });
                };   
            },
    
    uploadImage: async function(req, res) {
                    try {
                        const data = await postService.uploadImage(req.file);
                            
                        return res.status(200).json({ message: 'Success', location: data.secure_url });

                    } catch (error) {
                        return res.status(500).json({ error: error.message });
                    };   
                },
};

export default postController;