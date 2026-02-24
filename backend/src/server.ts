import express from "express"
import cors from "cors"
import { sequelize } from "./models/database";
import "./models/Usuario";
import "./models/Plantas"
import "./models/Empleados"
import "./models/HoraEscaneoEmpleados"

import usuarioRouter from "./routes/usuarios"
import plantaRouter from "./routes/plantas"
import empleadoRouter from "./routes/empleados"
import authRoute from "./routes/auth"
import escaneoEmpleado from "./routes/escaneoEmpleado"
import productosRoutes from "./routes/productos"
import cotizacionRoutes from "./routes/cotizacion"

import { PORT, URL_ORIGIN } from "./env";

const app = express()
const corsOptions = {
  origin: URL_ORIGIN, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json())

app.use("/usuarios",usuarioRouter)
app.use("/empleados",empleadoRouter)
app.use("/plantas",plantaRouter)
app.use("/login",authRoute)
app.use("/escaneo", escaneoEmpleado)
app.use("/productos", productosRoutes)
app.use("/cotizacion", cotizacionRoutes)


sequelize.sync()
  .then(() => console.log("Modelos sincronizados"))
  .catch(console.error);
  const port = PORT || 3000;
app.listen(port)