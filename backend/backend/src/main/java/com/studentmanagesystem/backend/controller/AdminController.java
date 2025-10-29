package com.studentmanagesystem.backend.controller;

import java.util.List;

import com.studentmanagesystem.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagesystem.backend.model.RegistrationModel;
import com.studentmanagesystem.backend.model.StudentDetailsModel;
import com.studentmanagesystem.backend.authentication.model.User;
import com.studentmanagesystem.backend.dtos.AdminRegistrationDTO;
import com.studentmanagesystem.backend.dtos.StudentRegistrationDTO;
import com.studentmanagesystem.backend.service.AdminService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

// All these are only called by role == ADMIN
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StudentService studentService;

    /*------------------------------------------------------------------------*/

    // Admin Details by registration No
    @GetMapping("/api/admin/get")
    public RegistrationModel getAdminDetails(@AuthenticationPrincipal User user) {
        return adminService.getDetails(user.registrationNo);
    }

    // Read by rollno (is_enrolled = true)
    @GetMapping("/api/admin/student/get-by-roll")
    public StudentDetailsModel getSingleStudentDetails(@RequestParam(required = true) Long rollNo) {
        return studentService.getDetails(rollNo);
    }

    // Read All (is_enrolled = true)
    @GetMapping("/api/admin/student/get-all-enrolled")
    public List<StudentDetailsModel> getEnrolledStudents() {
        return studentService.getAllEnrolled();
    }

    // Enrolled button -> show name of students (is_enrolled = false)
    @GetMapping("/api/admin/student/get-all-notenrolled")
    public List<StudentDetailsModel> getToBeEnrolledStudents() {
        return studentService.getAllToBeEnrolled();
    }

    /*------------------------------------------------------------------------*/

    // Registration - Admin
    // Made auth so that one can register without login
    @PostMapping("/auth/admin/register")
    public RegistrationModel register(@RequestBody AdminRegistrationDTO reqBody) {
        RegistrationModel regnModel = adminService.register(reqBody);
        return regnModel;
    }

    // Profile update
    @PostMapping("/api/admin/update")
    public RegistrationModel updateAdminDetails(
            @AuthenticationPrincipal User user,
            @RequestBody AdminRegistrationDTO reqBody) {
        return adminService.updateDetails(user.registrationNo, reqBody);
    }

    // Student Details Update by rollNo
    @PostMapping("/api/admin/student/update-by-roll")
    public StudentDetailsModel updateDetails(
            @RequestParam(required = true) Long rollNo,
            @RequestBody StudentRegistrationDTO reqBody) {
        return studentService.updateDetails(rollNo, reqBody);
    }

    // Accepting the enrollment - is_enrolled = true
    @PostMapping("/api/admin/student/enroll-by-roll")
    public boolean enrollStudent(@RequestParam(required = true) Long rollNo) {
        return studentService.acceptEnrollment(rollNo);
    }

    // Rejecting the enrollment - whose enrollment is false
    @PostMapping("/api/admin/student/reject-by-roll")
    public boolean rejectStudent(@RequestParam(required = true) Long rollNo) {
        return studentService.rejectEnrollment(rollNo);
    }

    /*------------------------------------------------------------------------*/

    // Not to be used by admin
    @DeleteMapping("/api/admin/delete")
    public boolean deleteAdminDetails(@AuthenticationPrincipal User user) {
        return adminService.deleteDetails(user.registrationNo);
    }

    // Delete student details
    @DeleteMapping("/api/admin/student/delete-by-roll")
    public boolean deleteStudentDetails(@RequestParam(required = true) Long rollNo) {
        return studentService.deleteDetails(rollNo);
    }
}
