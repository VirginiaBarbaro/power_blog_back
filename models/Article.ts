import { DataTypes, Model, Sequelize } from "sequelize";

class Article extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare image: string;

  static initModel(sequelize: Sequelize) {
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
        headline: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT("medium"),
          allowNull: false,
        },
        image: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "article",
      }
    );
  }
}

export default Article;
