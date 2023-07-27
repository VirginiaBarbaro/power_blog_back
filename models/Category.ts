import { DataTypes, Model, Sequelize } from "sequelize";

class Category extends Model {
  declare id: number;
  declare name: string;

  static initModel(sequelize: Sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "category",
      }
    );
  }
}

export default Category;
