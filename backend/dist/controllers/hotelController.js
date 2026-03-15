"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotel = exports.getAllHotels = void 0;
const zod_1 = require("zod");
const Hotel_1 = require("../models/Hotel");
const hotelBodySchema = zod_1.z.object({
    hotel_name: zod_1.z.string(),
    address: zod_1.z.string().optional(),
    timezone: zod_1.z.string().optional(),
});
const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel_1.Hotel.findAll();
        res.json(hotels);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllHotels = getAllHotels;
const createHotel = async (req, res, next) => {
    try {
        const parsedBody = hotelBodySchema.parse(req.body);
        const payload = parsedBody;
        const hotel = await Hotel_1.Hotel.create(payload);
        res.status(201).json(hotel);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.createHotel = createHotel;
