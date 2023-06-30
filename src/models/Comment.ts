import { Sequelize, DataTypes, Model } from "sequelize";

class Comment extends Model {
  declare id: number;
  declare content: string;

  static initModel(sequelize: Sequelize) {
    Comment.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "comment",
      },
    );
  }
}

export default Comment;
