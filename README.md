# Sistema Web de Gestión Operativa para Empresa Constructora

Aplicación web responsive para **cotizaciones** (materiales de construcción y concreto) y **control de asistencia** en plantas mediante **QR**.


---

## Problema

La empresa generaba cotizaciones directamente en Excel, lo que provocaba:
- **Baja rapidez** para cotizar (flujo manual).
- **Baja disponibilidad**: el personal administrativo trabajaba principalmente desde **teléfonos móviles**.
- **Ausencia de trazabilidad**: no existía un registro centralizado de **entradas/salidas** de empleados en plantas.

---

## Solución

Se desarrolló un sistema con arquitectura **cliente-servidor en 3 capas** (UI → API → DB) que:
- Digitaliza el catálogo de materiales para cotización.
- Genera cotizaciones de materiales y concreto desde una interfaz responsive.
- Exporta cotizaciones a **Excel**.
- Controla asistencia por **QR** (generación, escaneo, registro y consulta con filtros).

---

## Funcionalidades principales

### Cotizaciones
- Registro de **materiales** disponibles para venta (solo catálogo).
- Cotizaciones de **materiales de construcción**.
- Cotizaciones de **concreto**.
- Exportación de cotizaciones a **Excel**.

### Personas y accesos
- **Gestión de usuarios** (personas con acceso a la aplicación).
- Autenticación con **JWT**.

### Operación en plantas (asistencia)
- **Gestión de empleados**.
- Registro de **plantas** y asignación de empleados a planta.
- Generación de **QR único por empleado**.
- **Escaneo de QR** para registrar **entrada/salida**.
- Visualización de registros de entrada/salida con **filtros**.

---

## Stack técnico

### Frontend
- React
- TypeScript
- TailwindCSS

### Backend
- Node.js
- Express (TypeScript)
- Sequelize (ORM)
- Validación por schemas (Joi)

### Base de datos
- PostgreSQL (Neon como servicio en la nube)

### Seguridad
- JWT para autenticación
- Hash de contraseñas con bcrypt
- Validación de datos por schemas

---
