import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => res.send('Hello!'));

app.listen(process.env.PORT, () => 
    console.log(`Blog app listening on port ${process.env.PORT}!`),    
);