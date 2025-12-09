USE studmansys;

CREATE TABLE studentdetails (
    registration_no BIGINT,
    roll_no BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_enrolled BOOLEAN,
    subjects VARCHAR(4096),

    CONSTRAINT FOREIGN KEY (registration_no)
    REFERENCES registration(registration_no)
);
