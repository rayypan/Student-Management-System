package com.studentmanagesystem.backend.repo;

import java.time.LocalDateTime;
import java.time.LocalDate;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.studentmanagesystem.backend.errors.UserMessageException;
import com.studentmanagesystem.backend.model.Constants;
import com.studentmanagesystem.backend.model.RegistrationModel;
import com.studentmanagesystem.backend.model.StudentDetailsModel;

@Repository
public class StudentRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // to get roll number based on registration number
    public long getRollNo(long registrationNo) {

        String sql = String.format("""
                SELECT roll_no FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        List<Long> rollNo = jdbcTemplate.query(sql, (row, rn) -> row.getLong("roll_no"), registrationNo);
        // handles the roll number if not found then throw error
        if (rollNo.isEmpty()) {
            throw new UserMessageException(404, "Roll number not found!");
        }
        return rollNo.get(0);
    }

    // to get the registration number against the existing roll number
    public long getRegistrationNo(long rollNo) {

        String sql = String.format("""
                SELECT registration_no FROM %s
                WHERE roll_no = ?;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        List<Long> registrationNo = jdbcTemplate.query(sql, (row, rn) -> row.getLong("registration_no"), rollNo);
        // handles the registration number if not found then throw error
        if (registrationNo.isEmpty()) {
            throw new UserMessageException(404, "Registration number not found!");
        }
        return registrationNo.get(0);
    }

    // create operation of CRUD for student/writes into the student table
    public void create(long registrationNo, String subjects) {

        String sql = String.format("""
                INSERT INTO %s (registration_no, subjects, is_enrolled)
                VALUES (?, ?, FALSE);
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo, subjects);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Create student failed");
        }
    }

    // update operation
    public void update(long registrationNo, String subjects) {
        // to throw error if the subject field is empty
        if (subjects == null || subjects.length() == 0) {
            throw new UserMessageException(400, "Subjects should not be blank");
        }

        String sql = String.format("""
                UPDATE %s SET
                    subjects = ?
                WHERE registration_no = ?;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, subjects, registrationNo);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Update student failed");
        }
    }

    // delete operation - then admin rejects the student then delete from stud
    // database as well as registration database
    public void deleteOnReject(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE
                    registration_no = ?
                    AND
                    is_enrolled = FALSE;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Reject student failed");
        }
    }

    // to delete the entry from the student database - when delete operation is
    // performed by registration number
    public void deleteByRegnNo(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Delete student failed");
        }
    }

    public void deleteOnStudentReject(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE
                  registration_no = ?
                  AND
                  is_enrolled = FALSE;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Delete student on rejection failed");
        }
    }

    // to set the is_enrolled status to true if the admin accepts and change the
    // is_enrolled from false to true
    public void setIsEnrolled(long registrationNo) {
        String sql = String.format("""
                UPDATE %s SET
                    is_enrolled = TRUE
                WHERE registration_no = ?;
                """,
                Constants.TableNames.STUDENT_DETAILS);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        // handles error
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Set student is_enrolled failed");
        }
    }

    // a mapper method that will map the database rows and colms to object.
    public StudentDetailsModel mapToStudent(ResultSet rs) throws SQLException {

        // map from database to student repo
        StudentDetailsModel s = new StudentDetailsModel();
        s.setRollNo(rs.getLong("roll_no"));
        s.setSubjects(rs.getString("subjects"));
        s.setEnrolled(rs.getBoolean("is_enrolled"));

        // map from database to registration repo
        RegistrationModel r = new RegistrationModel();
        r.setDob(rs.getObject("dob", LocalDate.class));
        r.setEmail(rs.getString("email"));
        r.setFirstName(rs.getString("first_name"));
        r.setLastName(rs.getString("last_name"));
        r.setPassword(rs.getString("password"));
        r.setRegisteredOn(rs.getObject("registered_on", LocalDateTime.class));
        r.setRegistrationNo(rs.getLong("registration_no"));
        r.setRole(rs.getString("role"));
        r.setUsername(rs.getString("username"));

        s.setRegistration(r);

        return s;
    }

    // basic query string to be reused for read student
    private static String BASE_QUERY = """
            SELECT s.registration_no AS registration_no,
                   username,   email,       password,
                   first_name,      last_name,  dob,         role,     registered_on,
                   roll_no,         subjects,   is_enrolled """ +
            " FROM " + Constants.TableNames.REGISTRATION + " r " +
            " JOIN " + Constants.TableNames.STUDENT_DETAILS + " s " +
            " ON r.registration_no = s.registration_no ";

    // get all students who are enrolled (used by admin read all page)
    public List<StudentDetailsModel> readIsEnrolled() {
        String sql = BASE_QUERY + " WHERE is_enrolled = TRUE;";
        return jdbcTemplate.query(sql, (row, rn) -> mapToStudent(row));
    }

    // get all students who are not enrolled yet (used by admin enroll page)
    public List<StudentDetailsModel> readIsNotYetEnrolled() {
        String sql = BASE_QUERY + " WHERE is_enrolled = FALSE;";
        return jdbcTemplate.query(sql, (row, rn) -> mapToStudent(row));
    }

    // get a single student by regn number
    public StudentDetailsModel readByRegnNo(long registrationNo) {
        String sql = BASE_QUERY + " WHERE s.registration_no = ?;";
        // get result of db query as a list of students
        List<StudentDetailsModel> list = jdbcTemplate.query(sql, (row, rn) -> mapToStudent(row), registrationNo);
        // if list is empty it means student not found
        if (list.isEmpty()) {
            throw new UserMessageException(404, "Student not found");
        }
        // return single list item
        return list.get(0);
    }

    public boolean getIsEnrolled(long registrationNo) {
        StudentDetailsModel s = this.readByRegnNo(registrationNo);
        return s.isEnrolled();
    }

}

