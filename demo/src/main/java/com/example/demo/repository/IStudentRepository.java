package com.example.demo.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Student;

@Repository
public interface IStudentRepository {
    void save(Student student);

    void delete(int roll);

    void updateFname(int roll, String fname);
    void updateLname(int roll, String lname);

    void updateEmail(int roll, String email);

    void addSubject(int roll, String subject);

    void removeSubject(int roll, String subject);

    Student findByRoll(int roll);

    List<Student> findAll();
}
