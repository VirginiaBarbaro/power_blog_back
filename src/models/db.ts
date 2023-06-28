import { Sequelize } from "sequelize";
import Admin from "./Admin";

const sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USERNAME,
  //   process.env.DB_PASSWORD

  "power_blog_db",
  "root",
  "root",

  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

Admin.initModel(sequelize);

export default { sequelize, Admin };
