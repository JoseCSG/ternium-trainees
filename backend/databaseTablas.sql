-- Crear las tablas
CREATE TABLE areas (
	idArea SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE areas_interes (
	idAreaInteres SERIAL NOT NULL PRIMARY KEY,
	idArea INT NOT NULL,
	idEmpleado INT NOT NULL
);

CREATE TABLE avatars (
	idAvatar SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

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

CREATE TABLE empleados_avatars (
	idEmpleadoAvatar SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
  idAvatar INT NOT NULL UNIQUE
);

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

CREATE TABLE empleados_juego (
	idEmpleadoJuego SERIAL NOT NULL PRIMARY KEY,
	puntajeAlto INT NOT NULL,
	monedas INT NOT NULL,
	idEmpleado INT NOT NULL UNIQUE
);

CREATE TABLE empleados_login (
	idEmpleado SERIAL NOT NULL PRIMARY KEY,
	correo VARCHAR(255) NOT NULL UNIQUE,
	contraseña VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL,
	idPerfil INT NOT NULL
);

CREATE TABLE perfiles (
	idPerfil SERIAL NOT NULL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE remuneraciones (
	idRenumeracion SERIAL NOT NULL PRIMARY KEY,
	sueldo INT NOT NULL,
	ptu DATE NOT NULL,
	fondoAhorro DATE NOT NULL,
	idEmpleado INT NOT NULL
);

CREATE TABLE rotaciones (
	idRotacion SERIAL NOT NULL PRIMARY KEY,
	idEmpleado INT NOT NULL,
	idArea INT NOT NULL,
	fechaInicio DATE NOT NULL,
	fechaFin DATE
);
