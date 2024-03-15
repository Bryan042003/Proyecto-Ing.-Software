
--INSERTS

DELIMETER//
create procedure insertar_audio(
    in titulo_audio varchar(100),
    in autor_audio varchar(100),
    in comentarios_audio varchar(255),
    in ruta_audio varchar(255),
    in ruta_imagen_audio varchar(255),
    in fecha_registro datetime,
    in id_ubicacion int
)
BEGIN
    insert into audio(titulo_audio, autor_audio, comentarios_audio, ruta_audio, ruta_imagen_audio, fecha_registro, id_ubicacion) values(titulo_audio, autor_audio, comentarios_audio, ruta_audio, ruta_imagen_audio, fecha_registro, id_ubicacion);
END //

DELIMITER ;

DELIMETER//
create procedure insertar_historial_admin_audios(
    in id_administrador int,
    in id_audio int,
    in accion varchar(25),
    in motivo varchar(255),
    in fecha_registro datetime
)   
BEGIN
    insert into historial_admin_audios(id_administrador, id_audio, accion, motivo, fecha_registro) values(id_administrador, id_audio, accion, motivo, fecha_registro);
END //  

DELIMITER ;


DELIMETER//
create procedure insertar_administrador(
    in nombre_administrador varchar(50),
    in correo_administrador varchar(50),
    in password varchar(50)
)   
BEGIN
    insert into administrador(nombre_administrador, correo_administrador, password) values(nombre_administrador, correo_administrador, password);
END //  

DELIMETER ;

DELIMETER//
create procedure insertar_ubicacion(
    in longitud_ubicacion decimal(5,10),
    in latitud_ubicacion decimal(5,10),
    in id_distrito int
)   
BEGIN
    insert into ubicacion(longitud_ubicacion, latitud_ubicacion, id_distrito) values(longitud_ubicacion, latitud_ubicacion, id_distrito);
END //  

DELIMETER ;

DELIMETER //
create procedure insertar_distrito(
    in nombre_distrito varchar(100),
    in id_canton int
)
BEGIN
    insert into distrito(nombre_distrito, id_canton) values(nombre_distrito, id_canton);
END //

DELIMITER ;

DELIMETER //

create procedure insertar_canton(
    in nombre_canton varchar(100),
    in id_provincia int
)
BEGIN
    insert into canton(nombre_canton, id_provincia) values(nombre_canton, id_provincia);
END //

DELIMITER ;

DELIMETER //

create procedure insertar_provincia(
    in nombre_provincia varchar(100)
)

BEGIN
    insert into provincia(nombre_provincia) values(nombre_provincia);
END //

DELIMITER ;

--GETS

