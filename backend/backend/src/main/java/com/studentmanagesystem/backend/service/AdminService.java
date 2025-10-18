package com.studentmanagesystem.backend.service;

// AdminService:
//
// - create(username, email, password, firstName, lastName, dob, role)
//     - registrationNo = RegistrationRepo.create(username, email, password, firstName, lastName, dob, role)
//     - RegistrationRepo.setRegisteredOn(registrationNo)
//
// - update(registrationNo, { firstName | null, lastName | null })
//     - RegistrationRepo.update(registrationNo, { firstName, lastName })
//
// - read(registrationNo)
//     - return RegistrationRepo.read(registrationNo)

public class AdminService {

}
