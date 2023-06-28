import { Sequelize } from "sequelize";
import User from "./User";
import Article from "./Article";
import Comment from "./Comment";
import Favourite from "./Favourite";
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

User.initModel(sequelize);
Article.initModel(sequelize);
Comment.initModel(sequelize);
Favourite.initModel(sequelize);
Admin.initModel(sequelize);

export default { sequelize, User, Article, Comment, Favourite, Admin };
