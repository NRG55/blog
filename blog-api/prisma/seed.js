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
                    'welcome-to-my-blog', 
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
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162990/blog/ddt9alkxlvc5aatex1ic.png",
            imagePublicId: "blog/ddt9alkxlvc5aatex1ic",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 5",
            slug: "post-title-5",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162976/blog/jamkenwnyejtdtn57cbm.png",
            imagePublicId: "blog/jamkenwnyejtdtn57cbm",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 4",
            slug: "post-title-4",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162943/blog/v0kkz97o1lqyan7e5ybi.png",
            imagePublicId: "blog/v0kkz97o1lqyan7e5ybi",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 3",
            slug: "post-title-3",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162929/blog/uf1djzlc5oevhwiiutdz.png",
            imagePublicId: "blog/uf1djzlc5oevhwiiutdz",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 2",
            slug: "post-title-2",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162909/blog/fj8aysktw9o9duij1dji.png",
            imagePublicId: "blog/fj8aysktw9o9duij1dji",
            published: true,
            authorId: user.id
        },
        {
            title: "Post title 1",
            slug: "post-title-1",
            body: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime tempora est eius aliquam modi error facilis et, ratione culpa soluta nisi expedita eveniet laboriosam atque distinctio nihil aut aliquid officia harum ipsa nemo similique officiis id? Doloribus cum quas sint</p>",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162891/blog/r9ko2aannwaijgqngrr5.png",
            imagePublicId: "blog/r9ko2aannwaijgqngrr5",
            published: true,
            authorId: user.id
        },
        {
            title: "Welcome to my blog",
            slug: "welcome-to-my-blog",
            body: `
                    <div>The main task of this project was to build a RESTful API and then create two separate frontend clients to interact with it.</div>
                    <br>
                    <div><strong>The public client:</strong> This is where you are right now. Here, guests can browse posts, search for posts and leave comments.</div>
                    <br>
                    <div><strong>The admin client:</strong> I built a private, secondary website for the author. This is my personal workspace designed for content creation, featuring a TinyMCE rich text editor, integrated Cloudinary images management and where I can control the publication status of my content.</div>
                    <br>
                    <div>I&rsquo;m excited to use this space to share more about my development journey, the challenges of building a dual-frontend architecture. Thanks for stopping by!</div>
                `,
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1773162862/blog/h1cgswzc3nvita1scmfb.png",
            imagePublicId: "blog/h1cgswzc3nvita1scmfb",
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