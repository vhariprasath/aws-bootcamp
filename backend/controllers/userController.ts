import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { User, UserCreationAttributes } from '../models/User';

const userBodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  dob: z.string().optional(), // expect ISO date string
  ph_no: z.string().optional(),
  email: z.string().email(),
  aadhar_no: z.string().optional(),
  address: z.string().optional(),
});

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = userBodySchema.parse(req.body);

    const payload: UserCreationAttributes = {
      ...parsedBody,
      dob: parsedBody.dob ? new Date(parsedBody.dob) : undefined,
    };

    const user = await User.create(payload);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    next(err);
  }
};

export const updateUserByPhone = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = userBodySchema.partial().parse(req.body);

    const payload: Partial<UserCreationAttributes> = {
      ...parsedBody,
      dob: parsedBody.dob ? new Date(parsedBody.dob) : undefined,
    };

    const user = await User.findOne({ where: { ph_no: req.params.ph_no } });

    if (!user) {
      res.status(404).json({ message: 'User not found with that phone number' });
      return;
    }

    await user.update(payload);
    res.json(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: err.errors });
      return;
    }
    next(err);
  }
};

