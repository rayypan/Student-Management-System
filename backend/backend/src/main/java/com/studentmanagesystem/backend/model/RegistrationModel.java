package com.studentmanagesystem.backend.model;

import lombok.Data;

import java.sql.Timestamp;
import java.sql.Date;

@Data
public class RegistrationModel {
    
    private long registration_no; // pk, server-side (java) auto-increment
    private Timestamp registered_on; // generated

    private String username;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private Date dob;
    private String role; // use Constants.Roles

}
