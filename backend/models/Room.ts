import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface RoomAttributes {
  id: number;
  room_no: string;
  room_type?: string | null;
  room_size?: string | null;
  price: number;
  is_available_from?: Date | null;
  is_available_to?: Date | null;
  hotel_id: number;
}

export type RoomCreationAttributes = Optional<RoomAttributes, 'id'>;

export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  public id!: number;
  public room_no!: string;
  public room_type!: string | null;
  public room_size!: string | null;
  public price!: number;
  public is_available_from!: Date | null;
  public is_available_to!: Date | null;
  public hotel_id!: number;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    room_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_available_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_available_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rooms',
    timestamps: false,
  }
);

