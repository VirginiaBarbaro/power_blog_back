import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();
const app: Express = express();
const PORT = process.env.APP_PORT;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`[Express] 🚀 Server listening on: http://localhost:${PORT}`);
});
