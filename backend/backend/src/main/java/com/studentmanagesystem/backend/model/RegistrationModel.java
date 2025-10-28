package com.studentmanagesystem.backend.model;

import java.time.LocalDateTime;
import java.time.LocalDate;

import lombok.Data;

@Data
public class RegistrationModel {
    
    private long registrationNo; // pk, sql-side autoincrement
    private LocalDateTime registeredOn; // generated (in java)

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String role; // use Constants.Roles

}
