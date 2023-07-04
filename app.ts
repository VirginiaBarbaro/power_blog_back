import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { sequelize } from "./database/db";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT;

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`[Express] 🚀 Server listening on: http://localhost:${PORT}`);
});

(async () => {
  await sequelize.authenticate();
  console.log("[DB] Database connected");
})();
