import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit";

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


const app = express()
const corsOptions = {
  origin: process.env.URL_ORIGIN , 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos"
})

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json())

app.use("/usuarios",usuarioRouter)
app.use("/empleados",empleadoRouter)
app.use("/plantas",plantaRouter)
app.use("/login",authRoute)
app.use("/escaneo", escaneoEmpleado)
app.use("/productos", productosRoutes)
app.use("/cotizacion", cotizacionRoutes)


sequelize.sync({alter: true })
  .then(() => console.log("Modelos sincronizados"))
  .catch(console.error);
  const port = process.env.PORT;
app.listen(port)