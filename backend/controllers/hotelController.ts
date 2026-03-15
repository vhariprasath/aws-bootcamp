import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Hotel, HotelCreationAttributes } from '../models/Hotel';

const hotelBodySchema = z.object({
  hotel_name: z.string(),
  address: z.string().optional(),
  timezone: z.string().optional(),
});

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (err) {
    next(err);
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = hotelBodySchema.parse(req.body);
    const payload: HotelCreationAttributes = parsedBody;
    const hotel = await Hotel.create(payload);
    res.status(201).json(hotel);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    next(err);
  }
};

