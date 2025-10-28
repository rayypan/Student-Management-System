package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class StudentDetailsModel {

    private long rollNo; // pk, sql-side autoincrement

    private RegistrationModel registration; // filled in using registrationNo (fk)

    private String subjects;
    private boolean enrolled;

}
