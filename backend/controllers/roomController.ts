import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Room, RoomCreationAttributes } from '../models/Room';

const roomBodySchema = z.object({
  room_no: z.string(),
  room_type: z.string().optional(),
  room_size: z.string().optional(),
  price: z.number(),
  is_available_from: z.string().optional(), // ISO date string
  is_available_to: z.string().optional(),   // ISO date string
  hotel_id: z.number(),
});

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = roomBodySchema.parse(req.body);

    const payload: RoomCreationAttributes = {
      ...parsedBody,
      is_available_from: parsedBody.is_available_from
        ? new Date(parsedBody.is_available_from)
        : undefined,
      is_available_to: parsedBody.is_available_to
        ? new Date(parsedBody.is_available_to)
        : undefined,
    };

    const room = await Room.create(payload);
    res.status(201).json(room);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    next(err);
  }
};

