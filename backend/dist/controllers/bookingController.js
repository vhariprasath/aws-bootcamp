"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = exports.getAllBookings = void 0;
const zod_1 = require("zod");
const Booking_1 = require("../models/Booking");
const bookingBodySchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    hotel_id: zod_1.z.number(),
    room_id: zod_1.z.number(),
    booking_date: zod_1.z.string().optional(), // ISO date string
    check_in_date: zod_1.z.string(),
    check_out_date: zod_1.z.string(),
    price: zod_1.z.number(),
    no_of_guest: zod_1.z.number().int().positive(),
});
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking_1.Booking.findAll();
        res.json(bookings);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBookings = getAllBookings;
const createBooking = async (req, res, next) => {
    try {
        const parsedBody = bookingBodySchema.parse(req.body);
        const bookingPayload = {
            ...parsedBody,
            booking_date: parsedBody.booking_date ? new Date(parsedBody.booking_date) : undefined,
            check_in_date: new Date(parsedBody.check_in_date),
            check_out_date: new Date(parsedBody.check_out_date),
        };
        const booking = await Booking_1.Booking.create(bookingPayload);
        res.status(201).json(booking);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.createBooking = createBooking;
