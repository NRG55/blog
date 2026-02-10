import prisma from "../config/prisma.js";

const createPost = async (authorId, { title, body }) => {
    return await prisma.post.create({
        data: {
            authorId,
            title,
            body,
            published: true
        }
    });
};

const getPosts = async () => {
    return await prisma.post.findMany();
};

const updatePost = async (postId, { title, body }) => {
    return await prisma.post.update({
        where: { id: postId },
        data: { title, body },
        select: {
            id: true,
            title: true,
            body: true        
        }
    });
};

const deletePost = async (postId) => {
    return await prisma.post.delete({
        where: { id: postId }
    });
};

export default { 
    createPost,
    getPosts,
    updatePost,
    deletePost 
};