package com.example.demo.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Student;

@Repository

public class DummyStudentRepository implements IStudentRepository {

    private final HashMap<Integer, Student> database = new HashMap<>();

    @Override
    public void save(Student student) {
        database.put(student.getRollNo(), student);
    }

    @Override
    public void delete(int roll) {
        database.remove(roll);
    }

    @Override
    public void updateFname(int roll, String fname) {
        Student stud = database.get(roll);
        if (stud == null) {
            return;
        }
        stud.setFirstName(fname);
        database.put(roll, stud);
    }

    @Override
    public void updateLname(int roll, String lname) {
        Student stud = database.get(roll);
        if (stud == null) {
            return;
        }
        stud.setLastName(lname);
        database.put(roll, stud);
    }

    @Override
    public void updateEmail(int roll, String email) {
        Student stud = database.get(roll);
        if (stud == null) {
            return;
        }
        stud.setEmail(email);
        database.put(roll, stud);
    }

    @Override
    public void addSubject(int roll, String subject) {
        Student stud = database.get(roll);
        Set<String> set = stud.getSubjectName();
        set.add(subject);
        stud.setSubjectName(set);
        database.put(roll, stud);
    }

    @Override
    public void removeSubject(int roll, String subject) {
        Student stud = database.get(roll);
        Set<String> subjectSet = stud.getSubjectName();
        if (subjectSet.contains(subject))
            subjectSet.remove(subject);
        else
            System.out.println("Subject Does not Exist");

        /*
         * Student -> {
         * 0. id
         * 1. email
         * 2. first_name
         * 3. last_name
         * 4. subjectName -> Set: [ math, physics, chem ]
         * 
         * set.add(chem) -> add
         * set.has(chem) -> true / false
         * set.remove(chem)
         * 
         * }
         */

        stud.setSubjectName(subjectSet);
    }

    @Override
    public Student findByRoll(int roll) {
        Student stud = database.get(roll);
        return stud;
    }

    @Override
    public List<Student> findAll() {
        ArrayList<Student> stud = new ArrayList<>();
        for (Map.Entry<Integer, Student> mapRow : database.entrySet()) {
            Student s = mapRow.getValue();
            stud.add(s);
        }
        return stud;

    }

}
