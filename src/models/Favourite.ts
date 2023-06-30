import { Sequelize, DataTypes, Model } from "sequelize";

class Favourite extends Model {
  declare id: number;

  static initModel(sequelize: Sequelize) {
    Favourite.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "Favourite",
      },
    );
    return Favourite;
  }
}

export default Favourite;
