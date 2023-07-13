import dotenv from "dotenv";
dotenv.config();

async function runSeeders(): Promise<void> {
  const userSeeders = await import("./userSeeders");
  const articleSeeders = await import("./articleSeeders");
  await userSeeders.default();
  await articleSeeders.default();
  console.log("[DB] Los datos de prueba fueron creados");
}

runSeeders();
