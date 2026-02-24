import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./database";
import Empleado from "./Empleados";

interface HoraEscaneoAttributes {
  id: number;
  empleado_id: number;
  fechaHora?: Date;
  motivo: string;
}

interface HoraEscaneoCreationAttributes extends Optional<HoraEscaneoAttributes, "id"> {}

class HoraEscaneoEmpleados extends Model<HoraEscaneoAttributes, HoraEscaneoCreationAttributes>
  implements HoraEscaneoAttributes {
  public id!: number;
  public empleado_id!: number;
  public fechaHora!: Date;
  public motivo!: string;
}

HoraEscaneoEmpleados.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    empleado_id: { type: DataTypes.INTEGER, allowNull: false },
    fechaHora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    motivo: { type: DataTypes.STRING(10), allowNull: false },
  },
  {
    tableName: "horaEscaneoEmpleados",
    sequelize,
    timestamps: false,
  }
);

HoraEscaneoEmpleados.belongsTo(Empleado, { foreignKey: "empleado_id" });
Empleado.hasMany(HoraEscaneoEmpleados, { foreignKey: "empleado_id" });

export default HoraEscaneoEmpleados;
