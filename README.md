# Prueba German Andrés Gamboa - Desarrollador

# Billetera Virtual

## Contenido

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Ejecución](#ejecución)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Base de datos](#basededatos)
8. [Colección Postman](#colección-postman)
9. [Video de Explicación](#video-de-explicación)

## Descripción del proyecto

Este proyecto es una aplicación web simulando una billetera virtual. El backend utiliza **Node.js**, **Express** y el ORM **Sequelize**, el frontend está desarrollado con **React** y **Next.js**, y la base de datos está gestionada con **MySQL**. El proyecto está dockerizado para facilitar el despliegue en diferentes entornos. El objetivo principal de la aplicación es simular algunas funcionalidades de una billetera virtual desde crear cuenta, depositar y pagar una compra.


## Características

- Registro de cliente
- Simulación de login
- Consulta de saldo
- Depósito de dinero
- Lista de productos para simular compra
- Pagar compra (crea una transacción con estado pendiente y envía codigo al correo electrónico)
- Confirmar compra (valida código digitado y id de sesión)


## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/andresg0412/prueba-billetera-virtual.git
   ```

> [!NOTE]
> Se clonará el proyecto completo el cual consta de una carpeta /backend, /frontend, .docker-compose.yml


2. Navega al directorio del backend e instala las dependencias:

   ```bash
   cd backend
   npm install
   ```

3. Navega al directorio del frontend e instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```

> [!NOTE]
> Los anteriores pasos 2 y 3 no son necesarios para ejecutar el proyecto con Docker, solo si lo deseas ejecutar de manera local


## Configuración para ejecutar en local

1. Crea una base de datos con los siguientes parametros ó creala con la información que desees y luego modifica el archivo `.env` con los datos de tu base de datos local, este archivo se encuentra en la carpeta del backend:

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_NAME=billetera_virtual
   DB_PORT=3306
   ```

> [!IMPORTANT]
> Para ejecutar el proyecto en entorno local necesitaras este archivo .env
> Pero para ejecutarlo en docker no, ya que se comunicará automáticamente a una base de datos de prueba en AWS


## Ejecución

### Desarrollo (local)

1. Crear tablas en base de datos

   ```bash
   cd backend
   node sync.js
   ```


2. Iniciar el backend:

   ```bash
   cd backend
   npm start
   ```

2. Iniciar el frontend:

   ```bash
   cd frontend
   npm run dev
   ```


### Docker

> [!NOTE]
> Asegurate de tener docker instalado

1. Construir y levantar los servicios con Docker:

   ```bash
   docker-compose up --build
   ```

2. El frontend estará disponible en `http://localhost:3000` y el backend en `http://localhost:5002/api`.



## Tecnologías Utilizadas

| Área              | Tecnologías                    |
| ----------------- | ------------------------------ |
| **Backend**       | Node.js, Express, Sequelize    |
| **Frontend**      | React, Next, Javascript, Axios |
| **Base de datos** | MySQL (AWS)                    |
| **Contenedores**  | Doker, docker-compose          |


# Base de datos



# Colección Postman

Puedes importarlo en Postman o Insomnia para hacer llamados a la API.



# Video de Explicación