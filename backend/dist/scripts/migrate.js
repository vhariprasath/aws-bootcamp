"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
require("../models/User");
require("../models/Hotel");
require("../models/Room");
require("../models/Booking");
async function runMigrations() {
    try {
        // Creates tables if they do not exist, and updates them to match models (non-destructive in many cases,
        // but be careful using this in production).
        await db_1.sequelize.sync({ alter: true });
        console.log('Database schema synchronized successfully.');
        process.exit(0);
    }
    catch (err) {
        console.error('Error running migrations:', err);
        process.exit(1);
    }
}
runMigrations();
