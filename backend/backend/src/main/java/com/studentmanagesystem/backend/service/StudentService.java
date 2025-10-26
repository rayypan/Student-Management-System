package com.studentmanagesystem.backend.service;

// StudentService:

// - create(username, email, password, firstName, lastName, dob, role, subjects)
//     - registrationNo = RegistrationRepo.create(username, email, password, firstName, lastName, dob, role)
//     - StudentRepo.create(registrationNo, subjects)

// - update(rollNo, { firstName | null, lastName | null, subjects | null })
//     - registrationNo = StudentRepo.getregistrationNo(rollNo)
//     - RegistrationRepo.update(registrationNo, { firstName, lastName })
//     - StudentRepo.update(registrationNo, { subjects })

// - accept(rollNo)
//     - registrationNo = StudentRepo.getregistrationNo(rollNo)
//     - StudentRepo.setEnrolled(registrationNo)
//     - RegistrationRepo.setRegisteredOn(registrationNo)

// - reject(rollNo)
//     - registrationNo = StudentRepo.getRegistrationNo(rollNo)
//     - RegistrationRepo.delete(registrationNo)
//     - StudentRepo.delete(registrationNo)

// - readByRoll(rollNo)
//     - registrationNo = StudentRepo.getRegistrationNo(rollNo)
//     - return StudentRepo.read(registrationNo)

// - readAll()
//     - return StudentRepo.readAll()

// - readEnrolled()
//     - return StudentRepo.readIsEnrolled(true)

// - readNotYetEnrolled()
//     - return StudentRepo.readIsEnrolled(false)

public class StudentService {

    

}
