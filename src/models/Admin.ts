import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

interface IAdmin {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  isAdmin: boolean;
}

class Admin extends Model<IAdmin> implements IAdmin {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public avatar!: string;
  public password!: string;
  public isAdmin!: boolean;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  static initModel(sequelize: Sequelize): typeof Admin {
    Admin.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
          // allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "Admin",
      }
    );

    Admin.beforeBulkCreate(async (admins: Admin[]) => {
      for (const admin of admins) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    });

    Admin.beforeCreate(async (admin: Admin) => {
      admin.password = await bcrypt.hash(admin.password, 10);
    });
    return Admin;
  }
}

export default Admin;
