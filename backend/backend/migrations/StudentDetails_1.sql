USE studmansys;

CREATE TABLE StudentDetails (
    registration_no BIGINT,
    roll_no BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_enrolled BOOLEAN,
    subjects VARCHAR(4096),

    CONSTRAINT FOREIGN KEY (registration_no)
    REFERENCES Registration(registration_no)
);
