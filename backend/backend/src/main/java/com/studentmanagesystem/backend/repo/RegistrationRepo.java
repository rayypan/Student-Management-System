package com.studentmanagesystem.backend.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.studentmanagesystem.backend.model.Constants;
import com.studentmanagesystem.backend.model.RegistrationModel;
import com.studentmanagesystem.backend.errors.UserMessageException;

@Repository
public class RegistrationRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // DTO / Wrapper to map the fields that are comming from database to the field
    // of the class
    public static RegistrationModel rowMapper(ResultSet row) throws SQLException {

        RegistrationModel r = new RegistrationModel();

        r.setDob(row.getObject("dob", LocalDate.class));
        r.setEmail(row.getString("email"));
        r.setFirstName(row.getString("first_name"));
        r.setLastName(row.getString("last_name"));
        r.setPassword(row.getString("password"));
        r.setRegisteredOn(row.getObject("registered_on", LocalDateTime.class));
        r.setRegistrationNo(row.getLong("registration_no"));
        r.setRole(row.getString("role"));
        r.setUsername(row.getString("username"));

        return r;
    }

    public long create(
            String userName, String email, String password,
            String firstName, String lastName, LocalDate dob, String role) {

        String sql = String.format("""
                INSERT INTO %s
                (username, email, password, first_name, last_name, dob, role)
                VALUES (?,?,?,?,?,?,?);
                """,
                Constants.TableNames.REGISTRATION);

        // TODO: Handle relevant exceptions from DB
        int rowsAffected = jdbcTemplate.update(
                sql,
                userName, email, password,
                firstName, lastName, dob, role);

        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Registration failed");
        }

        // return the new registration number
        List<Long> registrationNo = jdbcTemplate.query(
                String.format("SELECT registration_no FROM %s WHERE email = ?;",
                        Constants.TableNames.REGISTRATION),
                (row, rn) -> row.getLong("registration_no"),
                email);

        if (registrationNo.isEmpty()) {
            throw new UserMessageException(500, "Internal Server Error",
                    new Exception("Registration was created but registration_no was not found using email"));
        }

        return registrationNo.get(0);

    }

    // update operation
    public void update(long registrationNo, String firstName, String lastName) {
        if (firstName == null || lastName == null || firstName.equals("") || lastName.equals("")) {
            throw new UserMessageException(400, "First and last names should not be blank");
        }

        String sql = String.format("""
                UPDATE %s SET
                    first_name = ?,
                    last_name = ?
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION);

        int rowsAffected = jdbcTemplate.update(sql, firstName, lastName, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Update registration failed");
        }
    }

    public void resetPassword(long registrationNo, String password) {
        if (password == null || password.equals("")) {
            throw new UserMessageException(400, "Password should not be blank");
        }

        String sql = String.format("""
                UPDATE %s SET password = ?
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION);

        int rowsAffected = jdbcTemplate.update(sql, password, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Reset password failed");
        }
    }

    public void setRegisteredOn(long registrationNo) {
        LocalDateTime currentDateTime = LocalDateTime.now();

        String sql = String.format("""
                UPDATE %s SET
                    registered_on = ?
                WHERE
                    registration_no = ?
                    AND
                    registered_on IS NULL;
                """,
                Constants.TableNames.REGISTRATION);

        int rowsAffected = jdbcTemplate.update(sql, currentDateTime, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Set registered_on failed");
        }
    }

    public void deleteByRegNo(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Delete registration failed");
        }
    }

    public void deleteOnStudentReject(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE
                    registration_no = ?
                    AND
                    registered_on IS NULL;
                """,
                Constants.TableNames.REGISTRATION);

        int rowsAffected = jdbcTemplate.update(sql, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Delete registration on student reject failed");
        }
    }

    public RegistrationModel read(long registrationNo) {
        String sql = String.format("""
                SELECT * FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION);

        List<RegistrationModel> list = jdbcTemplate.query(
                sql,
                (row, rn) -> RegistrationRepo.rowMapper(row),
                registrationNo);

        if (list.isEmpty()) {
            throw new UserMessageException(404, "No Records Found!");
        }

        return list.get(0);
    }

    public long getRegistrationNo(String email) {
        String sql = String.format("""
                SELECT registration_no FROM %s
                WHERE email = ?;
                """,
                Constants.TableNames.REGISTRATION);

        List<Long> registrationNo = jdbcTemplate.query(sql, (row, rn) -> row.getLong("registration_no"), email);
        if (registrationNo.isEmpty()) {
            throw new UserMessageException(404, "No Records Found!");
        }
        return registrationNo.get(0);
    }
}
