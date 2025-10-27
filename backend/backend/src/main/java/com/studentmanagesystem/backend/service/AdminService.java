package com.studentmanagesystem.backend.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentmanagesystem.backend.model.RegistrationModel;
import com.studentmanagesystem.backend.repo.RegistrationRepo;
import com.studentmanagesystem.backend.BackendApplication;
import com.studentmanagesystem.backend.controller.AdminController;
import com.studentmanagesystem.backend.dtos.AdminRegistrationDTO;
import com.studentmanagesystem.backend.errors.UserMessageException;

@Service
public class AdminService {

    @Autowired
    private RegistrationRepo registrationRepo;

    public RegistrationModel register(AdminRegistrationDTO adminRegnDTO) {
        long registrationNo = registrationRepo.create(
                adminRegnDTO.username, adminRegnDTO.email, adminRegnDTO.password,
                adminRegnDTO.firstName, adminRegnDTO.lastName, adminRegnDTO.dob,
                adminRegnDTO.role);

        registrationRepo.setRegisteredOn(registrationNo);

        return registrationRepo.read(registrationNo);
    }

    public RegistrationModel getDetails(long registrationNo) {
        return registrationRepo.read(registrationNo);
    }

    public RegistrationModel updateDetails(long registrationNo, AdminRegistrationDTO adminRegnDTO) {
        registrationRepo.update(registrationNo, adminRegnDTO.firstName, adminRegnDTO.lastName);
        return registrationRepo.read(registrationNo);
    }

    // Not to be used by admin
    public boolean deleteDetails(long registrationNo) {
        registrationRepo.deleteByRegNo(registrationNo);
        return true;
    }
}
