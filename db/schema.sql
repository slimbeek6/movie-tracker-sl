DROP DATABASE IF EXISTS `movies_DB`;
CREATE DATABASE `movies_DB`;

USE movies_DB;

CREATE TABLE movies (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    rating INT(2), 
    release_year INT,
    watched BOOLEAN DEFAULT false
);