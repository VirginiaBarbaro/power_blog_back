import { Sequelize } from "sequelize";

export default function testConnection(sequelize: Sequelize) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Se estblecio la conexion");
    })
    .catch((error) => {
      console.log(error);
    });
}
