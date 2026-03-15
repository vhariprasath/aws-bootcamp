import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  dob?: Date | null;
  ph_no?: string | null;
  email: string;
  aadhar_no?: string | null;
  address?: string | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public dob!: Date | null;
  public ph_no!: string | null;
  public email!: string;
  public aadhar_no!: string | null;
  public address!: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ph_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    aadhar_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

