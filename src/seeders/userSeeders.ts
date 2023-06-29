import User from "../models/User";
import db from "../database/db";
import { IUser } from "../models/User";

const userSeeders = async () => {
  const user: IUser[] = [
    {
      firstname: "Author",
      lastname: "Test",
      username: "Auth01",
      email: "author@blog.com",
      avatar: "author.jpg",
      password: "1234",
      isAdmin: false,
    },
    {
      firstname: "Admin",
      lastname: "Test",
      username: "Admin01",
      email: "admin@blog.com",
      avatar: "admin.jpg",
      password: "1234",
      isAdmin: true,
    },
  ];
  await db.User.bulkCreate(user);
  console.log("[DB] Se corrieron los seeders de user");
};

export default userSeeders;
