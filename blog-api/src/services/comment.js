import prisma from "../config/prisma.js";

const commentService = {
    create: async function(userId, postId, message) {
                return await prisma.comment.create({
                    data: {
                        userId,
                        postId,
                        message,                        
                    },
                    include: {
                        user: {
                            select: {                                        
                                username: true,
                                id: true
                            }
                        }
                    }
                });
            },
        
    getAll: async function(page, limit, postId = null) {                
                const skip = (page - 1) * limit;                
                const where = postId ? { postId: postId } : {};

                const [comments, totalComments] = await Promise.all([
                    prisma.comment.findMany({
                        where,
                        take: limit,
                        skip: skip, 
                        orderBy: { createdAt: 'desc' },
                        include: {
                            user: { select: { username: true } },
                            post: { select: { title: true } }
                        },
                    }),
                    prisma.comment.count({ where })
                ]);

                return { comments, totalComments };
            },

    getById: async function(commentId) {
                return await prisma.comment.findUnique({
                    where: { id: commentId },
                    include: {
                        user: { select: { username: true } },
                        post: { select: { title: true } }
                    }
                });
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