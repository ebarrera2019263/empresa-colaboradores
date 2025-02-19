# Gestión de Empresas y Colaboradores

Este proyecto es una aplicación web que permite la gestión de empresas y colaboradores. Fue desarrollado para el departamento de recursos humanos con el objetivo de registrar y administrar los colaboradores junto con el detalle de la empresa a la que pertenecen.

## Funcionalidades

### 📌 Empresas
- Crear, leer, actualizar y eliminar (CRUD) empresas.
- Cada empresa tiene los siguientes atributos:
  - 📍 **Geografía:** País, departamento y municipio.
  - 🔢 **NIT**
  - 🏢 **Razón social**
  - 🏷 **Nombre comercial**
  - 📞 **Teléfono**
  - 📧 **Correo electrónico**
- Opción para asignar una empresa a un municipio mediante un **combobox**.

### 📌 Colaboradores
- CRUD de colaboradores, permitiendo la gestión de empleados de las empresas.
- Cada colaborador tiene los siguientes atributos:
  - 🏷 **Nombre completo**
  - 🎂 **Edad**
  - 📞 **Teléfono**
  - 📧 **Correo electrónico**
  - 🏢 **Empresa** (seleccionada desde un **combobox** con empresas disponibles).
- Modal para editar la información de los colaboradores.

### 🛠 Otras características
- **Buscador** para filtrar empresas y colaboradores en tiempo real.
- **Alertas tipo toast** para notificaciones al usuario (creación, actualización y eliminación).
- **Autenticación** para el inicio de sesión con credenciales de administrador.
- **Diseño responsivo** utilizando Tailwind CSS.
- **Flujo de mantenimientos**:
  1. Crear municipios y empresas.
  2. Registrar colaboradores asignándolos a una empresa.
  3. Editar y eliminar registros según sea necesario.

## 🔑 Credenciales de Acceso

- **Correo:** alamedagta21@gmail.com
- **Contraseña:** `Admin12345!`

## ⚙️ Tecnologías utilizadas

- **Angular**
- **Supabase (Base de datos y autenticación)**
- **Tailwind CSS**
- **TypeScript**
- **HTML & CSS**

## 📂 Estructura del Proyecto

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/usuario/repo.git
   cd repo

   npm install

   ng serve

   http://localhost:4200