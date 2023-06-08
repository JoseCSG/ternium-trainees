-- Crear las llaves foráneas
ALTER TABLE empleados_login ADD CONSTRAINT fk_id_perfil FOREIGN KEY (idPerfil) REFERENCES perfiles(idPerfil);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_empleado_perfil FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_area_empleado FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE empleados_info ADD CONSTRAINT fk_id_empleado_jefe FOREIGN KEY (idJefe) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE cursos ADD CONSTRAINT fk_id_area_cursos FOREIGN KEY (idArea) REFERENCES areas(idArea) ON DELETE CASCADE;
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_curso FOREIGN KEY (idCurso) REFERENCES cursos(idCurso);
ALTER TABLE cursos_completados ADD CONSTRAINT fk_id_empleado_curso FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE rotaciones ADD CONSTRAINT fk_id_empleado_rotacion FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado);
ALTER TABLE rotaciones ADD CONSTRAINT fk_id_area_rotacion FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE areas_interes ADD CONSTRAINT fk_id_area_areainteres FOREIGN KEY (idArea) REFERENCES areas(idArea);
ALTER TABLE areas_interes ADD CONSTRAINT fk_id_empleado_areainteres FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_juego ADD CONSTRAINT fk_id_empleado_juego FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_avatars ADD CONSTRAINT fk_id_empleado_avatars FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_avatars ADD CONSTRAINT fk_id_avatar_avatars FOREIGN KEY (idAvatar) REFERENCES avatars(idAvatar);
ALTER TABLE remuneraciones ADD CONSTRAINT fk_id_empleado_renumeracion FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELEte CASCADE;

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
	idEmpleado INT,
	fechaFinal DATE,
	idJefe INT)
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
	fechainicio,
	fechagraduacion,
	idjefe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), $9, $10);
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

--Muestra los empleados con su información
CREATE VIEW info_empleados_individual AS
SELECT ei.idempleado, ei.nombre, ei.apellidopaterno, ei.apellidomaterno, ei.genero, 
		ei.fechainicio, ei.fechagraduacion, ej.nombre AS nombre_jefe, ej.apellidopaterno AS apellido_jefe,
		a.nombre AS area
FROM empleados_info ei
JOIN empleados_info ej ON ei.idjefe = ej.idempleado
JOIN areas a ON ei.idarea = a.idarea;

--Stored Procedures Areas
--Select
CREATE OR REPLACE FUNCTION fun_areas()
RETURNS JSON
AS $$
    SELECT json_agg(json_build_object('nombre', nombre, 'idArea', idArea))
	FROM areas; 
$$ LANGUAGE SQL;

--Stored Procedures empleados perfil
-- Select
CREATE OR REPLACE FUNCTION fun_empleados_perfil(idEmpleado INT)
RETURNS JSON
AS $$
  SELECT json_build_object(
	'nombre', e.nombre, 'apellidoPaterno', e.apellidopaterno, 'apellidoMaterno', e.apellidomaterno, 'genero', e.genero, 'fotoPerfil', e.fotoPerfil,
	'fechaInicio', e.fechainicio, 'fechaGraduacion', e.fechagraduacion,'area', ar.nombre, 'correo', el.correo, 'jefe', jefe.nombre,
  	'sueldo', r.sueldo, 'PTU', r.ptu, 'fondoAhorro', r.fondoAhorro) 
  FROM empleados_info AS e
  INNER JOIN areas AS ar ON e.idArea = ar.idArea
  INNER JOIN empleados_login AS el ON e.idempleadoinfo = el.idempleado
  INNER JOIN remuneraciones AS r ON el.idempleado = r.idempleado
  INNER JOIN empleados_info AS jefe ON e.idJefe = jefe.idEmpleadoInfo
  WHERE e.idEmpleado = $1;
$$ LANGUAGE SQL;

--Stored Procedures cursos
--Select
CREATE OR REPLACE FUNCTION fun_cursos(idEmpleado INT)
RETURNS JSON
AS $$
    SELECT json_agg(json_build_object('nombre', c.nombre, 'imagenURL', img ,'estado', estado))
    FROM cursos_completados cc
    INNER JOIN cursos c ON cc.idCurso = c.idCurso
    WHERE cc.idEmpleado = $1;
$$ LANGUAGE SQL;

--Stored Procedures empleados_juego
--Select monedas
CREATE OR REPLACE FUNCTION fun_empleados_juego(idEmpleado INT)
RETURNS JSON
AS $$
  SELECT json_build_object('monedas', monedas, 'puntaje', puntajeAlto)
  FROM empleados_juego
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

--Función avatars
CREATE OR REPLACE FUNCTION fun_empleados_avatars(idEmpleado INT)
RETURNS JSON
AS $$
	SELECT json_agg(json_build_object('idavatar', idAvatar))
  FROM empleados_avatars
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

--Stored Procedures empleados id
--Select id (id del empleado)
CREATE OR REPLACE FUNCTION fun_empleado_id(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idEmpleado', idEmpleado) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

--Stored Procedures empleados login
--Select perfil (administrador o empleado)
CREATE OR REPLACE FUNCTION fun_empleado_perfil(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idPerfil', idPerfil) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

--Delete empleado
CREATE OR REPLACE PROCEDURE sp_delete_empleado(idEmpleado INT)
AS $$
	DELETE FROM empleados_login
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

--Insertar empleado
CREATE OR REPLACE PROCEDURE sp_insert_empleado(
	correo VARCHAR(255),
	contraseña VARCHAR(255),
	idPerfil INT)
AS $$
	INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) 
	VALUES ($1, $2, $3, true);
$$ LANGUAGE SQL;

--Insertar empleado con su información
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

--Trigger rotaciones
CREATE OR REPLACE FUNCTION trg_crear_rotaciones()
RETURNS TRIGGER
AS $$
BEGIN
	IF NEW.idArea <> OLD.idArea THEN
		INSERT INTO rotaciones (idEmpleado, idArea, fechaInicio)
		VALUES (NEW.idEmpleado, NEW.idArea, now());
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rotaciones_trigger_iniciar
AFTER UPDATE ON empleados_info
FOR EACH ROW
EXECUTE FUNCTION trg_iniciar_rotaciones();

CREATE OR REPLACE FUNCTION trg_terminar_rotaciones()
RETURNS TRIGGER
AS $$
BEGIN
	IF NEW.idArea <> OLD.idArea THEN
		UPDATE rotaciones 
		SET fechafin = now()		
		WHERE idArea = OLD.idArea;
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rotaciones_trigger_terminar
AFTER UPDATE ON empleados_info
FOR EACH ROW
EXECUTE FUNCTION trg_terminar_rotaciones();


-- Insertar datos
INSERT INTO perfiles(nombre) VALUES ('Administrador');
INSERT INTO perfiles(nombre) VALUES ('Empleado');

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

INSERT INTO avatars(nombre) VALUES ('Avatar 1');
INSERT INTO avatars(nombre) VALUES ('Avatar 2');
INSERT INTO avatars(nombre) VALUES ('Avatar 3');

INSERT INTO cursos(nombre, idarea) VALUES ('Como lidear con las personas', 1);
INSERT INTO cursos(nombre, idarea) VALUES ('¿Qué cosas necesitan mantenimiento?', 2);
INSERT INTO cursos(nombre, idarea) VALUES ('Top 5 operaciones de la empresa', 3);
INSERT INTO cursos(nombre, idarea) VALUES ('¿Qué es supply chain', 4);
INSERT INTO cursos(nombre, idarea) VALUES ('Proyectos actuales', 5);
INSERT INTO cursos(nombre, idarea, img) VALUES ('¿Cómo proteger el medio ambiente?', 6, 'https://cdn0.ecologiaverde.com/es/posts/4/7/6/que_es_el_medio_ambiente_definicion_y_resumen_1674_orig.jpg');
INSERT INTO cursos(nombre, idarea, img) VALUES ('La importancia de los árboles', 6, 'https://www.henkel.es/resource/image/1084248/16x9/1920/1080/7a7530443937d70f83dbb22c6423158c/F34BFB3EAF33429AAFA08601DD0B63E2/2020-06-05-d%C3%ADa-mundial-del-medio-ambiente-jpg.webp');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Factores importantes', 6, 'https://cdn0.ecologiaverde.com/es/posts/9/8/7/como_cuidar_el_medio_ambiente_3789_orig.jpg');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Diversidad en riesgo', 6, 'https://www.bbva.com/wp-content/uploads/2019/06/A-0406-DiaMedioAmbiente-BBVA.jpg');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Intro a React', 7, 'https://sigdeletras.com/images/blog/202004_react_leaflet/react.png');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Intro a SQL', 7, 'https://techkrowd.com/wp-content/uploads/2022/12/banner_bbdd_3.png');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Ciberseguridad', 7, 'https://thelogisticsworld.com/wp-content/uploads/2023/01/ilustracion-de-seguridad-cibernetica.jpg');
INSERT INTO cursos(nombre, idarea, img) VALUES ('Cookies', 7, 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/02/cookies-internet.jpg');
INSERT INTO cursos(nombre, idarea, img) VALUES ('¿Cómo proteger tu información?', 7, 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/5-tendencias-van-cambiar-ciberseguridad-2020-1858639.jpg?tf=3840x');
INSERT INTO cursos(nombre, idarea) VALUES ('Importancia del área comercial', 8);
INSERT INTO cursos(nombre, idarea) VALUES ('Estátistica', 9);
INSERT INTO cursos(nombre, idarea) VALUES ('Leyes Mexicanas', 10);
INSERT INTO cursos(nombre, idarea) VALUES ('Diferentes maneras de comunicarte', 11);

INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@outlook.com', '1234', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('i@outlook.com', '32', 2, true);
INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ('j@gmail.com', '26', 1, true);

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
	fechaGraduacion,
	idJefe) VALUES ('Jose', 'Sanchez', 'Gomez', 'Masculino', '2003-09-09', 'Mexico', 1, 7, 'https://i.pinimg.com/originals/a2/a2/2f/a2a22fc7eda2da304c5345ed25fad6d8.jpg','2022-09-20','2023-09-20', 3);

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
	fechaGraduacion,
	idJefe) VALUES ('Isabella', 'Garduño', 'Horneffer', 'Femenino', '2003-02-20', 'Colombia', 2, 6, 'https://pbs.twimg.com/media/EEeRD-tVAAEV8b9.jpg','2021-08-30', '2023-01-15', 3);

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
	fechaGraduacion) VALUES ('Jeannette', 'Arjona', 'Hernandez', 'Femenino', '2002-09-26', 'Argentina', 3, 1, 'https://depor.com/resizer/B101W_zhl85VHZyCRLYbUst__rQ=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/2SXEVQEC3NGJFJSVAKXS2GXXMM.jpg', '2019-04-19', '2021-02-4');

INSERT INTO remuneraciones(sueldo, ptu, fondoAhorro, idEmpleado) VALUES (10000, '2023-10-30', '2023-12-10', 1);
INSERT INTO remuneraciones(sueldo, ptu, fondoAhorro, idEmpleado) VALUES (15000, '2023-10-30', '2023-12-10', 2);
INSERT INTO remuneraciones(sueldo, ptu, fondoAhorro, idEmpleado) VALUES (20000, '2023-10-30', '2023-12-10', 3);

INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (1, 2, '2022-01-01','2022-06-06');
INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (1, 2, '2023-01-01','2023-06-06');
INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (1, 1, '2023-01-01','2023-06-06');

INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (2, 2, '2022-01-01','2022-06-06');
INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (2, 2, '2023-01-01','2023-06-06');
INSERT INTO rotaciones(idempleado, idarea,	fechainicio, fechafin) VALUES (2, 1, '2023-01-01','2023-06-06');

-- Update
UPDATE cursos_completados
SET estado = true
WHERE idcurso IN (6, 7);

UPDATE cursos_completados
SET estado = true
WHERE idcurso IN (11, 13);