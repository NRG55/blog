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

    getAll: async function() {
                return await prisma.post.findMany();
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
};

export default postService;