package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class StudentDetailsModel {

    private int roll_no; // pk, autoincrement

    private RegistrationModel registration;
    private String subjects;
    private boolean is_enrolled;

}
