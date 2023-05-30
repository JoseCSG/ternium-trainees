CREATE TABLE perfiles(
	idPerfil SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE empleados_login(
	idEmpleado SERIAL NOT NULL PRIMARY KEY,
	correo VARCHAR(255) NOT NULL UNIQUE,
	contraseña VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL,
	idPerfil INT
);

--Puede haber un empleado en varias areas?
CREATE TABLE empleados_info(
	idEmpleadoInfo SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	apellidoPaterno VARCHAR(100) NOT NULL,
	apellidoMaterno VARCHAR(100) NOT NULL,
	genero VARCHAR(50) NOT NULL,
	fechaNacimiento DATE NOT NULL,
	pais VARCHAR(100) NOT NULL,
	idEmpleado INT NOT NULL UNIQUE,
	idArea INT NOT NULL UNIQUE,
	fotoPerfil VARCHAR(255),
	fechaInicio DATE NOT NULL,
	fechaGraduacion DATE,
	idJefe INT 
);

CREATE TABLE areas(
	idArea SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE areas_interes(
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
CREATE TABLE cursos(
	idCurso SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(200) NOT NULL UNIQUE,
	idArea INT NOT NULL,
	img TEXT
);

CREATE TABLE cursos_completados(
	idCursoCompletado SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
	idCurso INT NOT NULL, 
	estado BOOLEAN NOT NULL 
);

CREATE TABLE datos_juego(
	
)


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

--Stored Procedures empleados_login
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_login_insert(correo VARCHAR(255), contraseña VARCHAR(255), estado BOOLEAN,idPerfil INT)
AS $$
	INSERT INTO empleados_login(correo, contraseña, estado, idPerfil) VALUES ($1, $2, $3, $4);
$$ LANGUAGE SQL;

--Update
CREATE OR REPLACE PROCEDURE sp_empleados_login_update(contraseña VARCHAR(255), empleadoId INT)
AS $$
	UPDATE empleados_login SET contraseña = $1
	WHERE empleadoId = $2;
$$ LANGUAGE SQL;

--Delete
CREATE OR REPLACE PROCEDURE sp_empleados_login_delete(empleadoId INT)
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
	idEmpleado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
$$ LANGUAGE SQL;

--Update
CREATE OR REPLACE PROCEDURE sp_empleados_login_update(idArea INT, empleadoId INT)
AS $$
	UPDATE empleados_info SET idArea = $1
	WHERE empleadoId = $2;
$$ LANGUAGE SQL;

--Delete
CREATE OR REPLACE PROCEDURE sp_empleados_login_delete(empleadoId INT)
AS $$
	DELETE FROM empleados_info
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

--Select
CREATE OR REPLACE FUNCTION fun_empleados_login(idEmpleado INT)
RETURNS JSON
AS $$
  SELECT json_build_object('nombre', nombre, 'idArea', idArea) 
  FROM empleados_info
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION fun_cursos(idEmpleado INT)
RETURNS JSON
AS $$
	SELECT json_build_object('nombre', c.nombre, 'Finalizado', estado)
	FROM cursos_completados cc
	INNER JOIN cursos c ON cc.idcurso = c.idcurso
	WHERE cc.idempleado = $1;
$$ LANGUAGE SQL;
/*
SELECT c.nombre
FROM cursos c
INNER JOIN cursos_completados cc ON c.idCurso = cc.idCurso
INNER JOIN empleados_login e ON cc.idEmpleado = e.idEmpleado
WHERE cc.estado = false AND cc.idEmpleado = 1;
*/