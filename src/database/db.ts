import { Sequelize } from "sequelize";
import User from "../models/User";
import Article from "../models/Article";
import Comment from "../models/Comment";
import Favourite from "../models/Favourite";
import Admin from "../models/Admin";

export const sequelize = new Sequelize(
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
  },
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
