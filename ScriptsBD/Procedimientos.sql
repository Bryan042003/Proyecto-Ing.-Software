DELIMITER $$

CREATE PROCEDURE InsertarAudioUbicacion(
    IN _titulo VARCHAR(100),
    IN _autor VARCHAR(100),
    IN _comentarios VARCHAR(255),
    IN _ruta_audio VARCHAR(255),
    IN _ruta_imagen VARCHAR(255),
    IN _latitud DOUBLE(10,5),
    IN _longitud DOUBLE(10,5),
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
    
    --Buscar el id del canton
    SELECT id INTO _id_canton
    FROM canton
    WHERE nombre = _nombre_canton AND id_provincia = _id_provincia;
    
    --Insertar la ubicacion y obtener el id
    INSERT INTO ubicacion(longitud, latitud, id_canton)
    VALUES (_longitud, _latitud, _id_canton);
    
    SET _id_ubicacion = LAST_INSERT_ID();
    
    --Insertar el audio con el id de ubicacion
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




