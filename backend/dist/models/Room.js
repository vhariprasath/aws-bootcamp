"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Room extends sequelize_1.Model {
}
exports.Room = Room;
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    room_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    room_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    room_size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    is_available_from: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    is_available_to: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    hotel_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'rooms',
    timestamps: false,
});
