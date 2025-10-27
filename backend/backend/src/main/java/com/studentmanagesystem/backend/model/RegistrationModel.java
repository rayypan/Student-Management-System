package com.studentmanagesystem.backend.model;

import java.time.LocalDateTime;
import java.time.LocalDate;

import lombok.Data;

@Data
public class RegistrationModel {
    
    private long registration_no; // pk, server-side (java) auto-increment
    private LocalDateTime registered_on; // generated

    private String username;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private LocalDate dob;
    private String role; // use Constants.Roles

}
