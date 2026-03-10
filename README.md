# Blog

[Live Version](https://dmitry-blog.netlify.app) 

The task of this project was to design and implement a RESTful API with two frontend clients: public and admin. This full-stack application was built using the following tech stack:

## Frontend:
- React
- Styling: Tailwind CSS

## Backend:  
- Node.js, Express  
- Database: PostgreSQL, Prisma ORM
- Authentication: Passport.js (JWT strategy)
- Images Storage: Cloudinary
- Validation: express-validator
- Deployment: Koyeb (blog api), Netlify (two clients: public and admin), Cloudinary (images storage), Neon (postgresql database server)

## Features:
### Public client:
- Browse and search through all published posts
- Commenting system for community discussion
- Registered users can edit and delete their own comments

### Admin client:
- Full Content Management
- Publish/unpublish posts
- Comments moderation
- Cloudinary integration for images hosting
- TinyMCE editor (configured with Cloudinary to upload and delete images)

## Screenshot

![Public Client Homepage](https://res.cloudinary.com/dlc8atazj/image/upload/v1773173908/screenshot-blog-public-homepage_wxiykf.png)