
CREATE DATABASE ProjetIntegration;
ALTER USER postgres WITH PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE ProjetIntegration TO postgres;

\c ProjetIntegration;

CREATE TABLE IF NOT EXISTS public.camera
(
    id_camera SERIAL NOT NULL,
    name_camera varchar(10) NOT NULL,
    PRIMARY KEY (id_camera)
);

ALTER TABLE public.camera
    OWNER to postgres;
	
	
INSERT INTO camera(name_camera)
VALUES 
('CAFET'),
('LOUNGE'),
('SREU1'),
('SREU2'),
('SREU3'),
('SERVERROOM'),
('ACCEUIL'),
('WC'),
('ENTREESUD'),
('ENTRENORD');
CREATE TABLE IF NOT EXISTS public.color
(
    id_color SERIAL NOT NULL,
    name_color char(25) NOT NULL,
    PRIMARY KEY (id_color)
);

ALTER TABLE public.color
    OWNER to postgres;



INSERT INTO color(name_color)
VALUES 
('#B2DFDB'),
('#F8BBD0'),
('#BBDEFB'),
('#FFF9C4'),
('#FFCCBC'),
('#C5CAE9'),
('#BCAAA4'),
('#E6EE9C'),
('#FFE0B2'),
('#E1BEE7');
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
('Directeur', 1),
('Personnel', 2),
('Bénéficiaire', 3);    


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
	first_name CHAR(25) NOT NULL,
	last_name CHAR(25) NOT NULL,
	pictures CHAR(1024) NOT NULL,
    PRIMARY KEY (id_member),
	FOREIGN KEY (id_grade) REFERENCES grade(id_grade)
);

ALTER TABLE public.member
    OWNER to postgres;
	
	
INSERT INTO member(id_grade, first_name, last_name, pictures)
VALUES 
(1, 'Jean', 'Ab', 'example.png'),
(3, 'Louise', 'Cd', 'example.png'),
(3, 'Marie', 'Ef', 'example.png'),
(2, 'Luc', 'Gh', 'example.png'),
(1, 'Alain', 'Ij', 'example.png'),
(2, 'Henri', 'Kl', 'example.png'),
(3, 'Eva', 'Mn', 'example.png'),
(3, 'Clara', 'Op', 'example.png'),
(3, 'Marion', 'Qr', 'example.png'),
(2, 'Théo', 'St', 'example.png'),
(2, 'Julien', 'Uv', 'example.png'),
(3, 'Clément', 'Wx', 'example.png'),
(3, 'Laurent', 'Yz', 'example.png'),
(3, 'Laurence', 'Az', 'example.png'),
(3, 'Pilou', 'By', 'example.png');

CREATE TABLE public.photos
(
    id_member SERIAL NOT NULL,
    pictures CHAR(1024) NOT NULL
	PRIMARY KEY (id_member),
	FOREIGN KEY (id_member) REFERENCES member(id_member)
);

INSERT INTO photos(id_member, pictures)
VALUES 
(1, 'ikram1.jpg'),
(1, 'ikram2.jpg');
	
CREATE TABLE IF NOT EXISTS public.personal
(
    username char(25) NOT NULL,
    password char(25) NOT NULL,
    PRIMARY KEY (username)
);

ALTER TABLE public.personal
    OWNER to postgres;