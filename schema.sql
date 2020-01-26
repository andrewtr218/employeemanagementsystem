DELETE DATABASE IF EXISTS manage_db

CREATE DATABASE manage_db

USE manage_db

Create Table departments (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30),
    PRIMARY KEY (id)
)


Create Table roles (
    id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(30),
    salary DECIMAL,
    department_id  INT,
    PRIMARY KEY (id)
)

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    PRIMARY KEY (id)
)