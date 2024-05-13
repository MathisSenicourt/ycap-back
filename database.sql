CREATE DATABASE IF NOT EXISTS YCAP;

USE YCAP;

DROP TABLE IF EXISTS POI;
DROP TABLE IF EXISTS CMSUser;
DROP TABLE IF EXISTS City;

CREATE TABLE CMSUser (
                         ID INT PRIMARY KEY AUTO_INCREMENT,
                         Mail VARCHAR(255) UNIQUE,
                         Password VARCHAR(255)
);

CREATE TABLE City (
                      ID INT PRIMARY KEY AUTO_INCREMENT,
                      CityName VARCHAR(255),
                      Latitude DECIMAL(10, 8),
                      Longitude DECIMAL(11, 8),
                      Reach INT
);

CREATE TABLE POI (
                     ID INT PRIMARY KEY AUTO_INCREMENT,
                     CityId INT,
                     District VARCHAR(255),
                     Latitude DECIMAL(10, 8),
                     Longitude DECIMAL(11, 8),
                     Description TEXT,
                     FOREIGN KEY (CityId) REFERENCES City(ID)
);