package com.studentmanagesystem.backend.repo;

// StudentRepo:

// - create(registrationNo, subjects)
//     - sql: INSERT INTO student_table (registration_no, subjects, is_enrolled)
//            VALUES (registrationNo, subjects, FALSE);

// - getRollNo(registrationNo)
//     - sql: SELECT roll_no
//            FROM student_table
//            WHERE registration_no = registrationNo;
//     - return roll_no

// - getRegistrationNo(rollNo)
//     - sql: SELECT registration_no
//            FROM student_table
//            WHERE roll_no = rollNo;
//     - return registration_no

// - update(registrationNo, { subjects | null })
//     - --- COALESCE keeps subjects if new subjects is null
//     - sql: UPDATE student_table SET
//                subjects = COALESCE(subjects, subjects)
//            WHERE registration_no = registrationNo;

// - read(status: true | false, registrationNo: long)
//     - sql: SELECT
//                r.registration_no AS r_registration_no,
//                r.username        AS r_username,
//                r.email           AS r_email,
//                r.password        AS r_password,
//                r.first_name      AS r_first_name,
//                r.last_name       AS r_last_name,
//                r.dob             AS r_dob,
//                r.role            AS r_role,
//                r.registered_on   AS r_registered_on,
//                s.roll_no         AS s_roll_no,
//                s.subjects        AS s_subjects,
//                s.is_enrolled     AS s_is_enrolled
//            FROM registration_table r
//            JOIN student_table s ON r.registration_no = s.registration_no
//            WHERE s.is_enrolled = status;
//     - StudentModel s = new StudentModel();
//     -    s.set: s_roll_no, s_subjects, s_is_enrolled
//     - RegistrationModel r = new RegistrationModel();
//     -    r.set: r_registration_no, r_username, r_email, r_password, r_first_name, r_last_name, r_dob, r_role, r_registered_on
//     - s.setRegistration(r)
//     - return s

// - setEnrolled(registrationNo)
//     - sql: UPDATE student_table SET
//                is_enrolled = TRUE
//            WHERE
//                registration_no = registrationNo
//                AND
//                is_enrolled IS FALSE;

// - delete(registrationNo)
//     - sql: DELETE FROM student_table
//            WHERE registration_no = registrationNo;
           
public class StudentRepo {

}
