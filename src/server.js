import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import productRouter from './routes/productsRoutes.js';
import authRouts from './routes/authRouts.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());


app.use(authRouts);

app.use(productRouter );
app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
