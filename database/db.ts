import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize, Dialect } from "sequelize";
import User from "../models/User";
import Article from "../models/Article";
import Comment from "../models/Comment";
import Favourite from "../models/Favourite";
import Category from "../models/Category";
import {} from "../types/environment";

const sequelizeOptions = {
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: false,
};

export const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  sequelizeOptions
);

/* (async () => {
  await sequelize.sync({ force: true });
  console.log("[DB] Estructura de tablas actualizada");
})(); */

User.initModel(sequelize);
Article.initModel(sequelize);
Comment.initModel(sequelize);
Favourite.initModel(sequelize);
Category.initModel(sequelize);

User.hasMany(Article, {
  onDelete: "cascade",
  hooks: true,
});
Article.belongsTo(User);

Category.hasMany(Article, {
  onDelete: "cascade",
  hooks: true,
});
Article.belongsTo(Category);

User.hasMany(Comment);
Comment.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

Article.hasMany(Favourite, {
  onDelete: "cascade",
  hooks: true,
});
Favourite.belongsTo(Article);

User.hasMany(Favourite);
Favourite.belongsTo(User);

export default { User, Article, Comment, Favourite, Category };
