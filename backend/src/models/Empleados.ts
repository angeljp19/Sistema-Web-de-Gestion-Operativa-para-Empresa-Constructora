import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
import Planta from "./Plantas"

class Empleado extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public cedula!: number;
  public planta_id!: number;
  public activo!: boolean;
  public fecha_creacion!: Date;
}

Empleado.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    cedula: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    planta_id: { type: DataTypes.INTEGER, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "empleados", sequelize, timestamps: false }
);


Empleado.belongsTo(Planta, { foreignKey: "planta_id", as: "planta" });

export default Empleado;
