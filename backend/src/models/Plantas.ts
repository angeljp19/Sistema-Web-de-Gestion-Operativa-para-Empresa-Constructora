import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";




class Planta extends Model {
  public id!: number;
  public nombre!: string;
  public ubicacion!: string;

}

Planta.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    ubicacion: { type: DataTypes.STRING(200), allowNull: false },
    },
  { tableName: "plantas", sequelize, timestamps: false }
);



export default Planta;
