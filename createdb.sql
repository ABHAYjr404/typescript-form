CREATE DATABASE form_db;

USE form_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  contact VARCHAR(20),
  address1 TEXT,
  address2 TEXT,
  pincode VARCHAR(10),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100)
);
