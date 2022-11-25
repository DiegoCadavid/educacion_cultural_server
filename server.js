import express from "express";
import dotenv from 'dotenv';
dotenv.config();

// Middlewares
import connectDb from "./mongodb/connectDb.js";
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from "express-fileupload";

// rutas
import locationRoute from "./routes/locationRoute.js";
import schoolRouter from "./routes/schoolRoute.js";
import benefitRoute from "./routes/benefitRoute.js";
import personRoute from './routes/PersonRoute.js';

const main = async () => {
  const app = express();
  const port = process.env.PORT;
  await connectDb();

  // middlewares
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(fileUpload());

  // rutas  
  app.use('/location', locationRoute );
  app.use('/school', schoolRouter  );
  app.use('/benefit', benefitRoute  );
  app.use('/Person', personRoute);


  app.listen(port, () => {
    console.log(`Servidor iniciado`);
  });
};

main();
