CREATE DATABASE ProjetIntegration;
ALTER USER postgres WITH PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE ProjetIntegration TO postgres;

\c ProjetIntegration;

CREATE TABLE IF NOT EXISTS public.status
(
    id_status SERIAL NOT NULL,
    name_status varchar(15) NOT NULL,
    PRIMARY KEY (id_status)
);

ALTER TABLE public.status
    OWNER to postgres;
	
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
    OWNER to postgres;
	
INSERT INTO camera(name_camera, id_status)
VALUES 
('CAFET', 1),
('LOUNGE', 1),
('SREU1', 3),
('SREU2', 1),
('SREU3', 1),
('SERVERROOM', 2),
('ACCEUIL', 2),
('WC', 1),
('ENTREESUD', 1),
('ENTRENORD', 3);



CREATE TABLE IF NOT EXISTS public.color
(
    id_color SERIAL NOT NULL,
    name_color varchar(25) NOT NULL,
    PRIMARY KEY (id_color)
);

ALTER TABLE public.color
    OWNER to postgres;

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
('#7c6caf94');


CREATE TABLE IF NOT EXISTS public.grade
(
    id_grade SERIAL NOT NULL,
    name_grade varchar(255) NOT NULL,
	id_color integer NOT NULL,
    PRIMARY KEY (id_grade),
	FOREIGN KEY (id_color) REFERENCES color(id_color)
);

ALTER TABLE public.grade
    OWNER to postgres;	
	
INSERT INTO grade(name_grade, id_color)
VALUES 
('Directeur', 10),
('Personnel', 18),
('Bénéficiaire', 7);  


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
    OWNER to postgres;
	
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
    OWNER to postgres;
	
INSERT INTO member(id_grade, first_name, last_name)
VALUES 
(1, 'Jean', 'Ab'),
(3, 'Louise', 'Cd'),
(3, 'Marie', 'Ef'),
(2, 'Luc', 'Gh'),
(1, 'Alain', 'Ij'),
(2, 'Henri', 'Kl'),
(3, 'Eva', 'Mn'),
(3, 'Clara', 'Op'),
(3, 'Marion', 'Qr'),
(2, 'Théo', 'St'),
(2, 'Julien', 'Uv'),
(3, 'Clément', 'Wx'),
(3, 'Laurent', 'Yz'),
(3, 'Laurence', 'Az'),
(3, 'Pilou', 'By');


CREATE TABLE public.photos
(
    id_member SERIAL NOT NULL,
    pictures varchar(255) NOT NULL,
	FOREIGN KEY (id_member) REFERENCES member(id_member)
);

INSERT INTO photos(id_member, pictures)
VALUES 
(1, 'ikram1.jpg'),
(1, 'ikram2.jpg');
	

CREATE TABLE IF NOT EXISTS public.personal
(
    username varchar(25) NOT NULL,
    password varchar(1024) NOT NULL,
    PRIMARY KEY (username)
);

ALTER TABLE public.personal
    OWNER to postgres;

INSERT INTO personal(username, password)
VALUES 
('toto', 'toto');