import dotenv from "dotenv";
dotenv.config();
import db from "../database/db";

const userSeeders = async () => {
  const users = [
    {
      firstname: "Author",
      lastname: "Test",
      username: "Auth01",
      email: "author@blog.com",
      avatar: "/foto_linkedin.jpg",
      password: "1234",
      isAdmin: false,
    },
    {
      firstname: "Admin",
      lastname: "Test",
      username: "SuperUser",
      email: "admin@blog.com",
      avatar: "/foto_linkedin.jpg",
      password: "1234",
      isAdmin: true,
    },
  ];
  await db.User.bulkCreate(users);
  console.log("[DB] Se corrieron los seeders de user");
};

export default userSeeders;
