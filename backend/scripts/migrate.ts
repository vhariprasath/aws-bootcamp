import { sequelize } from '../config/db';
import '../models/User';
import '../models/Hotel';
import '../models/Room';
import '../models/Booking';

async function runMigrations() {
  try {
    // Creates tables if they do not exist, and updates them to match models (non-destructive in many cases,
    // but be careful using this in production).
    await sequelize.sync({ alter: true });
    console.log('Database schema synchronized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error running migrations:', err);
    process.exit(1);
  }
}

runMigrations();

