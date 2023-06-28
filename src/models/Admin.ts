import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

interface IAdmin {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  password: string;
  isAdmin: boolean;
}

class Admin extends Model<IAdmin> implements IAdmin {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public avatar!: string;
  public password!: string;
  public isAdmin!: boolean;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrype.compare(password, this.password);
  }

  static initModel(sequelize: Sequelize): typeof Admin {
    Admin.init(
      {},
      {
        sequelize,
        modelName: "Admin",
      }
    );
    return Admin;
  }
}
