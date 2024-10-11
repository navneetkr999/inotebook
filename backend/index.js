import { connectToMongo } from './db.js';
import express from 'express'; 
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import cors from 'cors';

connectToMongo();
const app = express();
const port = 4000;
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`iNotebook backend app is listening to port ${port}`);
})