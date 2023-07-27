import dotenv from "dotenv";
dotenv.config();
import db from "../database/db";

const categorySeeders = async () => {
  const categories = [
    {
      name: "Finance",
    },
    {
      name: "Fashion",
    },
    {
      name: "Gaming",
    },
    {
      name: "Tech",
    },
    {
      name: "Nature",
    },
  ];
  await db.Category.bulkCreate(categories);
  console.log("[DB] Se corrieron los seeders de categories");
};

export default categorySeeders;
