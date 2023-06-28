import { Sequelize, DataTypes, Model } from "sequelize";

interface IComment {
  id: number;
  content: string;
}

class Comment extends Model<IComment> implements IComment {
  public id!: number;
  public content!: string;

  static initModel(sequelize: Sequelize): typeof Comment {
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
        modelName: "Comment",
      }
    );
    return Comment;
  }
}

export default Comment;
