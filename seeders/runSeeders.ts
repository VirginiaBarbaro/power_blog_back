import dotenv from "dotenv";
dotenv.config();

async function runSeeders(): Promise<void> {
  const userSeeders = await import("./userSeeders");
  const categorySeeders = await import("./categorySeeders");
  const articleSeeders = await import("./articleSeeders");
  await userSeeders.default();
  await categorySeeders.default();
  await articleSeeders.default();
  console.log("[DB] Los datos de prueba fueron creados");
}

runSeeders();
