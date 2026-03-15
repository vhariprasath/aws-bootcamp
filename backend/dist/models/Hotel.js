"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Hotel extends sequelize_1.Model {
}
exports.Hotel = Hotel;
Hotel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hotel_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    timezone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'hotels',
    timestamps: false,
});
