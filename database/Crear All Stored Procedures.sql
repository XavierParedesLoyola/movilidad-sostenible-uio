
-- ===================================================
-- Script de creación de Stored Procedures
-- Proyecto: Sistema de Movilidad Sostenible UIO
-- Rama: feature/bdd
-- Autores: Alvarez Victor, Brito Pablo, Paredes Bryan
-- Recomendación: Ejecutar uno por uno
-- ===================================================


--SP PARA CREAR RUTA------------------------------------------------------------

CREATE PROCEDURE SP_CREAR_RUTA
  @IdRuta UNIQUEIDENTIFIER,
  @Origen NVARCHAR(100),
  @Destino NVARCHAR(100),
  @TipoTransporte NVARCHAR(50),
  @DistanciaKm DECIMAL(5, 2)
AS
BEGIN
  INSERT INTO Rutas (IdRuta, Origen, Destino, TipoTransporte, DistanciaKm)
  VALUES (@IdRuta, @Origen, @Destino, @TipoTransporte, @DistanciaKm);
END;

--SP CREAR USUARIO---------------------------------------------------------------

CREATE PROCEDURE SP_CREAR_USUARIO
  @IdUsuario UNIQUEIDENTIFIER,
  @Nombre NVARCHAR(100),
  @Correo NVARCHAR(100),
  @ContraseñaHash NVARCHAR(255),
  @Rol NVARCHAR(20)
AS
BEGIN
  INSERT INTO Usuarios (IdUsuario, Nombre, Correo, ContraseñaHash, Rol, FechaRegistro)
  VALUES (@IdUsuario, @Nombre, @Correo, @ContraseñaHash, @Rol, GETDATE());
END;

--OBTENER USUARIO POR CORREO---------------------------------------------------

CREATE PROCEDURE SP_OBTENER_USUARIO_POR_CORREO
  @Correo NVARCHAR(100)
AS
BEGIN
  SELECT * FROM Usuarios WHERE Correo = @Correo;
END;

--OBTENER TODAS LAS RUTAS---------------------------------------------

CREATE PROCEDURE SP_OBTENER_TODAS_LAS_RUTAS
AS
BEGIN
  SELECT * FROM Rutas;
END;

--REGISTRAR VIAJE---------------------------------------------


CREATE PROCEDURE SP_REGISTRAR_VIAJE
  @IdViaje UNIQUEIDENTIFIER,
  @IdUsuario UNIQUEIDENTIFIER,
  @IdRuta UNIQUEIDENTIFIER,
  @FechaViaje DATE,
  @KmRecorridos DECIMAL(5, 2),
  @CO2Evitado DECIMAL(6, 2)
AS
BEGIN
  INSERT INTO Viajes (IdViaje, IdUsuario, IdRuta, FechaViaje, KmRecorridos, CO2Evitado)
  VALUES (@IdViaje, @IdUsuario, @IdRuta, @FechaViaje, @KmRecorridos, @CO2Evitado);
END;

--OBTENER VIAJES POR USUARIO---------------------------------------------


CREATE PROCEDURE SP_OBTENER_VIAJES_POR_USUARIO
  @IdUsuario UNIQUEIDENTIFIER
AS
BEGIN
  SELECT * FROM Viajes WHERE IdUsuario = @IdUsuario;
END;
