package com.studentmanagesystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentmanagesystem.backend.dtos.StudentRegistrationDTO;
import com.studentmanagesystem.backend.model.StudentDetailsModel;
import com.studentmanagesystem.backend.repo.RegistrationRepo;
import com.studentmanagesystem.backend.repo.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private RegistrationRepo registrationRepo;

    public StudentDetailsModel registration(StudentRegistrationDTO reqBody) {
        long registrationNo = registrationRepo.create(
                reqBody.username, reqBody.email, reqBody.password,
                reqBody.firstName, reqBody.lastName,
                reqBody.dob, reqBody.role);

        studentRepo.create(registrationNo, reqBody.subjects);

        return studentRepo.readByRegnNo(registrationNo);
    }

    // Used by both admin (update by roll) & student self (update details)
    public StudentDetailsModel updateDetails(long rollNo, StudentRegistrationDTO reqBody) {
        long registrationNo = studentRepo.getRegistrationNo(rollNo);
        registrationRepo.update(registrationNo, reqBody.firstName, reqBody.lastName);
        studentRepo.update(registrationNo, reqBody.subjects);
        return studentRepo.readByRegnNo(registrationNo);
    }

    // Used by both admin (read by roll) & student self (read details)
    public StudentDetailsModel getDetails(long rollNo) {
        long registrationNo = studentRepo.getRegistrationNo(rollNo);
        return studentRepo.readByRegnNo(registrationNo);
    }

    // Used by admin (read all (only shows enrolled ones))
    public List<StudentDetailsModel> getAllEnrolled(){
        return studentRepo.readIsEnrolled();   
    }

    // Used by admin (read all (only shows enrolled ones))
    public List<StudentDetailsModel> getAllToBeEnrolled(){
        return studentRepo.readIsNotYetEnrolled();   
    }

    // Used by admin (delete by roll)
    public boolean deleteDetails(Long rollNo) {
        long registrationNo = studentRepo.getRegistrationNo(rollNo);
        studentRepo.deleteByRegnNo(registrationNo);
        registrationRepo.deleteByRegNo(registrationNo);
        return true;  
    }

    //Set is_enrolled true on accept
    public boolean acceptEnrollment(Long rollNo){
        long registationNo = studentRepo.getRegistrationNo(rollNo);
        registrationRepo.setRegisteredOn(registationNo);
        studentRepo.setIsEnrolled(registationNo);
        return true;
    }

    //On reject - delete record from stud and registration db
    public boolean rejectEnrollment(Long rollNo) {
        long registationNo = studentRepo.getRegistrationNo(rollNo);
        studentRepo.deleteOnStudentReject(registationNo);
        registrationRepo.deleteOnStudentReject(registationNo);
        return true;
    }
}

