"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByPhone = exports.createUser = exports.getAllUsers = void 0;
const zod_1 = require("zod");
const User_1 = require("../models/User");
const userBodySchema = zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    dob: zod_1.z.string().optional(), // expect ISO date string
    ph_no: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    aadhar_no: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.User.findAll();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res, next) => {
    try {
        const parsedBody = userBodySchema.parse(req.body);
        const payload = {
            ...parsedBody,
            dob: parsedBody.dob ? new Date(parsedBody.dob) : undefined,
        };
        const user = await User_1.User.create(payload);
        res.status(201).json(user);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.createUser = createUser;
const updateUserByPhone = async (req, res, next) => {
    try {
        const parsedBody = userBodySchema.partial().parse(req.body);
        const payload = {
            ...parsedBody,
            dob: parsedBody.dob ? new Date(parsedBody.dob) : undefined,
        };
        const user = await User_1.User.findOne({ where: { ph_no: req.params.ph_no } });
        if (!user) {
            res.status(404).json({ message: 'User not found with that phone number' });
            return;
        }
        await user.update(payload);
        res.json(user);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.updateUserByPhone = updateUserByPhone;
