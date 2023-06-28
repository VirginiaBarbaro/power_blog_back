import { Sequelize, DataTypes, Model } from "sequelize";

interface IFavourite {
  id: number;
}

class Favourite extends Model<IFavourite> implements IFavourite {
  public id!: number;

  static initModel(sequelize: Sequelize): typeof Favourite {
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
      }
    );
    return Favourite;
  }
}

export default Favourite;
