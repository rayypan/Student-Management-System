package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class RegistrationModel {
    
    private long registration_no; // pk, autoincrement
    private String registered_on; // generated

    private String username;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private String dob;
    private RoleEnum role;

}
