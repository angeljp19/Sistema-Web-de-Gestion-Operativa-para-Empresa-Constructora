import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";



class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public email!: string;
  public cedula!: number;
  public password!: string;
  public activo!: boolean;
  public fecha_creacion!: Date
}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    cedula: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "usuarios", sequelize, timestamps: false }
);



export default Usuario;
