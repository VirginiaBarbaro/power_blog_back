import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

class Admin extends Model {
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare username?: string;
  declare email: string;
  declare avatar: string;
  declare password: string;
  declare isAdmin?: boolean;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  static initModel(sequelize: Sequelize) {
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
        modelName: "admin",
      },
    );

    Admin.beforeBulkCreate(async (admins: Admin[]) => {
      for (const admin of admins) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    });

    Admin.beforeCreate(async (admin: Admin) => {
      admin.password = await bcrypt.hash(admin.password, 10);
    });

    Admin.beforeUpdate(async (admin: Admin) => {
      if (admin.changed("password")) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    });
  }
}

export default Admin;
