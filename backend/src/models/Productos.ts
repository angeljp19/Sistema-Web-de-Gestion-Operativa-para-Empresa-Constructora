import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";



class Producto extends Model {
  public id!: number;
  public nombre!: string;
}

Producto.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false },

    },
  { tableName: "productos", sequelize, timestamps: false }
);



export default Producto;
