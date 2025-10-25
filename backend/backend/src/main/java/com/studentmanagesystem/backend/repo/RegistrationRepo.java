package com.studentmanagesystem.backend.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;

import com.studentmanagesystem.backend.model.Constants;
import com.studentmanagesystem.backend.model.RegistrationModel;

// RegistrationRepo:

// - create(username, email, password, firstName, lastName, dob, roleEnum)
//     - registration_no = lastRegnNo + 1
//     - sql: INSERT INTO registration_table
//                (registration_no, username, email, password, first_name, last_name, dob, role)
//            VALUES
//                (registration_no, username, email, password, firstName, lastName, dob, role);
//     - lastRegnNo = registration_no
//     - return registration_no

// - update(registrationNo, { firstName, lastName })
//     - sql: UPDATE registration_table SET
//                first_name = firstName
//                last_name = lastName
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

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // DTO / Wrapper to map the fields that are comming from database to the field
    // of the class
    public static RegistrationModel rowMapper(ResultSet row) throws SQLException {

        RegistrationModel r = new RegistrationModel();

        r.setDob(row.getString("dob"));
        r.setEmail(row.getString("email"));
        r.setFirst_name(row.getString("first_name"));
        r.setLast_name(row.getString("last_name"));
        r.setPassword(row.getString("password"));
        r.setRegistered_on(row.getString("registered_on"));
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
            String firstName, String lastName, String dob, String role) {

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

        jdbcTemplate.update(sql, registrationNo, userName, email, password, firstName, lastName, dob, role);

        // save new registration number at last: so if INSERT fails, lastRegistrationNo
        // remains the old value
        lastRegistrationNo = registrationNo;
        // return the new registration number
        return registrationNo;

    }

    public void update(long registrationNo, String firstName, String lastName) {
        String sql = String.format("""
                UPDATE %s SET
                    first_name = ?,
                    last_name = ?
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION_TABLE);

        jdbcTemplate.update(sql, firstName, lastName, registrationNo);
    }

    public void setRegisteredOn(long registrationNo) {
        String time = Instant.now().toString();

        String sql = String.format("""
                UPDATE %s SET
                    registered_on = ?
                WHERE
                    registration_no = ?
                    AND
                    registered_on IS NULL;
                """,
                Constants.TableNames.REGISTRATION_TABLE);

        jdbcTemplate.update(sql, time, registrationNo);
    }

    public void delete(long registrationNo) {
        String sql = String.format("""
                DELETE FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION_TABLE);

        jdbcTemplate.update(sql, registrationNo);
    }

    public RegistrationModel read(long registrationNo) {
        String sql = String.format("""
                SELECT * FROM %s
                WHERE registration_no = ?;
                """,
                Constants.TableNames.REGISTRATION_TABLE);

        List<RegistrationModel> list = jdbcTemplate.query(sql, (row, rn) -> RegistrationRepo.rowMapper(row), registrationNo);

        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
}
