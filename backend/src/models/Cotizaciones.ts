import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

class Cotizacion extends Model {
  public id!: number;
  public cliente!: string;
  public cedula_rif!: string;
  public telefono!: string;
  public direccion!: string;
  public atencion!: string;
  public email!: string;
  public cotizacion!: string; 
  public fecha!: Date;
  public validezOferta!: string;
  public condicionPago!: string;
  public personaContacto!: string;
  public numDirecto!: string;

}

Cotizacion.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cliente: { type: DataTypes.STRING(150), allowNull: false },
    cedula_rif: { type: DataTypes.STRING(30), allowNull: false },
    telefono: { type: DataTypes.STRING(30), allowNull: false },
    direccion: { type: DataTypes.STRING(255), allowNull: true },
    atencion: { type: DataTypes.STRING(150), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true },
    cotizacion: { type: DataTypes.STRING(50), allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    validezOferta: { type: DataTypes.STRING(100), allowNull: true },
    condicionPago: { type: DataTypes.STRING(100), allowNull: true },
    personaContacto: { type: DataTypes.STRING(150), allowNull: true },
    numDirecto: { type: DataTypes.STRING(50), allowNull: true }
  },
  { tableName: "cotizaciones", sequelize, timestamps: false }
);

export default Cotizacion;