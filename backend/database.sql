CREATE TABLE perfiles(
	idPerfil SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100)
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
	nombre VARCHAR(100),
	apellidoPaterno VARCHAR(100),
	apellidoMaterno VARCHAR(100),
	genero VARCHAR(50),
	fechaNacimiento DATE,
	pais VARCHAR(100),
	idEmpleado INT,
	idArea INT 
);

CREATE TABLE areas(
	idArea SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) UNIQUE
);

--Puede haber un curso para varias areas?
CREATE TABLE cursos(
	idCurso SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(200) UNIQUE,
	idArea INT
);

CREATE TABLE cursos_completados(
	idCursoCompletado SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT,
	idCurso INT,
	estado BOOLEAN
);

ALTER TABLE empleados_login ADD CONSTRAINT fk_id_perfil FOREIGN KEY (idPerfil) REFERENCES perfiles(idPerfil);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_empleado_perfil FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_area_empleado FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE cursos ADD CONSTRAINT fk_id_area_cursos FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_curso FOREIGN KEY (idCurso) REFERENCES cursos(idCurso);
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_empleado_curso FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);

INSERT INTO perfiles(nombre) VALUES ('Administrador');
INSERT INTO perfiles(nombre) VALUES ('Empleado');

INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@outlook.com', '1234', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('i@outlook.com', '32', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@gmail.com', '26', 1, true);

INSERT INTO areas(nombre) VALUES('IT');
INSERT INTO areas(nombre) VALUES('Marketing');
INSERT INTO areas(nombre) VALUES('Recursos Humanos');

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea) VALUES ('Jose', 'Sanchez', 'Gomez', 'Masculino', '2003-09-09', 'Mexico', 1, 1);

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea) VALUES ('Isabella', 'Garduño', 'Horneffer', 'Femenino', '2003-02-20', 'Colombia', 2, 2);

INSERT INTO empleados_info(
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	genero,
	fechaNacimiento,
	pais,
	idEmpleado,
	idArea) VALUES ('Jeannette', 'Arjona', 'Hernandez', 'Femenino', '2002-09-26', 'Argentina', 3, 3);

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
CREATE OR REPLACE FUNCTION sp_empleados_login(idEmpleado INT)
RETURNS TABLE(nombre VARCHAR(100), idArea INT)
AS $$
	SELECT nombre, idArea FROM empleados_info
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

/*
SELECT CURSOS COMPLETADOS
SELECT c.nombre
FROM cursos c
INNER JOIN cursos_completados cc ON c.idCurso = cc.idCurso
INNER JOIN empleados_login e ON cc.idEmpleado = e.idEmpleado
WHERE cc.estado = false AND cc.idEmpleado = 1;
*/