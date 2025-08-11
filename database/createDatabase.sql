-- ===================================================
-- Script de creación de BDD y tablas principales
-- Proyecto: Sistema de Movilidad Sostenible UIO
-- Rama: feature/bdd
-- Autores: Alvarez Victor, Brito Pablo, Paredes Bryan
-- ===================================================

-- Crear la base de datos
CREATE DATABASE MovilidadSostenibleUIO;
GO

-- Usar la base de datos
USE MovilidadSostenibleUIO;
GO

-- Tabla: Usuarios
CREATE TABLE Usuarios (
    IdUsuario UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Nombre NVARCHAR(100) NOT NULL,
    Correo NVARCHAR(100) NOT NULL UNIQUE,
    ContraseñaHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(20) NOT NULL CHECK (Rol IN ('ciudadano', 'administrador', 'promotor')),
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE()
);

-- Tabla: Rutas
CREATE TABLE Rutas (
    IdRuta UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Origen NVARCHAR(100) NOT NULL,
    Destino NVARCHAR(100) NOT NULL,
    TipoTransporte NVARCHAR(50) NOT NULL CHECK (TipoTransporte IN ('bicicleta', 'transporte público', 'peatonal', 'otro')),
    DistanciaKm DECIMAL(5,2) NOT NULL CHECK (DistanciaKm > 0)
);

-- Tabla: Viajes
CREATE TABLE Viajes (
    IdViaje UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    IdUsuario UNIQUEIDENTIFIER NOT NULL,
    IdRuta UNIQUEIDENTIFIER NOT NULL,
    FechaViaje DATE NOT NULL,
    KmRecorridos DECIMAL(5,2) NOT NULL CHECK (KmRecorridos > 0),
    CO2Evitado DECIMAL(6,2) NOT NULL CHECK (CO2Evitado >= 0),
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
    FOREIGN KEY (IdRuta) REFERENCES Rutas(IdRuta)
);

-- Tabla: Auditoría
CREATE TABLE Auditoria (
    IdAuditoria UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Entidad NVARCHAR(50) NOT NULL CHECK (Entidad IN ('Usuarios', 'Rutas', 'Viajes')),
    TipoOperacion NVARCHAR(10) NOT NULL CHECK (TipoOperacion IN ('INSERT', 'UPDATE', 'DELETE')),
    FechaOperacion DATETIME NOT NULL DEFAULT GETDATE(),
    UsuarioOperador NVARCHAR(100) NOT NULL,
    DatosAfectados NVARCHAR(MAX) NOT NULL
);

