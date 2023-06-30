import dotenv from "dotenv";
dotenv.config();

async function runSeeders(): Promise<void> {
  const userSeeders = await import("./userSeeders");
  const adminSeeders = await import("./adminSeeders");
  await adminSeeders.default();
  await userSeeders.default();
  console.log("[DB] Los datos de prueba fueron creados");
}

runSeeders();
