import db from "./models/db";

async function createDbTables() {
  await db.sequelize.sync({ force: true });
  console.log("[Database] Tables created");
}

createDbTables();
