import postService from '../services/post.js';

const getPosts = async (req, res) => {
    return res.send('get posts');
};

const createPost = async (req, res) => {
    const post = await postService.createPost();

    res.status(201).json({ message: 'Post successfully created', post });
};

export default { getPosts, createPost };