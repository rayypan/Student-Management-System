package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class StudentDetailsModel {

    private long roll_no; // pk, sql-side autoincrement

    private RegistrationModel registration;
    private String subjects;
    private boolean is_enrolled;

}
