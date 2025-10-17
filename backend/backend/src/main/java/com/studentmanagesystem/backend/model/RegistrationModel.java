package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class RegistrationModel {
    
    private long registration_no;   // auto-increment
    private String dob;
    private String name;
    private String registered_on;   // auto-generated
    private String role;            // use Roles as enum
    private String username;
    private String email;
    private String password;

}
