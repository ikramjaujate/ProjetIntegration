
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
