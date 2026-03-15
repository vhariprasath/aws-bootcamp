const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await Booking.deleteMany({});

    // Sample users
    const users = await User.insertMany([
      {
        first_name: 'Alice',
        last_name: 'Smith',
        dob: '1990-01-01',
        ph_no: '1234567890',
        email: 'alice@example.com',
        aadhar_no: '1234-5678-9012',
        address: 'Mumbai'
      }
    ]);

    // Sample hotel
    const hotel = await Hotel.create({
      hotel_name: 'Grand Palace',
      address: 'Delhi',
      timezone: 'Asia/Kolkata'
    },
      {
        hotel_name: 'Taj Palace',
        address: 'Mumbai',
        timezone: 'Asia/Kolkata'
      }
    );

    // Rooms
    const rooms = await Room.insertMany([
      {
        room_no: '101',
        room_type: 'Deluxe',
        room_size: 'King',
        price: 5000,
        is_available_from: new Date('2025-09-10'),
        is_available_to: new Date('2025-12-31'),
        hotel_id: hotel._id
      }
    ]);

    // Booking
    await Booking.create({
      user_id: users[0]._id,
      hotel_id: hotel._id,
      room_id: rooms[0]._id,
      check_in_date: new Date('2025-09-15'),
      check_out_date: new Date('2025-09-20'),
      price: 25000,
      no_of_guest: 2
    });

    console.log('Sample data inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();