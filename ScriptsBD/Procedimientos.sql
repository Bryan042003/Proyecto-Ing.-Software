DELIMITER $$

CREATE PROCEDURE InsertarAudioUbicacion(
    IN _titulo VARCHAR(100),
    IN _autor VARCHAR(100),
    IN _comentarios VARCHAR(255),
    IN _ruta_audio VARCHAR(255),
    IN _ruta_imagen VARCHAR(255),
    IN _latitud DOUBLE(10,10),
    IN _longitud DOUBLE(10,10),
    IN _nombre_canton VARCHAR(100),
    IN _nombre_provincia VARCHAR(100)
)
BEGIN
    DECLARE _id_provincia INT;
    DECLARE _id_canton INT;
    DECLARE _id_ubicacion INT;
    
    -- Buscr el id de la provincia
    SELECT id INTO _id_provincia
    FROM provincia
    WHERE nombre = _nombre_provincia;
    
    -- Buscar el id del canton
    SELECT id INTO _id_canton
    FROM canton
    WHERE nombre = _nombre_canton AND id_provincia = _id_provincia;
    
    -- Insertar la ubicacion y obtener el id
    INSERT INTO ubicacion(longitud, latitud, id_canton)
    VALUES (_longitud, _latitud, _id_canton);
    
    SET _id_ubicacion = LAST_INSERT_ID();
    
    -- Insertar el audio con el id de ubicacion
    INSERT INTO audio(titulo, autor, comentarios, ruta_audio, ruta_imagen, id_ubicacion)
    VALUES (_titulo, _autor, _comentarios, _ruta_audio, _ruta_imagen, _id_ubicacion);
END$$

CALL InsertarAudioUbicacion('titulo audio', 'autor audio', 'comentarios del audio', 'rutaAudio.mp3', 'rutaimagen.jpg', 9.748917, -83.753428, 'Paraíso', 'Cartago');


DELIMITER ;

CREATE VIEW vista_audio_ubicacion AS
SELECT
    audio.id AS audio_id,
    audio.titulo,
    audio.autor,
    audio.comentarios,
    audio.ruta_audio,
    audio.ruta_imagen,
    audio.fecha_registro,
    ubicacion.longitud,
    ubicacion.latitud,
    canton.nombre AS nombre_canton,
    provincia.nombre AS nombre_provincia
FROM
    audio
INNER JOIN ubicacion ON audio.id_ubicacion = ubicacion.id
INNER JOIN canton ON ubicacion.id_canton = canton.id
INNER JOIN provincia ON canton.id_provincia = provincia.id;


DELIMITER $$

CREATE PROCEDURE ActualizarAudioUbicacion(
    IN _id_audio INT,
    IN _titulo VARCHAR(100),
    IN _autor VARCHAR(100),
    IN _comentarios VARCHAR(255),
    IN _ruta_audio VARCHAR(255),
    IN _ruta_imagen VARCHAR(255),
    IN _latitud DOUBLE(10,5),
    IN _longitud DOUBLE(10,5),
    IN _nombre_canton VARCHAR(100),
    IN _nombre_provincia VARCHAR(100),
    IN _id_administrador INT, 
    IN _motivo VARCHAR(255) 
)
BEGIN
    DECLARE _id_provincia INT;
    DECLARE _id_canton INT;
    DECLARE _id_ubicacion INT;
    
    -- Encontrar el id de ubicación del audio
    SELECT id_ubicacion INTO _id_ubicacion FROM audio WHERE id = _id_audio;
    
    -- Buscar el id de la provincia
    SELECT id INTO _id_provincia FROM provincia WHERE nombre = _nombre_provincia;
    
    -- Buscar el id del cantón
    SELECT id INTO _id_canton FROM canton WHERE nombre = _nombre_canton AND id_provincia = _id_provincia;
    
    -- Actualizar la ubicación
    UPDATE ubicacion
    SET
        longitud = _longitud,
        latitud = _latitud,
        id_canton = _id_canton
    WHERE id = _id_ubicacion;
    
    -- Actualizar el audio
    UPDATE audio
    SET
        titulo = _titulo,
        autor = _autor,
        comentarios = _comentarios,
        ruta_audio = _ruta_audio,
        ruta_imagen = _ruta_imagen
    WHERE id = _id_audio;

    -- Insertar registro de actualización en historial_admin_audios
    INSERT INTO historial_admin_audios(id_administrador, id_audio, titulo, autor, accion, motivo, fecha_accion)
    VALUES(_id_administrador, _id_audio, _titulo, _autor, 'Modificado', _motivo, NOW());
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE InsertarAudioUbicacionByAdmin(
    IN _titulo VARCHAR(100),
    IN _autor VARCHAR(100),
    IN _comentarios VARCHAR(255),
    IN _ruta_audio VARCHAR(255),
    IN _ruta_imagen VARCHAR(255),
    IN _latitud DOUBLE(10,10),
    IN _longitud DOUBLE(10,10),
    IN _nombre_canton VARCHAR(100),
    IN _nombre_provincia VARCHAR(100),
    IN _id_administrador INT,
    IN _motivo VARCHAR(255)
)
BEGIN
    DECLARE _id_provincia INT;
    DECLARE _id_canton INT;
    DECLARE _id_ubicacion INT;
    DECLARE _id_audio INT;
    
    -- Buscar el id de la provincia
    SELECT id INTO _id_provincia
    FROM provincia
    WHERE nombre = _nombre_provincia;
    
    -- Buscar el id del cantón
    SELECT id INTO _id_canton
    FROM canton
    WHERE nombre = _nombre_canton AND id_provincia = _id_provincia;
    
    -- Insertar la ubicación y obtener el id
    INSERT INTO ubicacion(longitud, latitud, id_canton)
    VALUES (_longitud, _latitud, _id_canton);
    
    SET _id_ubicacion = LAST_INSERT_ID();
    
    -- Insertar el audio con el id de ubicación
    INSERT INTO audio(titulo, autor, comentarios, ruta_audio, ruta_imagen, id_ubicacion)
    VALUES (_titulo, _autor, _comentarios, _ruta_audio, _ruta_imagen, _id_ubicacion);
    
    SET _id_audio = LAST_INSERT_ID();
    
    -- Insertar registro de inserción en historial_admin_audios
    INSERT INTO historial_admin_audios(id_administrador, id_audio, titulo, autor, accion, motivo, fecha_accion)
    VALUES (_id_administrador, _id_audio, _titulo, _autor, 'Agregado', _motivo, NOW());
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE EliminarAudioUbicacion(
    IN _id_audio INT,
    IN _id_administrador INT, 
    IN _motivo VARCHAR(255) 
)
BEGIN
    DECLARE _titulo VARCHAR(100);
    DECLARE _autor VARCHAR(100);
    DECLARE _id_ubicacion INT;

    SELECT titulo, autor, id_ubicacion INTO _titulo, _autor, _id_ubicacion FROM audio WHERE id = _id_audio;

   
    INSERT INTO historial_admin_audios(id_administrador, id_audio, titulo, autor, accion, motivo, fecha_accion)
    VALUES (_id_administrador, _id_audio, _titulo, _autor, 'Eliminado', _motivo, NOW());

    -- Eliminar el audio de la tabla 'audio'
    DELETE FROM audio WHERE id = _id_audio;

    -- Eliminar la ubicación asociada al audio
    DELETE FROM ubicacion WHERE id = _id_ubicacion;
END$$

DELIMITER ;

