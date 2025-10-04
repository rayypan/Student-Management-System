package com.example.demo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Student;

@Repository
public class StudentRepository implements IStudentRepository {

    @Autowired
    private DummyStudentRepository dummystudentrepo;

    @Override
    public void save(Student student) {
        // Example real SQL (for future)
        // String sql = "INSERT INTO student (...) VALUES (?, ?, ?, ...)";
        dummystudentrepo.save(student);

    }

    @Override
    public void delete(int roll) {
        // Example SQL
        // String sql = "DELETE FROM student WHERE roll = ?";
        dummystudentrepo.delete(roll);
    }

    @Override
    public void updateFname(int roll, String fname) {
        // Example SQL
        // String sql = "UPDATE student SET firstName = ? WHERE roll = ?";
        dummystudentrepo.updateFname(roll, fname);
    }

    @Override
    public void updateLname(int roll, String lname) {
        // Example SQL
        // String sql = "UPDATE student SET lastName = ? WHERE roll = ?";
        dummystudentrepo.updateLname(roll, lname);
    }

    @Override
    public void updateEmail(int roll, String email) {
        // Example SQL
        // String sql = "UPDATE student SET email = ? WHERE roll = ?";
        dummystudentrepo.updateEmail(roll, email);
    }

    @Override
    public void addSubject(int roll, String subject) {
        dummystudentrepo.addSubject(roll, subject);

    }

    @Override
    public void removeSubject(int roll, String subject) {
        dummystudentrepo.removeSubject(roll, subject);
    }

    @Override
    public Student findByRoll(int roll) {
        return dummystudentrepo.findByRoll(roll);
    }

    @Override
    public List<Student> findAll() {
        return dummystudentrepo.findAll();
    }

}
