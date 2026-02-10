import prisma from "../config/prisma.js";

const commentService = {
    create: async function(userId, postId, message) {
        console.log(userId, postId, message)
                return await prisma.comment.create({
                    data: {
                        authorId: userId,
                        postId,
                        message,
                    },
                });
            },

    getAll: async function() {
                return await prisma.comment.findMany();
            },

    update: async function(commentId, message) {
                return await prisma.comment.update({
                    where: { id: commentId },
                    data: { message },
                    select: {
                        id: true,
                        message: true,                                
                    },
                });
            },

    delete: async function(commentId) {
                return await prisma.comment.delete({
                    where: { id: commentId },
                });
            },    
};

export default commentService;