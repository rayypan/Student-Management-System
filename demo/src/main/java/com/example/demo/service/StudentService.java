package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.example.demo.model.Student;
import com.example.demo.repository.IStudentRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    public enum UpdateAction {
        ADD_SUBJECT,
        REMOVE_SUBJECT,
        UPDATE_EMAIL,
        UPDATE_FNAME,
        UPDATE_LNAME
    }

    @Autowired
    private StudentRepository studrepo; // for the db connected repo

    // should ideally be initialized to 0 in a default constructor
    private int studId = 0; // maintain auto incremented id for students
                            // we are letting the student service handle
                            // some additional logic so that the data from
                            // controller may be cleanly passed onto the repo

    public void save(String fname, String lname, String email, List<String> subjects, int roll_no) {
        Set<String> subjectSet = new HashSet<>(subjects); // converts the List we get from controller
                                                          // to the set that STudent model expects

        // create new student
        Student stud = new Student();

        // set attributes (should be done in a parameterized constructor
        // like `Student stud = new Student(roll, email, fname, lname, subjectSet);`
        // but we dont have a param constructor)
        stud.setFirstName(fname);
        stud.setLastName(lname);
        stud.setEmail(email);
        stud.setSubjectName(subjectSet);

        // set auto incremented roll no.
        stud.setRollNo(roll_no);

        // save to repo
        studrepo.save(stud);

        // increment roll number for next student
        this.studId++;
    }

    public void update(int roll, UpdateAction action, String email, String subject, String fname, String lname) {
        switch (action) {
            case ADD_SUBJECT:
                studrepo.addSubject(roll, subject);
                break;
            case REMOVE_SUBJECT:
                studrepo.removeSubject(roll, subject);
                break;
            case UPDATE_EMAIL:
                studrepo.updateEmail(roll, email);
                break;
            case UPDATE_FNAME:
                studrepo.updateFname(roll, fname);
                break;
            case UPDATE_LNAME:
                studrepo.updateLname(roll, lname);
                break;
            default:
        }
    }

    public void delete(int roll) {
        studrepo.delete(roll);
    }

    public List<Student> findAll(int roll) {
        if (roll == 0) {
            return studrepo.findAll();
        } else {
            return new ArrayList<>(List.of(studrepo.findByRoll(roll)));
        }
        
    }
}
