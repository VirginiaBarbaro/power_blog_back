import { Dialect } from "sequelize";

// Le indico a TS que este es un modulo independiente y no tiene exportacion especifica
export {};

declare global {
  namespace NodeJS {
    interface processEnv {
      APP_PORT: number;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DIALECT: string;
      JWT_KEY: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
