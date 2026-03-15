"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const users_1 = __importDefault(require("./routes/users"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const bookings_1 = __importDefault(require("./routes/bookings"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect DB
(0, db_1.connectDB)();
// Health check
app.get('/health', (req, res) => {
    res.send('Hello from Express');
});
// Routes
app.use('/api/users', users_1.default);
app.use('/api/hotels', hotels_1.default);
app.use('/api/rooms', rooms_1.default);
app.use('/api/bookings', bookings_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Error handler
app.use((err, req, res, _next) => {
    console.error(err.stack);
    const status = 500;
    res.status(status).json({ error: err.message });
});
