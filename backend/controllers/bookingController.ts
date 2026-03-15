import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Booking, BookingCreationAttributes } from '../models/Booking';

const bookingBodySchema = z.object({
  user_id: z.number(),
  hotel_id: z.number(),
  room_id: z.number(),
  booking_date: z.string().optional(), // ISO date string
  check_in_date: z.string(),
  check_out_date: z.string(),
  price: z.number(),
  no_of_guest: z.number().int().positive(),
});

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = bookingBodySchema.parse(req.body);

    const bookingPayload: BookingCreationAttributes = {
      ...parsedBody,
      booking_date: parsedBody.booking_date ? new Date(parsedBody.booking_date) : undefined,
      check_in_date: new Date(parsedBody.check_in_date),
      check_out_date: new Date(parsedBody.check_out_date),
    };

    const booking = await Booking.create(bookingPayload);
    res.status(201).json(booking);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    next(err);
  }
};

