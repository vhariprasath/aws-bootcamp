import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface HotelAttributes {
  id: number;
  hotel_name: string;
  address?: string | null;
  timezone?: string | null;
}

export type HotelCreationAttributes = Optional<HotelAttributes, 'id'>;

export class Hotel extends Model<HotelAttributes, HotelCreationAttributes> implements HotelAttributes {
  public id!: number;
  public hotel_name!: string;
  public address!: string | null;
  public timezone!: string | null;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'hotels',
    timestamps: false,
  }
);

