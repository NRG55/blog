import prisma from "../config/prisma.js";

const commentService = {
    create: async function(userId, postId, message) {
                return await prisma.comment.create({
                    data: {
                        userId,
                        postId,
                        message,
                    },
                });
            },

    getByPostId: async function(postId, page, limit) {
                    const skip = (page - 1) * limit;

                    const [comments, totalComments] = await prisma.$transaction([
                        prisma.comment.findMany({
                            where: { postId },
                            take: limit,
                            skip: skip, 
                            orderBy: { createdAt: 'desc' },
                            include: {
                                user: {
                                    select: {
                                        username: true
                                    }
                                }
            }
                        }),

                        prisma.comment.count({
                            where: { postId }
                        })
                    ]);

                    return {
                        comments, 
                        totalComments
                    };
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