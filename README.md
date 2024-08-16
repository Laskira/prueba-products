## E-commerce Payment

Este proyecto es un sistema de para pagos de productos en una plataforma de e-commerce. Está construido con Next.js para el frontend y NestJS para el backend, ambos con TypeScript. El objetivo principal es implementar un flujo de compra en el que los usuarios puedan seleccionar un producto, completar su información de pago, y recibir un resumen y el estado final de la transacción.

El proyecto utiliza una API para procesar pagos con tarjeta de crédito. Además, el sistema es responsable de gestionar el stock del producto, asignar productos comprados a los clientes, y mantener la seguridad y la integridad de las transacciones realizadas.

## Configuración y Despliegue

- Instalación de Dependencias:
  ` npm install`

- Ejecución:
  ` npm run dev`

- Ejecución de pruebas
  `npm run test`

### Puertos ejecutados

[http://localhost:3000](http://localhost:3000)

## PostgreSQL Script:

CREATE DATABASE payments
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    description varchar(150) NOT NULL,
    stock int NOT NULL,
    price double precision NOT NULL,
    image varchar(500)
);

CREATE TABLE Status (
id SERIAL PRIMARY KEY,
description varchar(50) NOT NULL
);

CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    statusId int REFERENCES Status(id) NOT NULL
);

-- Datos de prueba

INSERT INTO Status (description) VALUES
('success'),
('failed'),
('pending');

INSERT INTO Products (description, stock, price, image) VALUES
('Arroz Blanco 1kg', 100, 5000, ''),
('Frijoles Rojos 500g', 50, 4500, ''),
('Aceite Vegetal 1L', 75, 12000, ''),
('Azúcar 1kg', 80, 4500, ''),
('Sal 1kg', 90, 1500, ''),
('Harina de Trigo 1kg', 60, 4000, ''),
('Leche Entera 1L', 100, 3500, ''),
('Pan Integral 500g', 40, 6000, ''),
('Café Molido 250g', 70, 14000, ''),
('Atún en Lata 150g', 120, 9000, ''),
('Galletas de Chocolate 200g', 50, 7000, ''),
('Detergente en Polvo 1kg', 30, 12000, ''),
('Papel Higiénico 4 Rollos', 100, 8000, ''),
('Jabón de Baño 125g', 150, 3000, ''),
('Pasta de Dientes 75ml', 80, 6000, '');

