package com.studentmanagesystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagesystem.backend.model.StudentDetailsModel;
import com.studentmanagesystem.backend.dtos.StudentRegistrationDTO;
import com.studentmanagesystem.backend.service.StudentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

// All these are only called by role == STUDENT
@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Not GetByRoll coz roll (or maybe regn no) will come from auth (maybe)
    @GetMapping("/api/student/get")
    public StudentDetailsModel getDetails(@RequestParam(required = true) Long rollNo) {
        return studentService.getDetails(rollNo);
    }

    @PostMapping("/api/student/register")
    public StudentDetailsModel register(@RequestBody StudentRegistrationDTO reqBody) {
        StudentDetailsModel studModel = studentService.registration(reqBody);
        return studModel;
    }

    // Not UpdateByRoll coz roll (or maybe regn no) will come from auth (maybe)
    @PostMapping("/api/student/update")
    public StudentDetailsModel updateDetails(
            @RequestParam(required = true) Long rollNo,
            @RequestBody StudentRegistrationDTO reqBody) {
        return studentService.updateDetails(rollNo, reqBody);
    }
}
