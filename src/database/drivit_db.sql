CREATE DATABASE IF NOT EXISTS drivit_db;

USE drivit_db;

DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS vehicles_models;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_type;

/*brands table*/
CREATE TABLE IF NOT EXISTS brands (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO brands (id, name)
VALUES 
	(1, 'Ford'),
	(2, 'Peugeot'),
	(3, 'Renault'),
	(4, 'Volkswagen'),
	(5, 'Toyota'),
	(6, 'Honda'),
	(7, 'Audi'),
	(8, 'Fiat'),
	(9, 'Chevrolet'),
	(10, 'Citroen'),
	(11, 'Kia')
;

/*vehicles_models table*/
CREATE TABLE IF NOT EXISTS vehicles_models (
	id INT NOT NULL AUTO_INCREMENT,
    brand_id INT NOT NULL,
    `name` VARCHAR(4000) NOT NULL,
    model_name VARCHAR(200) NOT NULL,
    `year` INT NOT NULL,
    fuel_type VARCHAR(100) NOT NULL,
    transmission_type VARCHAR(100) NOT NULL,
    airbag BOOL NOT NULL,
    doors_quantity TINYINT NOT NULL,
    `engine` VARCHAR(200) NOT NULL,
    traction VARCHAR(50) NOT NULL,
    abs BOOL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES brands (id)
);
INSERT INTO vehicles_models (brand_id, `name`, model_name, `year`, fuel_type, transmission_type, airbag, doors_quantity, `engine`, traction, abs)
VALUES 
	(1, 'Ford Focus 2013 1.6 trend nafta manual base', 'Focus', 2013, 'Nafta', 'Manual', True, 5, 1.6, '4x2', False),
    (1, 'Ford Focus titanium 2015 2.0 nafta automático', 'Focus', 2015, 'Nafta', 'Automático', True, 5, 2.0, '4x2', True),
    (2, 'Peugeot 208 2016 1.4 nafta manual full', '208', 2016, 'Nafta', 'Manual', True, 5, 1.4, '4x2', True),
    (5, 'Toyota Hilux 4x4 2017 2.5 diesel automático', 'Hilux', 2017, 'Diesel', 'Automático', True, 4, 2.5, '4x4', True),
    (3, 'Renault Sandero 2012 1.6 nafta manual base', 'Sandero', 2012, 'Nafta', 'Manual', False, 5, 1.6, '4x2', False),
    (4, 'Volkswagen Gol 2014 1.6 trend full 3ptas manual nafta', 'Gol', 2014, 'Nafta', 'Manual', True, 3, 1.6, '4x2', True),
    (1, 'Ford Fiesta titanium 2013 1.6 nafta manual', 'Fiesta', 2013, 'Nafta', 'Manual', True, 5, 1.6, '4x2', True),
    (5, 'Toyota Etios 2016 1.3 automático full nafta', 'Etios', 2016, 'Nafta', 'Automático', True, 5, 1.3, '4x2', True)
;

/*vehicles table*/
CREATE TABLE IF NOT EXISTS vehicles (
	id INT NOT NULL AUTO_INCREMENT,
    vehicle_model_id INT NOT NULL,
    price INT NOT NULL,
    kilometers INT NOT NULL,
    last_service_date DATE NOT NULL,
    color VARCHAR(200) NOT NULL,
    last_balancing_alignment_date DATE NOT NULL,
    timing_belt_age_kilometers INT NOT NULL,
    airbag_status VARCHAR(200) NOT NULL,
    total_owners TINYINT NOT NULL,
    legal_identifier VARCHAR(250) NOT NULL,
    location_province VARCHAR(300) NOT NULL,
    clutch_status VARCHAR(250) NOT NULL,
    image_path VARCHAR(300) NOT NULL,
    outstanding BOOL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (vehicle_model_id) REFERENCES vehicles_models (id)
);

INSERT INTO vehicles (vehicle_model_id, price, kilometers, last_service_date, color, last_balancing_alignment_date, timing_belt_age_kilometers,
	airbag_status, total_owners, legal_identifier, location_province, clutch_status, image_path, outstanding)
VALUES
	(1, 2500000, 120000, "2022-01-07", "grey", "2022-10-06", 5000, "tiene-ambos", 1, "MGF842", "Buenos Aires", 
    "fabrica", "focus-2013.png", 1),
    (2, 3500000, 85000, "2021-12-07", "white", "2022-05-06", 15000, "tiene-ambos", 2, "MGX842", "La Pampa", 
    "repuesto", "focus-2015.png", 1),
    (3, 2000000, 97000, "2021-05-07", "red", "2022-04-26", 9000, "tiene-ambos", 1, "FJH675", "Mendoza", 
    "fabrica", "208-2016.png", 0),
    (4, 2800000, 106000, "2021-05-07", "black", "2022-04-26", 13000, "no", 2, "ARE789", "Santa Fe", 
    "fabrica", "hilux-2016.png", 1),
    (5, 2200000, 170000, "2021-05-07", "black", "2022-04-26", 15000, "tiene-ambos", 1, "ALM755", "Entre Ríos", 
    "repuesto", "sandero-2012.png", 1),
    (6, 2100000, 105000, "2021-05-07", "red", "2022-04-26", 10000, "tiene-adelante", 2, "NGP267", "Río Negro", 
    "fabrica", "gol-2014.png", 1),
    (7, 1800000, 95000, "2021-05-07", "yellow", "2022-04-26", 9000, "tiene-ambos", 1, "ALM907", "Corrientes", 
    "fabrica", "fiesta-2013.png", 1);

/*user_type table*/
CREATE TABLE IF NOT EXISTS user_type (
	id INT NOT NULL AUTO_INCREMENT,
    user_type VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO user_type (id, user_type)
VALUES
	(1, 'admin'),
    (2, 'basic')
;

/*users table*/
CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT,
    user_type_id INT NOT NULL,
    first_name VARCHAR(500) NOT NULL,
    last_name VARCHAR(500) NOT NULL,
    legal_identifier VARCHAR(250) NOT NULL,
    phone_number VARCHAR(300) NOT NULL,
    email VARCHAR(500) NOT NULL,
    postal_code VARCHAR(200) NOT NULL,
    `password` VARCHAR(400) NOT NULL,
    image_path VARCHAR(300),
    PRIMARY KEY (id),
    FOREIGN KEY (user_type_id) REFERENCES user_type (id)
);
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (1, 2, 'Bobine', 'Sentance', '49-0943845', '954-693-6670', 'bsentance0@wikimedia.org', '503 51', '89elUWqOv', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (2, 2, 'Lemuel', 'Hartford', '55-4172756', '341-415-0640', 'lhartford1@creativecommons.org', '503 51', 't6iuvM0O9', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (3, 2, 'Moishe', 'Johnys', '16-6775076', '952-134-9277', 'mjohnys2@gov.uk', '3158', 'BQk0p5fwBu', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (4, 2, 'Carson', 'Liccardo', '45-4608589', '884-841-7688', 'cliccardo3@ucoz.com', '42-284', '7V112R', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (5, 2, 'Bobbie', 'Barlie', '80-8518261', '782-585-4259', 'bbarlie4@weebly.com', '6420-696', '0ZJNCMzuM4CI', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (6, 2, 'Urbano', 'Malim', '88-1220150', '484-512-1727', 'umalim5@wufoo.com', '503 51', 'xOWm53HsS', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (7, 2, 'Lamont', 'Edgeon', '68-7907205', '262-987-9612', 'ledgeon6@sina.com.cn', '2686', 'SA7Zkub', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (8, 2, 'Ahmad', 'Petrolli', '38-1902393', '216-830-4105', 'apetrolli7@skype.com', '7109', 'UwvsDOC5hGZh', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (9, 2, 'Lucian', 'Bucktrout', '86-3054154', '480-620-5702', 'lbucktrout8@geocities.jp', '503 51', 'BwHskAOhG', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (10, 2, 'Stoddard', 'Utteridge', '67-8848473', '122-840-9784', 'sutteridge9@bandcamp.com', '547 01', 'JqRSUGx7frv', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (11, 2, 'Robinet', 'Gillease', '43-6637155', '162-344-2238', 'rgilleasea@howstuffworks.com', '503 51', 'RqdeIgeb', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (12, 2, 'Hildegarde', 'Valentetti', '73-1428633', '577-393-5707', 'hvalentettib@dell.com', '44190', 'OFp86QZks', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (13, 2, 'Elvin', 'Jolliffe', '13-7251072', '834-787-9195', 'ejolliffec@discovery.com', '503 51', 'bPFnmrb', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (14, 2, 'Basilius', 'Grahame', '24-7225892', '861-674-9802', 'bgrahamed@istockphoto.com', '353827', 'PEeeeYq', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (15, 2, 'Magda', 'Plewes', '59-3763624', '411-499-6545', 'mplewese@odnoklassniki.ru', '78130', 'fdraGRg', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (16, 2, 'Marylinda', 'Petrelluzzi', '09-6729732', '608-467-3862', 'mpetrelluzzif@163.com', '39270-000', '8DQ1c6tr3B', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (17, 2, 'Rand', 'Coath', '65-5127370', '667-158-6428', 'rcoathg@gizmodo.com', '503 51', 'V5dM2H', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (18, 2, 'Zarah', 'Boolsen', '19-5093460', '482-319-5104', 'zboolsenh@epa.gov', '503 51', 'nr4ki8', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (19, 2, 'Aylmar', 'Danilchev', '11-6067660', '782-696-6363', 'adanilchevi@people.com.cn', '503 51', 'ja58eB10', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (20, 2, 'Corella', 'Byrcher', '56-6340930', '199-790-5280', 'cbyrcherj@google.com', '85660-000', 'cWrbP9BlkK2', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (21, 2, 'Ludovico', 'Armell', '89-8435524', '969-713-4830', 'larmellk@huffingtonpost.com', '503 51', '75mjVxkwwkA', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (22, 2, 'Tildy', 'Solland', '72-5241426', '809-593-7183', 'tsollandl@webeden.co.uk', '634506', 'XZu9NfWsR', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (23, 2, 'Lurlene', 'Swane', '69-7312713', '824-515-8261', 'lswanem@goodreads.com', '503 51', 'aVFKa7IsFrI', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (24, 2, 'Joy', 'Charley', '66-9980468', '765-504-2128', 'jcharleyn@nps.gov', '503 51', '3GUnW0w3q', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (25, 2, 'Delcine', 'Kilby', '56-7638134', '143-144-8964', 'dkilbyo@eventbrite.com', '503 51', 'jMm7zVDBatSs', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (26, 2, 'Genvieve', 'Annwyl', '85-0042544', '726-688-4814', 'gannwylp@shutterfly.com', '503 51', 'ea2oZGr', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (27, 2, 'Kelci', 'Laviste', '18-9396885', '624-555-2398', 'klavisteq@wunderground.com', '503 51', 'xw3UVWP62xQq', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (28, 2, 'York', 'Kulas', '59-7286210', '651-730-2437', 'ykulasr@mapy.cz', '503 51', 'l9vaTIUY', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (29, 2, 'Aurelia', 'Ludford', '38-4508438', '899-169-7607', 'aludfords@europa.eu', '503 51', '74abUpsZQn', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (30, 2, 'Dinah', 'Moysey', '60-1127022', '596-906-2626', 'dmoyseyt@ebay.co.uk', '503 51', 'jX3cNNig7XX', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (31, 1, 'Manuel', 'Roman', '60-1127022', '596-906-2626', 'manuroman@gmail.com', '503 51', '$2b$10$KkocMIQZEN7o0SVurDBRRu2PPytM8dTnaqO7Y86.WHdvHFA.9YNrK', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (32, 1, 'Julián', 'Macera', '60-1127022', '596-906-2626', 'julimacera@gmail.com', '503 51', '$2b$10$KkocMIQZEN7o0SVurDBRRu2PPytM8dTnaqO7Y86.WHdvHFA.9YNrK', 'perfil-empty.png');
insert into users (id, user_type_id, first_name, last_name, legal_identifier, phone_number, email, postal_code, password, image_path) values (33, 1, 'Juan', 'Butler', '60-1127022', '596-906-2626', 'juanbutlerL94@gmail.com', '503 51', '$2b$10$KkocMIQZEN7o0SVurDBRRu2PPytM8dTnaqO7Y86.WHdvHFA.9YNrK', 'perfil-empty.png');

