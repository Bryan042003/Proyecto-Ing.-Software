use sonidospv_bd;
-- Provincia -----------------------------------------------------------------------

INSERT INTO provincia (nombre) VALUES
('San José'),
('Alajuela'),
('Cartago'),
('Heredia'),
('Guanacaste'),
('Puntarenas'),
('Limón');

--

-- Canton ----------------------------------------------------------------------------

-- San José
INSERT INTO canton (nombre, id_provincia) VALUES
('San José', 1),
('Escazú', 1),
('Desamparados', 1),
('Puriscal', 1),
('Tarrazú', 1),
('Aserrí', 1),
('Mora', 1),
('Goicoechea', 1),
('Santa Ana', 1),
('Alajuelita', 1),
('Vázquez de Coronado', 1),
('Acosta', 1),
('Tibás', 1),
('Moravia', 1),
('Montes de Oca', 1),
('Turrubares', 1),
('Dota', 1),
('Curridabat', 1),
('Pérez Zeledón', 1),
('León Cortés Castro', 1);

-- Alajuela
INSERT INTO canton (nombre, id_provincia) VALUES
('Alajuela', 2),
('San Ramón', 2),
('Grecia', 2),
('San Mateo', 2),
('Atenas', 2),
('Naranjo', 2),
('Palmares', 2),
('Poás', 2),
('Orotina', 2),
('San Carlos', 2),
('Zarcero', 2),
('Sarchí', 2),
('Upala', 2),
('Los Chiles', 2),
('Guatuso', 2),
('Río Cuarto', 2);

-- Cartago
INSERT INTO canton (nombre, id_provincia) VALUES
('Cartago', 3),
('Paraíso', 3),
('La Unión', 3),
('Jiménez', 3),
('Turrialba', 3),
('Alvarado', 3),
('Oreamuno', 3),
('El Guarco', 3);

-- Heredia
INSERT INTO canton (nombre, id_provincia) VALUES
('Heredia', 4),
('Barva', 4),
('Santo Domingo', 4),
('Santa Bárbara', 4),
('San Rafael', 4),
('San Isidro', 4),
('Belén', 4),
('Flores', 4),
('San Pablo', 4),
('Sarapiquí', 4);

-- Guanacaste
INSERT INTO canton (nombre, id_provincia) VALUES
('Liberia', 5),
('Nicoya', 5),
('Santa Cruz', 5),
('Bagaces', 5),
('Carrillo', 5),
('Cañas', 5),
('Abangares', 5),
('Tilarán', 5),
('Nandayure', 5),
('La Cruz', 5),
('Hojancha', 5);

-- Puntarenas
INSERT INTO canton (nombre, id_provincia) VALUES
('Puntarenas', 6),
('Esparza', 6),
('Buenos Aires', 6),
('Montes de Oro', 6),
('Osa', 6),
('Quepos', 6),
('Golfito', 6),
('Coto Brus', 6),
('Parrita', 6),
('Corredores', 6),
('Garabito', 6);

-- Limón
INSERT INTO canton (nombre, id_provincia) VALUES
('Limón', 7),
('Pococí', 7),
('Siquirres', 7),
('Talamanca', 7),
('Matina', 7),
('Guácimo', 7);

--

