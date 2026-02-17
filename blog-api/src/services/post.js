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

    getPosts: async function(page = 1) {                
                const limit = 5;

                const featuredPost = await prisma.post.findFirst({
                    orderBy: { createdAt: 'desc' },
                });

                // skip featuredPost for a page pagination (5 posts from 2 to 6, 6 to 11, ...  )
                const skip = 1 + (page - 1) * limit;

                const posts = await prisma.post.findMany({
                    take: limit,
                    skip: skip, 
                    orderBy: { createdAt: 'desc' },
                });

                const totalPosts = await prisma.post.count();

                return { 
                    featuredPost, 
                    posts, 
                    totalPosts: totalPosts - 1 // minus featuredPost - total available for "Load more" button
                };
            },

    getBySlug: async function(slug) {
                return await prisma.post.findUnique( {
                    where: { slug }
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