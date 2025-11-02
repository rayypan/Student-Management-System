package com.studentmanagesystem.backend.authentication.model;

import com.studentmanagesystem.backend.model.Constants;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = Constants.TableNames.REGISTRATION_TABLE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long registrationNo;

    public String email;
    public String password;
    public String role;
}
