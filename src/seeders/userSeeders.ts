import db from "../database/db";

const userSeeders = async () => {
  const users = [
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
  await db.User.bulkCreate(users);
  console.log("[DB] Se corrieron los seeders de user");
};

export default userSeeders;
