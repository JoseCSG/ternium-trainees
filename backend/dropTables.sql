--Drop Triggers
DROP TRIGGER IF EXISTS insert_cursos_nuevos_trigger ON cursos;
DROP TRIGGER IF EXISTS insert_cursos_completados_trigger ON empleados_info;
DROP TRIGGER IF EXISTS insert_empleados_juego_trigger ON empleados_login;
DROP TRIGGER IF EXISTS insert_empleados_remuneraciones_trigger ON empleados_info;
DROP TRIGGER IF EXISTS insert_empleados_rotaciones_trigger ON empleados_info;
DROP TRIGGER IF EXISTS monedas_trigger ON cursos_completados;
DROP TRIGGER IF EXISTS rotaciones_trigger_iniciar ON empleados_info;
DROP TRIGGER IF EXISTS rotaciones_trigger_terminar ON empleados_info;

--Drop Functions
DROP FUNCTION IF EXISTS fun_areas();
DROP FUNCTION IF EXISTS fun_empleado_avatars(INT);
DROP FUNCTION IF EXISTS fun_empleado_cursos(INT);
DROP FUNCTION IF EXISTS fun_empleado_id(VARCHAR(255));
DROP FUNCTION IF EXISTS fun_empleado_id_perfil(VARCHAR(255));
DROP FUNCTION IF EXISTS fun_empleado_juego(INT);
DROP FUNCTION IF EXISTS fun_empleado_login(VARCHAR(255));
DROP FUNCTION IF EXISTS fun_empleado_perfil(INT);
DROP FUNCTION IF EXISTS trg_crear_rotaciones();
DROP FUNCTION IF EXISTS trg_insert_cursos_completados();
DROP FUNCTION IF EXISTS trg_insert_cursos_nuevos();
DROP FUNCTION IF EXISTS trg_insert_empleados_juego();
DROP FUNCTION IF EXISTS trg_insert_remuneraciones();
DROP FUNCTION IF EXISTS trg_insert_rotaciones();
DROP FUNCTION IF EXISTS trg_monedas();
DROP FUNCTION IF EXISTS trg_terminar_rotaciones();

--Drop Procedures
DROP PROCEDURE IF EXISTS sp_empleados_avatars_insert(INT, INT);
DROP PROCEDURE IF EXISTS sp_empleados_info_delete(INT);
DROP PROCEDURE IF EXISTS sp_empleados_info_insert(VARCHAR(100), VARCHAR(100), VARCHAR(100), VARCHAR(50), DATE, VARCHAR(100), INT, INT, VARCHAR(255), DATE, INT);
DROP PROCEDURE IF EXISTS sp_empleados_info_update(VARCHAR(100), VARCHAR(100), VARCHAR(100), VARCHAR(50), DATE, VARCHAR(100), INT, VARCHAR(255), DATE, DATE, INT);
DROP PROCEDURE IF EXISTS sp_empleados_info_update_area(INT, INT);
DROP PROCEDURE IF EXISTS sp_empleados_juego_update_monedas(INT, INT);
DROP PROCEDURE IF EXISTS sp_empleados_juego_update_puntaje(INT, INT);
DROP PROCEDURE IF EXISTS sp_empleados_login_delete(INT);
DROP PROCEDURE IF EXISTS sp_empleados_login_insert(VARCHAR(255), VARCHAR(255), INT);
DROP PROCEDURE IF EXISTS sp_empleados_login_update(VARCHAR(255), INT);

--Drop Constraints
ALTER TABLE areas_interes DROP CONSTRAINT IF EXISTS fk_id_area_areainteres;
ALTER TABLE areas_interes DROP CONSTRAINT IF EXISTS fk_id_empleado_areainteres;
ALTER TABLE cursos DROP CONSTRAINT IF EXISTS fk_id_area_cursos;
ALTER TABLE cursos_completados DROP CONSTRAINT IF EXISTS fk_id_curso;
ALTER TABLE cursos_completados DROP CONSTRAINT IF EXISTS fk_id_empleado_curso;
ALTER TABLE empleados_avatars DROP CONSTRAINT IF EXISTS fk_id_empleado_avatars;
ALTER TABLE empleados_avatars DROP CONSTRAINT IF EXISTS fk_id_avatar_avatars;
ALTER TABLE empleados_info DROP CONSTRAINT IF EXISTS fk_id_empleado_perfil;
ALTER TABLE empleados_info DROP CONSTRAINT IF EXISTS fk_id_area_empleado;
ALTER TABLE empleados_info DROP CONSTRAINT IF EXISTS fk_id_empleado_jefe;
ALTER TABLE empleados_juego DROP CONSTRAINT IF EXISTS fk_id_empleado_juego;
ALTER TABLE rotaciones DROP CONSTRAINT IF EXISTS fk_id_area_rotacion;

--Drop View
DROP VIEW IF EXISTS info_empleados_individual;

--Drop Tables
DROP TABLE IF EXISTS areas CASCADE;
DROP TABLE IF EXISTS areas_interes CASCADE;
DROP TABLE IF EXISTS avatars CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS cursos_completados CASCADE;
DROP TABLE IF EXISTS empleados_avatars CASCADE;
DROP TABLE IF EXISTS empleados_info CASCADE;
DROP TABLE IF EXISTS empleados_juego CASCADE;
DROP TABLE IF EXISTS empleados_login CASCADE;
DROP TABLE IF EXISTS perfiles CASCADE;
DROP TABLE IF EXISTS remuneraciones CASCADE;
DROP TABLE IF EXISTS rotaciones CASCADE;