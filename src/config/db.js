import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

// export const connectMyDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("successfully connected to database!");
//     await sequelize.sync(); // Synchronize model with database
//   } catch (err) {
//     console.error("Error connecting to database", err.message);
//   }
// };
