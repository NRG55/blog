import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import authService from './services/auth.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', routes.auth);
app.use('/posts', routes.post);
app.use('/posts/:postId/comments', routes.comment);

app.use((error, req, res, next) => {
    console.log(error);   
});

app.listen(process.env.PORT, () => 
    console.log(`Blog app listening on port ${process.env.PORT}!`),    
);