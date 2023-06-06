CREATE TABLE perfiles (
	idPerfil SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE empleados_login (
	idEmpleado SERIAL NOT NULL PRIMARY KEY,
	correo VARCHAR(255) NOT NULL UNIQUE,
	contraseña VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL,
	idPerfil INT NOT NULL
);

--Puede haber un empleado en varias areas?
CREATE TABLE empleados_info (
	idEmpleadoInfo SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	apellidoPaterno VARCHAR(100) NOT NULL,
	apellidoMaterno VARCHAR(100),
	genero VARCHAR(50) NOT NULL,
	fechaNacimiento DATE NOT NULL,
	pais VARCHAR(100) NOT NULL,
	idEmpleado INT NOT NULL,
	idArea INT NOT NULL,
	fotoPerfil VARCHAR(255),
	fechaInicio DATE NOT NULL,
	fechaGraduacion DATE,
	idJefe INT 
);

CREATE TABLE areas (
	idArea SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE areas_interes (
	idAreaInteres SERIAL NOT NULL PRIMARY KEY,
	idArea INT NOT NULL,
	idEmpleado INT NOT NULL
);

CREATE TABLE rotaciones (
	idRotacion SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
	idArea INT NOT NULL,
	fechaInicio DATE NOT NULL,
	fechaFin DATE
);

--Puede haber un curso para varias areas?
CREATE TABLE cursos (
	idCurso SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(200) NOT NULL UNIQUE,
	idArea INT NOT NULL,
	img TEXT
);

CREATE TABLE cursos_completados (
	idCursoCompletado SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
	idCurso INT NOT NULL,
	estado BOOLEAN NOT NULL
);

CREATE TABLE empleados_juego (
	idEmpleadoJuego SERIAL NOT NULL PRIMARY KEY,
	puntajeAlto INT NOT NULL,
	monedas INT NOT NULL,
	idEmpleado INT NOT NULL UNIQUE
);

CREATE TABLE avatars (
	idAvatar SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE empleados_avatars (
	idEmpleadoAvatar SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
  idAvatar INT NOT NULL UNIQUE
);

ALTER TABLE empleados_login ADD CONSTRAINT fk_id_perfil FOREIGN KEY (idPerfil) REFERENCES perfiles(idPerfil);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_empleado_perfil FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_area_empleado FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_empleado_jefe FOREIGN KEY (idJefe) REFERENCES empleados_login(idEmpleado);
ALTER TABLE cursos ADD CONSTRAINT fk_id_area_cursos FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_curso FOREIGN KEY (idCurso) REFERENCES cursos(idCurso);
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_empleado_curso FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE rotaciones ADD CONSTRAINT fk_id_empleado_rotacion FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE rotaciones ADD CONSTRAINT fk_id_area_rotacion FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE areas_interes ADD CONSTRAINT fk_id_area_areainteres FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE areas_interes ADD CONSTRAINT fk_id_empleado_areainteres FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE empleados_juego ADD CONSTRAINT fk_id_empleado_juego FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE empleados_avatars ADD CONSTRAINT fk_id_empleado_avatars FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE empleados_avatars ADD CONSTRAINT fk_id_avatar_avatars FOREIGN KEY (idAvatar) REFERENCES avatars(idAvatar);

INSERT INTO empleados_juego(cursosCompletados, puntajeAlto,	idEmpleado) VALUES (1, 0, '1');
INSERT INTO empleados_juego(cursosCompletados, puntajeAlto,	idEmpleado) VALUES (1, 0, '2');
INSERT INTO empleados_juego(cursosCompletados, puntajeAlto,	idEmpleado) VALUES (0, 0, '3');

INSERT INTO avatars(nombre) VALUES ('Avatar 1');
INSERT INTO avatars(nombre) VALUES ('Avatar 2');
INSERT INTO avatars(nombre) VALUES ('Avatar 3');

--Stored Procedures empleados_login
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_login_insert(correo VARCHAR(255), contraseña VARCHAR(255), estado BOOLEAN, idPerfil INT)
AS $$
	INSERT INTO empleados_login(correo, contraseña, estado, idPerfil) VALUES ($1, $2, $3, $4);
$$ LANGUAGE SQL;

--Update
CREATE OR REPLACE PROCEDURE sp_empleados_login_update(contraseña VARCHAR(255), idEmpleado INT)
AS $$
	UPDATE empleados_login SET contraseña = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Delete
CREATE OR REPLACE PROCEDURE sp_empleados_login_delete(idEmpleado INT)
AS $$
	DELETE FROM empleados_login
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

--Select
CREATE OR REPLACE FUNCTION sp_empleados_login(correo VARCHAR(255))
RETURNS TABLE(idEmpleado INT, contraseña VARCHAR(255))
AS $$
	SELECT idEmpleado, contraseña FROM empleados_login
	WHERE correo = $1
$$ LANGUAGE SQL;

--Stored Procedures empleados_info
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_info_insert(
	nombre VARCHAR(100), 
	apellidoPaterno VARCHAR(100), 
	apellidoMaterno VARCHAR(100), 
	genero VARCHAR(50), 
	fechaNacimiento DATE, 
	pais VARCHAR(100), 
	idArea INT, 
	idEmpleado INT)
AS $$
	INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idArea,
	idEmpleado,
	fechainicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now());
$$ LANGUAGE SQL;

--Update
CREATE OR REPLACE PROCEDURE sp_empleados_login_update(idArea INT, idEmpleado INT)
AS $$
	UPDATE empleados_info SET idArea = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Delete
CREATE OR REPLACE PROCEDURE sp_empleados_login_delete(idEmpleado INT)
AS $$
	DELETE FROM empleados_info
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

--Stored Procedures empleados_juego
--Update cursosCompletados
CREATE OR REPLACE PROCEDURE sp_empleados_juego_update_cursos(cursosCompletados INT, idEmpleado INT)
AS $$
	UPDATE empleados_juego SET cursosCompletados = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Update puntajeAlto
CREATE OR REPLACE PROCEDURE sp_empleados_juego_update_puntaje(puntajeAlto INT, idEmpleado INT)
AS $$
	UPDATE empleados_juego SET puntajeAlto = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Stored Procedures empleados_avatar
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_avatars_insert(idEmpleado INT, idAvatar INT)
AS $$
	INSERT INTO empleados_avatars(idEmpleado, idAvatar)
	VALUES ($1, $2);
$$ LANGUAGE SQL;

CREATE VIEW info_empleados_individual AS
SELECT ei.idempleado, ei.nombre, ei.apellidopaterno, ei.apellidomaterno, ei.genero, 
		ei.fechainicio, ei.fechagraduacion, ej.nombre AS nombre_jefe, ej.apellidopaterno AS apellido_jefe,
		a.nombre AS area
FROM empleados_info ei
JOIN empleados_info ej ON ei.idjefe = ej.idempleado
JOIN areas a ON ei.idarea = a.idarea;

--Select
CREATE OR REPLACE FUNCTION fun_empleados_perfil(idEmpleado INT)
RETURNS JSON
AS $$
  SELECT json_build_object(
	'nombre', nombre, 'apellidoPaterno', apellidopaterno, 'apellidoMaterno', apellidomaterno, 'genero', genero,
	'fechaInicio', fechainicio, 'fechaGraduacion', fechagraduacion, 'nombreJefe', nombre_jefe, 'apellidoJefe', apellido_jefe,
	'area', area) 
  FROM info_empleados_individual
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION fun_cursos(idEmpleado INT)
RETURNS JSON
AS $$
    SELECT json_agg(json_build_object('nombre', c.nombre, 'imagenURL', img ,'estado', estado))
    FROM cursos_completados cc
    INNER JOIN cursos c ON cc.idCurso = c.idCurso
    WHERE cc.idEmpleado = $1;
$$ LANGUAGE SQL;

--Función empleados_juego
CREATE OR REPLACE FUNCTION fun_empleados_juego(idEmpleado INT)
RETURNS JSON
AS $$
	SELECT json_build_object('cursos', cursosCompletados, 'puntaje', puntajeAlto)
  FROM empleados_juego
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

--Función empleados_juego
CREATE OR REPLACE FUNCTION fun_empleados_juego(idEmpleado INT)
RETURNS JSON
AS $$
	SELECT json_build_object('monedas', monedas, 'puntaje', puntajeAlto)
  FROM empleados_juego
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION fun_empleado_id(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idEmpleado', idEmpleado) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION fun_empleado_perfil(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idPerfil', idPerfil) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE sp_delete_empleado(idEmpleado INT)
AS $$
	DELETE FROM empleados_login
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE sp_insert_empleado(
	correo VARCHAR(255),
	contraseña VARCHAR(255),
	idPerfil INT)
AS $$
	INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) 
	VALUES ($1, $2, $3, true);
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE sp_insert_info_empleado(
	nombre VARCHAR(100), apellidoPaterno VARCHAR(100), apellidoMaterno VARCHAR(100), 
	genero VARCHAR(50), fechaNacimiento DATE, pais VARCHAR(100), idArea INT, 
	idEmpleado INT)
AS $$
	INSERT INTO empleados_info(nombre, apellidoPaterno, 
				apellidoMaterno, genero, fechaNacimiento, pais, idArea, 
				idEmpleado, fechainicio)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8, now());
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE sp_update_empleados_info(
	nombre VARCHAR(100), apellidoPaterno VARCHAR(100), apellidoMaterno VARCHAR(100), 
	genero VARCHAR(50), fechaNacimiento DATE, pais VARCHAR(100), idArea INT, 
	idEmpleado INT)
AS $$
	UPDATE empleados_info
	SET nombre = $1, apellidoPaterno = $2, apellidoMaterno = $3, genero = $4, 
		fechaNacimiento = $5, pais = $6, idArea = $7
	WHERE idEmpleado = $8;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION trg_insert_cursos_completados()
RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO cursos_completados (idEmpleado, idCurso, estado)
    SELECT NEW.idEmpleado, c.idCurso, FALSE
    FROM cursos c
    WHERE c.idArea = NEW.idArea;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_cursos_completados_trigger
AFTER INSERT ON empleados_info
FOR EACH ROW
EXECUTE FUNCTION trg_insert_cursos_completados();

CREATE OR REPLACE FUNCTION trg_insert_nuevos_cursos()
RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO cursos_completados (idEmpleado, idCurso, estado)
    SELECT ei.idEmpleado, NEW.idCurso, FALSE
    FROM empleados_info ei
    WHERE ei.idArea = NEW.idArea;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_nuevos_cursos_trigger
AFTER INSERT ON cursos
FOR EACH ROW
EXECUTE FUNCTION trg_insert_nuevos_cursos();

CREATE OR REPLACE FUNCTION trg_insert_empleados_juego()
RETURNS TRIGGER
AS $$
BEGIN
	INSERT INTO empleados_juego (idEmpleado, puntajeAlto, monedas)
	SELECT NEW.idEmpleado, 0, 0;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_empleados_juego_trigger
AFTER INSERT ON empleados_login
FOR EACH ROW
EXECUTE FUNCTION trg_insert_empleados_juego();

CREATE OR REPLACE FUNCTION trg_monedas()
RETURNS TRIGGER
AS $$
BEGIN
	UPDATE empleados_juego
	SET monedas = monedas + 1
	WHERE idEmpleado = NEW.idEmpleado;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER monedas_trigger
AFTER UPDATE ON cursos_completados
FOR EACH ROW
EXECUTE FUNCTION trg_monedas();

INSERT INTO perfiles(nombre) VALUES ('Administrador');
INSERT INTO perfiles(nombre) VALUES ('Empleado');

INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@outlook.com', '1234', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('i@outlook.com', '32', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@gmail.com', '26', 1, true);

INSERT INTO areas(nombre) VALUES('Recursos Humanos');
INSERT INTO areas(nombre) VALUES('Mantenimiento');
INSERT INTO areas(nombre) VALUES('Operaciones');
INSERT INTO areas(nombre) VALUES('Supply Chain');
INSERT INTO areas(nombre) VALUES('Ingeniería y Proyectos');
INSERT INTO areas(nombre) VALUES('Medio Ambiente');
INSERT INTO areas(nombre) VALUES('Seguridad');
INSERT INTO areas(nombre) VALUES('Comercial');
INSERT INTO areas(nombre) VALUES('Administración y Finanzas');
INSERT INTO areas(nombre) VALUES('Auditoria y Legal');
INSERT INTO areas(nombre) VALUES('Comunicaciones');

--Hacer otro perfil para jefes en dónde vean unicamente el rendimiento de los empleados que tienen a cargo

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea,
	fechaInicio,
	idJefe) VALUES ('Jose', 'Sanchez', 'Gomez', 'Masculino', '2003-09-09', 'Mexico', 1, 1, '2022-09-20', 3);

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea,
	fechaInicio,
	fechaGraduacion,
	idJefe) VALUES ('Isabella', 'Garduño', 'Horneffer', 'Femenino', '2003-02-20', 'Colombia', 2, 2, '2021-08-30', '2023-01-15', 3);

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea,
	fotoPerfil,
	fechaInicio,
	fechaGraduacion) VALUES ('Jeannette', 'Arjona', 'Hernandez', 'Femenino', '2002-09-26', 'Argentina', 3, 3, 'https://i.pinimg.com/originals/0f/6a/9e/0f6a9e1a1a4b5b6b0b0b0b0b0b0b0b0b.jpg', '2019-04-19', '2021-02-4');

INSERT INTO cursos(nombre, idArea) VALUES('Ciberseguridad 101', 1);
INSERT INTO cursos(nombre, idArea) VALUES('Bases de datos en SQL Server', 1);
INSERT INTO cursos(nombre, idArea) VALUES('Diseño digital', 2);
INSERT INTO cursos(nombre, idArea) VALUES('Técnicas de Marketing', 2);
INSERT INTO cursos(nombre, idArea) VALUES('¿Cómo lidiar con personas díficiles?', 3);

INSERT INTO cursos_completados(idEmpleado, idCurso, estado) VALUES(1, 1, FALSE);
INSERT INTO cursos_completados(idEmpleado, idCurso, estado) VALUES(1, 2, TRUE);
INSERT INTO cursos_completados(idEmpleado, idCurso, estado) VALUES(2, 3, TRUE);
INSERT INTO cursos_completados(idEmpleado, idCurso, estado) VALUES(2, 4, FALSE);

INSERT INTO avatars(nombre) VALUES ('Avatar 1');
INSERT INTO avatars(nombre) VALUES ('Avatar 2');
INSERT INTO avatars(nombre) VALUES ('Avatar 3');