import { DataTypes, Model, Sequelize } from "sequelize";

interface IArticle {
  id: number;
  title: string;
  content: string;
  image: string;
}

class Article extends Model<IArticle> implements IArticle {
  public id!: number;
  public title!: string;
  public content!: string;
  public image!: string;

  static initModel(sequelize: Sequelize): typeof Article {
    Article.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          // allowNull: false
        },
      },
      {
        sequelize,
        modelName: "Article",
      }
    );
    return Article;
  }
}

export default Article;
