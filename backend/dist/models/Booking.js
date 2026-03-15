"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Booking extends sequelize_1.Model {
}
exports.Booking = Booking;
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    booking_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    check_in_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    check_out_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    no_of_guest: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'bookings',
    timestamps: false,
});
