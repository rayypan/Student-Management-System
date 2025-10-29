USE studmansys;

CREATE TABLE Registration (
    registration_no BIGINT PRIMARY KEY AUTO_INCREMENT,
    registered_on TIMESTAMP NULL DEFAULT NULL,
    username VARCHAR(256),
    email VARCHAR(256) UNIQUE,
    password VARCHAR(256),
    first_name VARCHAR(4096),
    last_name VARCHAR(4096),
    dob DATE,
    role VARCHAR(256)
);
