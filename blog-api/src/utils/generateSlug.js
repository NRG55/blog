import slugify from 'slugify';
import prisma from '../config/prisma.js';

const generateSlug = async (title) => {
    const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: 'vi',
    });

    let currentSlug = slug;
    let count = 1;
    let slugExist = true;

    while (slugExist) {
        const postSlug = await prisma.post.findUnique({
                where: { slug: currentSlug },                
            });

        if (postSlug) {
            currentSlug = `${slug}-${count}`;
            count++;

        } else {
            slugExist = false;
        };          
    };

    return currentSlug;
};

export default generateSlug;