DROP DATABASE IF EXISTS sonidos_pura_vida_bd;
create database sonidos_pura_vida_bd;
use sonidos_pura_vida_bd;

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
    longitud double(10,10) not null,
    latitud double(10,10) not null,
    id_canton int not null,
    FOREIGN KEY (id_canton) REFERENCES canton(id)
);

create table administrador(
    id int not null auto_increment primary key,
    nombre varchar(50) not null,
    correo varchar(50) unique not null,
    password varchar(50) not null

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
    FOREIGN KEY(id_administrador) REFERENCES administrador(id),
    id_audio int not null,
    FOREIGN KEY(id_audio) REFERENCES audio(id),
    accion varchar(25) not null,
    motivo varchar(255) not null,
    fecha_registro datetime NOT NULL DEFAULT CURRENT_TIMESTAMP

);




