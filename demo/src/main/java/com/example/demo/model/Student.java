package com.example.demo.model;

import java.util.Set;

import lombok.Data;

@Data
public class Student {

    private String firstName;
    private String lastName;
    private int rollNo;
    private String email;
    private Set<String> subjectName;

}


