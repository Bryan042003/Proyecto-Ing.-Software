DROP DATABASE IF EXISTS sonidospv_bd;
create database sonidospv_bd;
use sonidospv_bd;

create table provincia(
    id int not null auto_increment primary key,
    nombre varchar(100) not null
);

create table canton(
    id int not null auto_increment primary key,
    nombre varchar(100) not null,
    id_provincia int not null,
    FOREIGN KEY (id_provincia) REFERENCES provincia(id)
);



create table ubicacion(
    id int not null auto_increment primary key,
    longitud double not null,
    latitud double not null,
    id_canton int not null,
    FOREIGN KEY (id_canton) REFERENCES canton(id)
);

create table administrador(
    id int not null auto_increment primary key,
    nombre varchar(50) not null,
    correo varchar(50) unique not null,
    password varchar(255) not null
);

create table audio(
    id int not null auto_increment primary key,
    titulo varchar(100) not null,
    autor varchar(100) not null,
    comentarios varchar(255),
    ruta_audio varchar(255) not null,
    ruta_imagen varchar(255),
    fecha_registro datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_ubicacion int not null,
    FOREIGN KEY(id_ubicacion) REFERENCES ubicacion(id)
);

create table historial_admin_audios(
    id int not null auto_increment primary key,
    id_administrador int not null,
    id_audio int,
    titulo varchar(100) not null,
    autor varchar(100) not null,
    accion varchar(25) not null,
    motivo varchar(255) not null,
    fecha_accion datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_administrador) REFERENCES administrador(id),
    CONSTRAINT fk_historial_audio FOREIGN KEY(id_audio) REFERENCES audio(id)
    ON DELETE SET NULL
);




