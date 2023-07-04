import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize, Dialect } from "sequelize";
import User from "../models/User";
import Article from "../models/Article";
import Comment from "../models/Comment";
import Favourite from "../models/Favourite";
import Admin from "../models/Admin";
import {} from "../types/environment";

const sequelizeOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  logging: false,
};

export const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  sequelizeOptions,
);

/* (async () => {
  await sequelize.sync({ force: true });
  console.log("[DB] Estructura de tablas actualizada");
})(); */

User.initModel(sequelize);
Article.initModel(sequelize);
Comment.initModel(sequelize);
Favourite.initModel(sequelize);
Admin.initModel(sequelize);

User.hasMany(Article, {
  onDelete: "cascade",
  hooks: true,
});
Article.belongsTo(User);

Admin.hasMany(Article, {
  onDelete: "cascade",
  hooks: true,
});
Article.belongsTo(Admin);

Article.hasMany(Comment);
Comment.belongsTo(Article);

Article.hasMany(Favourite, {
  onDelete: "cascade",
  hooks: true,
});
Favourite.belongsTo(Article);

User.hasMany(Favourite);
Favourite.belongsTo(User);

Admin.hasMany(Favourite);
Favourite.belongsTo(Admin);

export default { User, Article, Comment, Favourite, Admin };
