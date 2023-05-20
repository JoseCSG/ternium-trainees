CREATE TABLE accounts(
	id SERIAL primary key, 
	nombre varchar (90) NOT NULL,
	email varchar(255) unique not null,
	password varchar(255) not null
);

CREATE TABLE courses(
	id SERIAL primary key,
	nombre varchar(200) NOT NULL UNIQUE,
	img text
);

INSERT INTO accounts(nombre, email, password) VALUES ('Jose', 'j@outlook.com', '1234');
INSERT INTO accounts(nombre, email, password) VALUES ('Isa', 'i@outlook.com', '32');

INSERT INTO courses(nombre, img) VALUES('Intro a react', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png');
INSERT INTO courses(nombre, img) VALUES('Trabajo en equipo', 'https://coworkingfy.com/wp-content/uploads/2019/11/trabajo-en-equipo-grupo-figurativo-de-equipo-de-trabajo.jpg');
INSERT INTO courses(nombre, img) VALUES ('Psicologia 101', 'https://concepto.de/wp-content/uploads/2018/09/psicologia-e1536240725966-800x400.jpg');