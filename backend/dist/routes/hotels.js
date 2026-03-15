"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../controllers/hotelController");
const router = (0, express_1.Router)();
router.get('/', hotelController_1.getAllHotels);
router.post('/', hotelController_1.createHotel);
exports.default = router;
