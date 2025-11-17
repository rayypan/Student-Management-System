package com.studentmanagesystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagesystem.backend.model.StudentDetailsModel;
import com.studentmanagesystem.backend.repo.StudentRepo;
import com.studentmanagesystem.backend.dtos.StudentRegistrationDTO;
import com.studentmanagesystem.backend.service.StudentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import com.studentmanagesystem.backend.authentication.model.User;

// All these are only called by role == STUDENT
@RestController
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private StudentService studentService;


    // Not GetByRoll coz roll (or maybe regn no) will come from auth (maybe)
    @GetMapping("/api/student/get")
    public StudentDetailsModel getDetails(@AuthenticationPrincipal User user) {
        long rollNo = studentRepo.getRollNo(user.registrationNo);
        return studentService.getDetails(rollNo);
    }

    // Made auth so that one can register without login
    @PostMapping("/auth/student/register")
    public StudentDetailsModel register(@RequestBody StudentRegistrationDTO reqBody) {
        StudentDetailsModel studModel = studentService.registration(reqBody);
        return studModel;
    }

    // Not UpdateByRoll coz roll (or maybe regn no) will come from auth (maybe)
    @PostMapping("/api/student/update")
    public StudentDetailsModel updateDetails(
            @AuthenticationPrincipal User user,
            @RequestBody StudentRegistrationDTO reqBody) {
        long rollNo = studentRepo.getRollNo(user.registrationNo);
        return studentService.updateDetails(rollNo, reqBody);
    }
}
