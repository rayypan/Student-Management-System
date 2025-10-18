package com.studentmanagesystem.backend.repo;

// RegistrationRepo:

// - create(username, email, password, firstName, lastName, dob, role)
//     - sql: INSERT INTO registration_table
//                (username, email, password, first_name, last_name, dob, role)
//            VALUES
//                (username, email, password, firstName, lastName, dob, role);
//     - sql: SELECT registration_no FROM registration_table WHERE email = email;
//     - return registration_no

// - update(registrationNo, { firstName | null, lastName | null })
//     - --- COALESCE keeps first_name (or last_name) unchanged if firstName (or lastName) is null
//     - sql: UPDATE registration_table SET
//                first_name = COALESCE(firstName, first_name),
//                last_name = COALESCE(lastName, last_name)
//            WHERE registration_no = registrationNo;

// - setRegisteredOn(registrationNo)
//     - time = Instant.now().toString();
//     - sql: UPDATE registration_table SET
//                registered_on = time
//            WHERE 
//                registration_no = registrationNo
//                AND
//                registered_on IS NULL;

// - delete(registrationNo)
//     - sql: DELETE FROM registration_table
//            WHERE registration_no = registrationNo;

// - read(registrationNo)
//     - sql: SELECT registration_no, username, email, password, first_name, last_name, dob, role, registered_on
//            FROM registration_table
//            WHERE registration_no = registrationNo;
//     - RegistrationModel r = new RegistrationModel();
//     -    r.set: registration_no, username, email, password, first_name, last_name, dob, role, registered_on
//     - return r

public class RegistrationRepo {

}
