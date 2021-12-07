CREATE USER pW95V2zYwk4L WITH PASSWORD 'Am6Mm5BW35bw';
CREATE DATABASE ProjetIntegration;
GRANT ALL PRIVILEGES ON DATABASE ProjetIntegration to pW95V2zYwk4L;


\c ProjetIntegration;

CREATE TABLE IF NOT EXISTS public.status
(
    id_status SERIAL NOT NULL,
    name_status varchar(15) NOT NULL,
    PRIMARY KEY (id_status)
);

ALTER TABLE public.status
    OWNER to pW95V2zYwk4L;

INSERT INTO status(name_status)
VALUES
('ON'),
('OFF'),
('DISCONNECTED');


CREATE TABLE IF NOT EXISTS public.camera
(
    id_camera SERIAL NOT NULL,
    name_camera varchar(10) NOT NULL,
	id_status INTEGER NOT NULL,
    PRIMARY KEY (id_camera),
	FOREIGN KEY (id_status) REFERENCES status(id_status)
);

ALTER TABLE public.camera
    OWNER to pW95V2zYwk4L;

INSERT INTO camera(name_camera, id_status)
VALUES
('CAFET', 1),
('SREU1', 3),
('SREU2', 1),
('SERVERROOM', 2),
('ACCUEIL', 2),
('ENTREESUD', 1);


CREATE TABLE IF NOT EXISTS public.color
(
    id_color SERIAL NOT NULL,
    name_color varchar(25) NOT NULL,
    PRIMARY KEY (id_color)
);

ALTER TABLE public.color
    OWNER to pW95V2zYwk4L;

INSERT INTO color(name_color)
VALUES
('#B2DFDB'),
('#F8BBD0'),
('#BBDEFB'),
('#FFCCBC'),
('#BCAAA4'),
('#E6EE9C'),
('#cdc7af'),
('#cd7e99'),
('#bb3e19'),
('#e37352'),
('#007352'),
('#a0c589'),
('#89b4c5'),
('#c58989'),
('#9f9f9f'),
('#b689c5'),
('#1b637e'),
('#7c6caf');


CREATE TABLE IF NOT EXISTS public.grade
(
    id_grade SERIAL NOT NULL,
    name_grade varchar(255) NOT NULL,
    id_color integer NOT NULL,
    order_place integer NOT NULL,
    PRIMARY KEY (id_grade),
	FOREIGN KEY (id_color) REFERENCES color(id_color)
);

ALTER TABLE public.grade
    OWNER to pW95V2zYwk4L;

INSERT INTO grade(name_grade, id_color, order_place)
VALUES
('Directeur', 10, 0),
('Personnel', 18, 1),
('Bénéficiaire', 7, 2);

CREATE TABLE IF NOT EXISTS public.permission
(
    id_permission SERIAL NOT NULL,
    id_grade INTEGER NOT NULL,
	id_camera INTEGER NOT NULL,
	allowed BOOL NOT NULL,
	notification BOOL NOT NULL,
    PRIMARY KEY (id_permission),
	FOREIGN KEY (id_grade) REFERENCES grade(id_grade),
	FOREIGN KEY (id_camera) REFERENCES camera(id_camera)
);

ALTER TABLE public.permission
    OWNER to pW95V2zYwk4L;

INSERT INTO permission(id_grade, id_camera, allowed, notification)
VALUES
(1, 1, true, false),
(1, 2, true, false),
(1, 3, true, false),
(1, 4, true, false),
(1, 5, true, false),
(1, 6, true, false),
(1, 7, true, false),
(1, 8, true, false),
(1, 9, true, false),
(1, 10, true, false),
(2, 1, true, false),
(2, 2, false, false),
(2, 3, true, false),
(2, 4, true, false),
(2, 5, true, false),
(2, 6, false, false),
(2, 7, true, false),
(2, 8, true, false),
(2, 9, false, false),
(2, 10, false, false),
(3, 1, true, false),
(3, 2, false, true),
(3, 3, false, true),
(3, 4, true, false),
(3, 5, false, false),
(3, 6, false, false),
(3, 7, true, false),
(3, 8, false, true),
(3, 9, false, true),
(3, 10, false, false);


CREATE TABLE IF NOT EXISTS public.member
(
    id_member SERIAL NOT NULL,
    id_grade INTEGER NOT NULL,
	first_name varchar(25) NOT NULL,
	last_name varchar(25) NOT NULL,
    PRIMARY KEY (id_member),
	FOREIGN KEY (id_grade) REFERENCES grade(id_grade)
);

ALTER TABLE public.member
    OWNER to pW95V2zYwk4L;

INSERT INTO member(id_grade, first_name, last_name)
VALUES
(1, 'Ikram', 'Jaujate'),
(3, 'Corentin', 'Dallenogare'),
(3, 'Clémentine', 'Sacré'),
(2, 'Julie', 'Fino'),
(1, 'Aurelien', 'Brille'),
(2, 'Cécile', 'Bonnet'),
(3, 'Alexandre', 'Derwa'),
(1, 'Marie-Noel', 'Vroman'),
(1, 'Louis', 'VanDormael'),
(1, 'Laurent', 'Schalkwijk');


CREATE TABLE public.photos
(
    id_member SERIAL NOT NULL,
    pictures varchar(1024) NOT NULL,
	FOREIGN KEY (id_member) REFERENCES member(id_member)
);

INSERT INTO photos(id_member, pictures)
VALUES
(1, 'ikram2.jpg'),
(1, 'ikram1.jpg'),
(2, 'corentin1.jpg'),
(2, 'corentin2.jpg');


CREATE TABLE IF NOT EXISTS public.personal
(
    id_personal SERIAL NOT NULL,
    username varchar(25) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (username)
);

ALTER TABLE public.personal
    OWNER to pW95V2zYwk4L;

INSERT INTO personal(username, password)
VALUES
('toto', 'toto');