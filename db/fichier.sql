
CREATE DATABASE 'ProjetIntegration';
CREATE USER 'postgres' WITH ENCRYPTED PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE 'ProjetIntegration' TO 'postgres';

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
                                                             
