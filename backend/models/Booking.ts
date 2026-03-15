import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface BookingAttributes {
  id: number;
  user_id: number;
  hotel_id: number;
  room_id: number;
  booking_date?: Date | null;
  check_in_date: Date;
  check_out_date: Date;
  price: number;
  no_of_guest: number;
}

export type BookingCreationAttributes = Optional<BookingAttributes, 'id' | 'booking_date'>;

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public user_id!: number;
  public hotel_id!: number;
  public room_id!: number;
  public booking_date!: Date | null;
  public check_in_date!: Date;
  public check_out_date!: Date;
  public price!: number;
  public no_of_guest!: number;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    no_of_guest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
  }
);

