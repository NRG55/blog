import prisma from "../config/prisma.js";
import generateSlug from "../utils/generateSlug.js";

const postService = {
    create: async function(authorId, { title, body }) {
                const slug = await generateSlug(title);

                return await prisma.post.create({
                    data: {
                        authorId,
                        slug,
                        title,
                        body,
                        published: true,
                    },
                });
            },

    getAll: async function(page, limit) {                
                const skip = (page - 1) * limit;

                const posts = await prisma.post.findMany({
                    take: limit,
                    skip: skip, 
                    orderBy: { createdAt: 'desc' },
                    include: {
                        author: {
                            select: { username: true }
                        },
                        _count: {
                            select: { comments: true }
                        }
                    },
                });

                const totalPosts = await prisma.post.count();

                return { posts, totalPosts };
            },

    getBySlug: async function(slug) {
                return await prisma.post.findUnique( {
                    where: { slug },
                    include: {
                        author: {
                            select: { username: true }
                        },
                        _count: {
                            select: { comments: true }
                        }
                    }
                });
            },

    update: async function(postId, { title, body }) {
                return await prisma.post.update({
                    where: { id: postId },
                    data: { title, body },
                    select: {
                        id: true,
                        title: true,
                        body: true,        
                    },
                });
            },

    delete: async function(postId) {
                return await prisma.post.delete({
                    where: { id: postId },
                });
            },

    publish: async function(postId) {
                return await prisma.post.update({
                    where: { id: postId },
                    data: { published: true },
                });
            },
            
    unpublish: async function(postId) {
                return await prisma.post.update({
                    where: { id: postId },
                    data: { published: false },
                });
            },

    search: async function(query) {
                const searchTerm = query.query; 
                const page = parseInt(query.page) || 1;
                const limit = parseInt(query.limit) || 5;
                const skip = (page - 1) * limit;

                const [posts, totalPosts] = await Promise.all([
                    prisma.post.findMany({
                        where: {
                            OR: [
                                { title: { contains: searchTerm, mode: 'insensitive' } },
                                { body: { contains: searchTerm, mode: 'insensitive' } }
                            ]
                        },
                        take: limit,
                        skip: skip,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            author: {
                                select: { username: true }
                            },
                            _count: {
                                select: { comments: true }                            
                            },                        
                        },
                    }),
                    prisma.post.count({
                        where: {
                            OR: [
                                { title: { contains: searchTerm, mode: 'insensitive' } },
                                { body: { contains: searchTerm, mode: 'insensitive' } }
                            ]
                        }
                    })
                ]);

                return { posts: [...posts], totalPosts }
            },
};

export default postService;