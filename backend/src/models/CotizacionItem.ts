import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

class CotizacionItem extends Model {
  public id!: number;
  public cotizacion_id!: number;
  public producto!: string;
  public unidad!: string;
  public cantidad!: number;
  public precio!: number;
  public resistencia!: string;
}

CotizacionItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cotizacion_id: { type: DataTypes.INTEGER, allowNull: false },
    producto: { type: DataTypes.STRING(150), allowNull: false },
    unidad: { type: DataTypes.STRING(30), allowNull: false },
    cantidad: { type: DataTypes.DECIMAL(12, 3), allowNull: false },
    precio: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    resistencia: { type: DataTypes.STRING(50), allowNull: true }, 
  },
  { tableName: "cotizacion_item", sequelize, timestamps: false }
);

export default CotizacionItem;