import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', authRoutes);

app.use('/', publicRoutes);

app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);   
});

app.listen(process.env.PORT, () => 
    console.log(`Blog app listening on port ${process.env.PORT}!`),    
);