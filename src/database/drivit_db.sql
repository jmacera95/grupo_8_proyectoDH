CREATE DATABASE IF NOT EXISTS drivit_db;

USE drivit_db;

DROP TABLE IF EXISTS vehicles_models;
DROP TABLE IF EXISTS brands;

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
DROP TABLE IF EXISTS vehicles;
CREATE TABLE IF NOT EXISTS vehicles (
	id INT NOT NULL AUTO_INCREMENT,
    vehicle_model_id INT NOT NULL,
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

/*user_type table*/
DROP TABLE IF EXISTS user_type;
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
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT,
    user_type_id INT NOT NULL,
    first_name VARCHAR(500) NOT NULL,
    last_name VARCHAR(500) NOT NULL,
    legal_identifier VARCHAR(250) NOT NULL,
    phone_number INT NOT NULL,
    email VARCHAR(500) NOT NULL,
    postal_code VARCHAR(200) NOT NULL,
    `password` VARCHAR(400) NOT NULL,
    image_path VARCHAR(300) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_type_id) REFERENCES user_type (id)
);