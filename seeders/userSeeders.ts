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
      avatar: ["/foto_linkedin.jpg"],
      password: "1234",
      isAdmin: false,
      bio: "Adventurous soul exploring life's wonders, seeking joy in every moment. Nature lover and dream chaser",
    },
    {
      firstname: "Admin",
      lastname: "Test",
      username: "SuperUser",
      email: "admin@blog.com",
      avatar: ["/foto_linkedin.jpg"],
      password: "1234",
      isAdmin: true,
      bio: "Passionate coder, weaving lines of logic, shaping digital dreams, and embracing endless innovation with fervor",
    },
  ];
  await db.User.bulkCreate(users);
  console.log("[DB] Se corrieron los seeders de user");
};

export default userSeeders;
