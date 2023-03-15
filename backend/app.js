import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectdb } from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS Policy
app.use(cors());

//Database connection
connectdb(DATABASE_URL);

//JSON
app.use(express.json());
app.use('/api/user',userRoutes);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
