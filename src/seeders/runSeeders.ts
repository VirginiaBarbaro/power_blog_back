import dotenv from "dotenv";
dotenv.config();

async function runSeeders(): Promise<void> {
  const userSeeders = await import("./userSeeders");
  await userSeeders.default();
  console.log("[DB] Los datos de prueba fueron creados");
}

runSeeders();
