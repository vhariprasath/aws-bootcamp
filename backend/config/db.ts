import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: (process.env.DB_DIALECT as any) || "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // OK for RDS/managed PG
      },
    },
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    console.log(
      "Connecting to RDS database...",
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD
    );
    await sequelize.authenticate();
    console.log("RDS database connected via Sequelize");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};
