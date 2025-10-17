package com.studentmanagesystem.backend.model;

import lombok.Data;

@Data
public class StudentDetailsModel {

    private int roll_no;                // auto-incr
    private String subjects;
    private long fk_registration_no;    // fk to RegistrationModel
    private boolean is_enrolled;

}
