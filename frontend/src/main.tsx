import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ThemeInit } from "../.flowbite-react/init";

import { LoginPage } from "./pages/loginPage.tsx";
import { MainPanel } from "./pages/mainPanel.tsx";
import { EmpleadosPage } from "./pages/empleadosPage.tsx";
import { EscaneoEmpleadoPage } from "./pages/escanearEmpleadoPage.tsx";
import { EntradaSalidadEmpleadosPage } from "./pages/entradaSalidaEmpleadospage.tsx";
import { GestionProductosPage } from "./pages/gestionProductosPage.tsx";
import { CotizacionMaterialesPage } from "./pages/cotizacionMateralesPage.tsx";
import { CotizacionConcretoPage } from "./pages/cotizacionConcretoPage.tsx";
import { UsuariosPage } from "./pages/usuariosPage.tsx";

import { ProtectedRoute } from "./components/protectedRoute.tsx";

import { LayoutPage } from "./LayoutPage.tsx";
import { LayoutLogin } from "./LayoutLogin.tsx";

import RecuperarContraseñaPage from "./pages/recuperarContraseñaPage.tsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LayoutLogin />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "recuperarContrasena",
        element: <RecuperarContraseñaPage />,
      },
    ],
  },

  {
    path: "/cuyuniApp",
    element: <LayoutPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "mainPanel",
            element: <MainPanel />,
          },
          {
            path: "empleados",
            element: <EmpleadosPage />,
          },
          {
            path: "escaneo",
            element: <EscaneoEmpleadoPage />,
          },
          {
            path: "entradasalida",
            element: <EntradaSalidadEmpleadosPage />,
          },
          {
            path: "gestionProductos",
            element: <GestionProductosPage />,
          },
          {
            path: "cotizacionMateriales",
            element: <CotizacionMaterialesPage />,
          },
          {
            path: "cotizacionConcreto",
            element: <CotizacionConcretoPage />,
          },
          {
            path: "usuarios",
            element: <UsuariosPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeInit />
    <RouterProvider router={router}></RouterProvider>
  </>,
);
