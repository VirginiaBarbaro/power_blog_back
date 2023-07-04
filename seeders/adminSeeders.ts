import db from "../database/db";

const adminSeeders = async () => {
  const admins = [
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
  await db.Admin.bulkCreate(admins);
  console.log("[DB] Se corrieron los seeders de admin");
};

export default adminSeeders;
