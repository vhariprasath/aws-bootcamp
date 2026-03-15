"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = exports.getAllRooms = void 0;
const zod_1 = require("zod");
const Room_1 = require("../models/Room");
const roomBodySchema = zod_1.z.object({
    room_no: zod_1.z.string(),
    room_type: zod_1.z.string().optional(),
    room_size: zod_1.z.string().optional(),
    price: zod_1.z.number(),
    is_available_from: zod_1.z.string().optional(), // ISO date string
    is_available_to: zod_1.z.string().optional(), // ISO date string
    hotel_id: zod_1.z.number(),
});
const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room_1.Room.findAll();
        res.json(rooms);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllRooms = getAllRooms;
const createRoom = async (req, res, next) => {
    try {
        const parsedBody = roomBodySchema.parse(req.body);
        const payload = {
            ...parsedBody,
            is_available_from: parsedBody.is_available_from
                ? new Date(parsedBody.is_available_from)
                : undefined,
            is_available_to: parsedBody.is_available_to
                ? new Date(parsedBody.is_available_to)
                : undefined,
        };
        const room = await Room_1.Room.create(payload);
        res.status(201).json(room);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.createRoom = createRoom;
