import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import prisma from './config/prisma.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => res.send('Hello!'));

await prisma.user.create({
    data: {
        username: "User1",
        password: "test",        
    }
});

await prisma.post.create({
    data: {
        title: "News",
        body: "blabla",
        published: true,
        authorId: "cf13b475-6bf4-4eb9-9d9e-d5f6900a0a39"        
    }
});

await prisma.comment.create({
    data: {
        message: "first",
        authorId: "cf13b475-6bf4-4eb9-9d9e-d5f6900a0a39", 
        postId: "2d0a4ca8-181d-4ab6-ae43-77df2e9db078"              
    }
});

app.listen(process.env.PORT, () => 
    console.log(`Blog app listening on port ${process.env.PORT}!`),    
);