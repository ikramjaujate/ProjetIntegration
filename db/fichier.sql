CREATE USER 'username'@'127.0.0.1' IDENTIFIED BY '123';

CREATE DATABASE db_test;

GRANT SELECT ON db_test.*  TO 'username'@'127.0.0.1';

USE db_test;

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
                                                             
