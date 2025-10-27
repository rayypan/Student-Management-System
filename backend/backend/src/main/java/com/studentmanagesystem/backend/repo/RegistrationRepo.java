package com.studentmanagesystem.backend.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
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
        r.setFirst_name(row.getString("first_name"));
        r.setLast_name(row.getString("last_name"));
        r.setPassword(row.getString("password"));
        r.setRegistered_on(row.getObject("registered_on", LocalDateTime.class));
        r.setRegistration_no(row.getLong("registration_no"));
        r.setRole(row.getString("role"));
        r.setUsername(row.getString("username"));

        return r;
    }

    long lastRegistrationNo = 0;

    long getLastRegistrationNo() {
        if (lastRegistrationNo != 0) {
            // registration number is non-zero, which means it is not reset
            return lastRegistrationNo;
        } else {
            // fetch the last registration number if lastregistration number becomes 0
            String sql = String.format("""
                    SELECT registration_no
                    FROM %s ORDER BY
                    registration_no DESC LIMIT 1;
                    """,
                    Constants.TableNames.REGISTRATION_TABLE);

            List<Long> list = jdbcTemplate.query(sql, (row, rowNum) -> row.getLong("registration_no"));
            // if the the list is empty
            if (list.isEmpty()) {
                return lastRegistrationNo;
            }
            // return the last registration number entered into thee database
            lastRegistrationNo = list.get(0);
            return lastRegistrationNo;
        }
    }

    public long create(
            String userName, String email, String password,
            String firstName, String lastName, LocalDate dob, String role) {

        // get last reg number if needed
        lastRegistrationNo = getLastRegistrationNo();
        // create new registration number
        long registrationNo = lastRegistrationNo + 1;

        String sql = String.format("""
                INSERT INTO %s
                (registration_no, username, email, password, first_name, last_name, dob, role)
                VALUES (?,?,?,?,?,?,?,?);
                """,
                Constants.TableNames.REGISTRATION_TABLE);

        int rowsAffected = jdbcTemplate.update(
                sql, registrationNo,
                userName, email, password,
                firstName, lastName, dob, role);

        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Registration failed");
        }

        // save new registration number at last: so if INSERT fails, lastRegistrationNo
        // remains the old value
        lastRegistrationNo = registrationNo;
        // return the new registration number
        return registrationNo;

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
                Constants.TableNames.REGISTRATION_TABLE);

        int rowsAffected = jdbcTemplate.update(sql, firstName, lastName, registrationNo);
        if (rowsAffected == 0) {
            throw new UserMessageException(400, "Update registration failed");
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
                Constants.TableNames.REGISTRATION_TABLE);

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
                Constants.TableNames.REGISTRATION_TABLE);

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
                Constants.TableNames.REGISTRATION_TABLE);

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
                Constants.TableNames.REGISTRATION_TABLE);

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
                Constants.TableNames.REGISTRATION_TABLE);

        Long registrationNo = jdbcTemplate.queryForObject(sql, Long.class, email);
        if (registrationNo == null) {
            throw new UserMessageException(404, "No Records Found!");
        }
        return registrationNo;
    }
}
