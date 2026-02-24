import { Sequelize } from "sequelize";
import {DATABASE_URL} from "../env"


export const sequelize = new Sequelize(DATABASE_URL!, {
  dialect: "postgres",
  ssl: true,
  set: "pg",
  logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection()
