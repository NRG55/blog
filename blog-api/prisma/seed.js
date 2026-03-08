import prisma from '../src/config/prisma.js';

async function main() {
    const user = await prisma.user.findFirst();
    
    if (!user) {
        throw new Error('No user found');
    };

    await prisma.post.deleteMany({
        where: { 
            slug: { in: 
                [
                    'featured-post', 
                    'post-title-1',
                    'post-title-2', 
                    'post-title-3',
                    'post-title-4', 
                    'post-title-5', 
                    'post-title-6'
                ]
            }
        }
    });

    const demoPosts = [        
        {
            title: "Post title 6",
            slug: "post-title-6",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 5",
            slug: "post-title-5",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 4",
            slug: "post-title-4",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 3",
            slug: "post-title-3",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 2",
            slug: "post-title-2",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 1",
            slug: "post-title-1",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        },
        {
            title: "Featured post",
            slug: "featured-post",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://cloudinary.com",
            published: true,
            authorId: user.id
        }
    ];

    for (const post of demoPosts) {
        await prisma.post.create({ data: post });        
    };

    console.log('Posts are created');
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });