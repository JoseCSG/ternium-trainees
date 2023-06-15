-- Crear las llaves foráneas
ALTER TABLE areas_interes
  ADD CONSTRAINT fk_id_area_areainteres FOREIGN KEY (idArea) REFERENCES areas(idArea),
  ADD CONSTRAINT fk_id_empleado_areainteres FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE cursos
  ADD CONSTRAINT fk_id_area_cursos FOREIGN KEY (idArea) REFERENCES areas(idArea) ON DELETE CASCADE;
ALTER TABLE cursos_completados
  ADD CONSTRAINT fk_id_curso FOREIGN KEY (idCurso) REFERENCES cursos(idCurso),
  ADD CONSTRAINT fk_id_empleado_curso FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_avatars
  ADD CONSTRAINT fk_id_empleado_avatars FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE,
  ADD CONSTRAINT fk_id_avatar_avatars FOREIGN KEY (idAvatar) REFERENCES avatars(idAvatar);
ALTER TABLE empleados_info
  ADD CONSTRAINT fk_id_empleado_perfil FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE,
  ADD CONSTRAINT fk_id_area_empleado FOREIGN KEY (idArea) REFERENCES areas(idArea),
  ADD CONSTRAINT fk_id_empleado_jefe FOREIGN KEY (idJefe) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_juego
  ADD CONSTRAINT fk_id_empleado_juego FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE empleados_login
  ADD CONSTRAINT fk_id_perfil FOREIGN KEY (idPerfil) REFERENCES perfiles(idPerfil);
ALTER TABLE remuneraciones
  ADD CONSTRAINT fk_id_empleado_renumeracion FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE;
ALTER TABLE rotaciones
  ADD CONSTRAINT fk_id_empleado_rotacion FOREIGN KEY (idEmpleado) REFERENCES empleados_login(idEmpleado) ON DELETE CASCADE,
  ADD CONSTRAINT fk_id_area_rotacion FOREIGN KEY (idArea) REFERENCES areas(idArea);

--Stored Procedures empleados_avatar
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_avatars_insert(idEmpleado INT, idAvatar INT)
AS $$
	INSERT INTO empleados_avatars(idEmpleado, idAvatar)
	VALUES ($1, $2);
$$ LANGUAGE SQL;

--Stored Procedures empleados_info
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_info_insert(
	nombre VARCHAR(100), apellidoPaterno VARCHAR(100), apellidoMaterno VARCHAR(100),
	genero VARCHAR(50), fechaNacimiento DATE, pais VARCHAR(100), idEmpleado INT,
	fotoPerfil VARCHAR(255), fechaGraduacion DATE, idJefe INT, idArea INT)
AS $$
	INSERT INTO empleados_info(
	nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, pais,
	idEmpleado, fotoPerfil, fechaInicio, fechaGraduacion, idJefe)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE, $9, $10, $11);
$$ LANGUAGE SQL;

--Update
CREATE OR REPLACE PROCEDURE sp_empleados_info_update(
	nombre VARCHAR(100), apellidoPaterno VARCHAR(100), apellidoMaterno VARCHAR(100), 
	genero VARCHAR(50), fechaNacimiento DATE, pais VARCHAR(100), idEmpleado INT, 
  fotoPerfil VARCHAR(255), fechaInicio DATE, fechaGraduacion DATE,
  idJefe INT)
AS $$
	UPDATE empleados_info
	SET nombre = $1, apellidoPaterno = $2, apellidoMaterno = $3, genero = $4, 
		fechaNacimiento = $5, pais = $6, fotoPerfil = $8,
    fechaInicio = $9, fechaGraduacion = $10, idJefe = $11
	WHERE idEmpleado = $7;
$$ LANGUAGE SQL;

--Update Area
CREATE OR REPLACE PROCEDURE sp_empleados_info_update_area(idArea INT, idEmpleado INT)
AS $$
	UPDATE empleados_info SET idArea = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Delete
CREATE OR REPLACE PROCEDURE sp_empleados_info_delete(idEmpleado INT)
AS $$
	DELETE FROM empleados_info
	WHERE idEmpleado = $1
$$ LANGUAGE SQL;

--Stored Procedures empleados_juego
--Update puntaje
CREATE OR REPLACE PROCEDURE sp_empleados_juego_update_puntaje(puntajeAlto INT, idEmpleado INT)
AS $$
	UPDATE empleados_juego SET puntajeAlto = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Update monedas
CREATE OR REPLACE PROCEDURE sp_empleados_juego_update_monedas(monedas INT, idEmpleado INT)
AS $$
	UPDATE empleados_juego SET monedas = $1
	WHERE idEmpleado = $2;
$$ LANGUAGE SQL;

--Stored Procedures empleados_login
--Insert
CREATE OR REPLACE PROCEDURE sp_empleados_login_insert(correo VARCHAR(255), contraseña VARCHAR(255), idPerfil INT)
AS $$
	INSERT INTO empleados_login(correo, contraseña, idPerfil, estado) VALUES ($1, $2, $3, true);
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

--View info_empleados_individual
--Muestra los empleados con su información
CREATE VIEW info_empleados_individual AS
SELECT ei.idempleado, ei.nombre, ei.apellidopaterno, ei.apellidomaterno, ei.genero, 
		ei.fechainicio, ei.fechagraduacion, ej.nombre AS nombre_jefe, ej.apellidopaterno AS apellido_jefe,
		a.nombre AS area
FROM empleados_info ei
JOIN empleados_info ej ON ei.idjefe = ej.idempleado
JOIN areas a ON ei.idarea = a.idarea;

--Función areas
CREATE OR REPLACE FUNCTION fun_areas()
RETURNS JSON
AS $$
    SELECT json_agg(json_build_object('nombre', nombre, 'idArea', idArea))
	FROM areas; 
$$ LANGUAGE SQL;

--Función empleado_avatars
CREATE OR REPLACE FUNCTION fun_empleado_avatars(idEmpleado INT)
RETURNS JSON
AS $$
	SELECT json_agg(json_build_object('idavatar', idAvatar))
  FROM empleados_avatars
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

--Función empleado_cursos
CREATE OR REPLACE FUNCTION fun_empleado_cursos(idEmpleado INT)
RETURNS JSON
AS $$
    SELECT json_agg(json_build_object('nombre', c.nombre, 'imagenURL', img ,'estado', estado))
    FROM cursos_completados cc
    INNER JOIN cursos c ON cc.idCurso = c.idCurso
    WHERE cc.idEmpleado = $1 AND c.idArea = (SELECT idArea FROM empleados_info WHERE idEmpleado = $1);
$$ LANGUAGE SQL;

--Función empleado_id
--Select id (id del empleado)
CREATE OR REPLACE FUNCTION fun_empleado_id(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idEmpleado', idEmpleado) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

--Función empleado_id_perfil
--Select id perfil (administrador o empleado)
CREATE OR REPLACE FUNCTION fun_empleado_id_perfil(correo VARCHAR(255))
RETURNS JSON
AS $$
  SELECT json_build_object('idPerfil', idPerfil) 
  FROM empleados_login
  WHERE correo = $1;
$$ LANGUAGE SQL;

--Función empleado_juego
CREATE OR REPLACE FUNCTION fun_empleado_juego(idEmpleado INT)
RETURNS JSON
AS $$
  SELECT json_build_object('monedas', monedas, 'puntaje', puntajeAlto)
  FROM empleados_juego
  WHERE idEmpleado = $1;
$$ LANGUAGE SQL;

--Función empleado_login
CREATE OR REPLACE FUNCTION fun_empleado_login(correo VARCHAR(255))
RETURNS TABLE(idEmpleado INT, contraseña VARCHAR(255))
AS $$
	SELECT idEmpleado, contraseña FROM empleados_login
	WHERE correo = $1
$$ LANGUAGE SQL;

--Función empleado_perfil
CREATE OR REPLACE FUNCTION fun_empleado_perfil(idEmpleado INT)
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

--Función leaderboard
CREATE OR REPLACE FUNCTION fun_leaderboard()
RETURNS JSON
AS $$
	SELECT json_agg(json_build_object('nombre', ej.nombre, 'puntaje', ej.puntajeAlto))
	FROM (SELECT ei.nombre, ej.puntajeAlto
	  FROM empleados_juego ej
	  INNER JOIN empleados_info ei ON ei.idempleado = ej.idempleado
	  ORDER BY ej.puntajeAlto DESC
	  LIMIT 3) ej;
$$ LANGUAGE SQL;

--Trigger insert_cursos_completados
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

--Trigger insert_cursos_nuevos
CREATE OR REPLACE FUNCTION trg_insert_cursos_nuevos()
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

CREATE TRIGGER insert_cursos_nuevos_trigger
AFTER INSERT ON cursos
FOR EACH ROW
EXECUTE FUNCTION trg_insert_cursos_nuevos();

--Trigger insert_empleados_juego
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

--Trigger monedas
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
EXECUTE FUNCTION trg_crear_rotaciones();

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

CREATE OR REPLACE FUNCTION trg_insert_rotaciones()
RETURNS TRIGGER
AS $$
BEGIN
	INSERT INTO rotaciones (idEmpleado, idArea, fechainicio)
	SELECT NEW.idEmpleado, NEW.idArea, now();

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_empleados_rotaciones_trigger
AFTER INSERT ON empleados_info
FOR EACH ROW
EXECUTE FUNCTION trg_insert_rotaciones();

-- Insertar datos
INSERT INTO areas(nombre)
VALUES('Recursos Humanos'),
      ('Mantenimiento'),
      ('Operaciones'),
      ('Supply Chain'),
      ('Ingeniería y Proyectos'),
      ('Medio Ambiente'),
      ('Seguridad'),
      ('Comercial'),
      ('Administración y Finanzas'),
      ('Auditoria y Legal'),
      ('Comunicaciones');

INSERT INTO avatars(nombre)
VALUES('Leo'),
      ('Moto Moto'),
      ('Marty'),
      ('Jacob'),
      ('Milaneso'),
      ('Otis'),
      ('Burro'),
      ('Pato'),
      ('Dumbo'),
      ('Rhino'),
      ('Nick');

INSERT INTO cursos(nombre, idarea)
VALUES('Como lidear con las personas', 1),
      ('¿Qué cosas necesitan mantenimiento?', 2),
      ('Top 5 operaciones de la empresa', 3),
      ('¿Qué es supply chain', 4),
      ('Proyectos actuales', 5),
      ('Importancia del área comercial', 8),
      ('Estátistica', 9),
      ('Leyes Mexicanas', 10),
      ('Diferentes maneras de comunicarte', 11);

INSERT INTO cursos(nombre, idarea, img)
VALUES('¿Cómo proteger el medio ambiente?', 6, 'https://cdn0.ecologiaverde.com/es/posts/4/7/6/que_es_el_medio_ambiente_definicion_y_resumen_1674_orig.jpg'),
      ('La importancia de los árboles', 6, 'https://www.henkel.es/resource/image/1084248/16x9/1920/1080/7a7530443937d70f83dbb22c6423158c/F34BFB3EAF33429AAFA08601DD0B63E2/2020-06-05-d%C3%ADa-mundial-del-medio-ambiente-jpg.webp'),
      ('Factores importantes', 6, 'https://cdn0.ecologiaverde.com/es/posts/9/8/7/como_cuidar_el_medio_ambiente_3789_orig.jpg'),
      ('Diversidad en riesgo', 6, 'https://www.bbva.com/wp-content/uploads/2019/06/A-0406-DiaMedioAmbiente-BBVA.jpg'),
      ('Intro a React', 7, 'https://sigdeletras.com/images/blog/202004_react_leaflet/react.png'),
      ('Intro a SQL', 7, 'https://techkrowd.com/wp-content/uploads/2022/12/banner_bbdd_3.png'),
      ('Ciberseguridad', 7, 'https://thelogisticsworld.com/wp-content/uploads/2023/01/ilustracion-de-seguridad-cibernetica.jpg'),
      ('Cookies', 7, 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/02/cookies-internet.jpg'),
      ('¿Cómo proteger tu información?', 7, 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/5-tendencias-van-cambiar-ciberseguridad-2020-1858639.jpg');

INSERT INTO perfiles(nombre)
VALUES('Administrador'),
      ('Empleado');

CALL sp_empleados_login_insert('j@outlook.com', '1234', 2);
CALL sp_empleados_login_insert('i@outlook.com', '32', 2);
CALL sp_empleados_login_insert('j@gmail.com', '26', 1);

CALL sp_empleados_info_insert('Jose', 'Sanchez', 'Gomez', 'Masculino', '2003-09-09', 'Mexico', 1, 7, 'https://i.pinimg.com/originals/a2/a2/2f/a2a22fc7eda2da304c5345ed25fad6d8.jpg', '2023-09-20', 3);
CALL sp_empleados_info_insert('Isabella', 'Garduño', 'Horneffer', 'Femenino', '2003-02-20', 'Colombia', 2, 6, 'https://pbs.twimg.com/media/EEeRD-tVAAEV8b9.jpg', '2023-01-15', 3);
CALL sp_empleados_info_insert('Jeannette', 'Arjona', 'Hernandez', 'Femenino', '2002-09-26', 'Argentina', 3, 1, 'https://depor.com/resizer/B101W_zhl85VHZyCRLYbUst__rQ=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/2SXEVQEC3NGJFJSVAKXS2GXXMM.jpg', '2021-02-4', 3);

INSERT INTO remuneraciones(sueldo, ptu, fondoAhorro, idEmpleado)
VALUES(10000, '2023-10-30', '2023-12-10', 1),
      (15000, '2023-10-30', '2023-12-10', 2),
      (20000, '2023-10-30', '2023-12-10', 3);

INSERT INTO rotaciones(idempleado, idarea, fechainicio, fechafin, performance, potencial)
VALUES(1, 2, '2022-01-01','2022-06-06', 5, 'MN'),
      (1, 2, '2023-01-01','2023-06-06', 4, 'MN+'),
      (1, 1, '2023-01-01','2023-06-06', 1, 'PROM'),
      (2, 2, '2022-01-01','2022-06-06', 2, 'AP'),
      (2, 2, '2023-01-01','2023-06-06', 3, 'PROM'),
      (2, 1, '2023-01-01','2023-06-06', 5, 'MN+');

-- Update
UPDATE cursos_completados
SET estado = true
WHERE idcurso IN (6, 7);

UPDATE cursos_completados
SET estado = true
WHERE idcurso IN (11, 13);

CREATE INDEX idx_employeeName ON empleados_info (nombre);