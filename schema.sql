CREATE DATABASE quiz_db;
USE quiz_db;

-- design a table to hold the scores

CREATE TABLE scores
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    scores int NOT NULL,
    PRIMARY KEY (id)
);