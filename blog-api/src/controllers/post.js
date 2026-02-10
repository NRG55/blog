import postService from '../services/post.js';

const createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.user.id, req.body);

        return res.status(201).json({ message: 'Post created successfully', post });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };    
};

const getPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts();

        return res.status(200).json({ message: 'Success', posts });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    };   
};

const updatePost = async (req, res) => {   
    try {
        await postService.updatePost(req.params.postId, req.body);

        return res.sendStatus(204);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

const deletePost = async (req, res) => {
    try {
        await postService.deletePost(req.params.postId);

        return res.sendStatus(204);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };    
};

export default { 
    createPost,
    getPosts,
    updatePost,
    deletePost 
};