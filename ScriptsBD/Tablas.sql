DROP DATABASE IF EXISTS sonidos_pura_vida_bd;
create database sonidos_pura_vida_bd;
use sonidos_pura_vida_bd;

create table provincia(
    id_provincia int not null auto_increment primary key,
    nombre_provincia varchar(100) not null
);

create table canton(
    id_canton int not null auto_increment primary key,
    nombre_canton varchar(100) not null,
    id_provincia int not null,
    FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia)
);

create table distrito(
    id_distrito int not null auto_increment primary key,
    nombre_distrito varchar(100) not null,
    id_canton int not null,
    FOREIGN KEY (id_canton) REFERENCES canton(id_canton)
);

create table ubicacion(
    id_ubicacion int not null auto_increment primary key,
    longitud_ubicacion double(10,5) not null,
    latitud_ubicacion double(10,5) not null,
    id_distrito int not null,
    FOREIGN KEY (id_distrito ) REFERENCES distrito(id_distrito)
);

create table administrador(
    id_administrador int not null auto_increment primary key,
    nombre_administrador varchar(50) not null,
    correo_administrador varchar(50) unique not null,
    password varchar(50) not null

);


create table audio(
    id_audio int not null auto_increment primary key,
    titulo_audio varchar(100) not null,
    autor_audio varchar(100) not null,
    comentarios_audio varchar(255) not null,
    ruta_audio varchar(255) not null,
    ruta_imagen_audio varchar(255) not null,
    fecha_registro datetime not null,
    id_ubicacion int not null,
    FOREIGN KEY(id_ubicacion) REFERENCES ubicacion(id_ubicacion)

);

create table historial_admin_audios(
    id_historial_admin_audios int not null auto_increment primary key,
    id_administrador int not null,
    FOREIGN KEY(id_administrador) REFERENCES administrador(id_administrador),
    id_audio int not null,
    FOREIGN KEY(id_audio) REFERENCES audio(id_audio),
    accion varchar(25) not null,
    motivo varchar(255) not null,
    fecha_registro datetime not null

);




