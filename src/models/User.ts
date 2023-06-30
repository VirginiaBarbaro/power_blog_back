import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

// export interface IUser {
//   id?: number;
//   firstname: string;
//   lastname: string;
//   username?: string;
//   email: string;
//   avatar: string;
//   password: string;
//   isAdmin: boolean;
// }

class User extends Model {
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare username: string;
  declare email: string;
  declare avatar: string;
  declare password: string;
  declare isAdmin: boolean;

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  static initModel(sequelize: Sequelize) {
    User.init(
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
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "User",
      },
    );

    User.beforeBulkCreate(async (users: User[]) => {
      for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });

    User.beforeCreate(async (user: User) => {
      user.password = await bcrypt.hash(user.password, 10);
    });
    return User;
  }
}

export default User;
