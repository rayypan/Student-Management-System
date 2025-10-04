package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class StudentController {
    @Autowired

    private StudentService studservice;

    @PostMapping("/api/student")
    public String addNewStudent(@RequestBody Student studentrequestbody) {
        // TODO: subjects

        System.out.println(studentrequestbody);
        System.out.println(studentrequestbody.getSubjectName().getClass());

        studservice.save(
                studentrequestbody.getFirstName(),
                studentrequestbody.getLastName(),
                studentrequestbody.getEmail(),
                new ArrayList<String>(studentrequestbody.getSubjectName()),
                studentrequestbody.getRollNo());

        return "Post Request Successfull";
    }

    @GetMapping({
            "/api/student", // allows getting all students
            "/api/student/{roll}" // allows getting one specific student
    })
    public List<Student> findStudent(@PathVariable Integer roll) {
        if (roll == null || roll <= 0)
            return studservice.findAll(0);
        else
            return studservice.findAll(roll);
    }

    @PatchMapping("/api/student/{roll}")
    /// PATCH /api/student/45 { firstName: "Something", lastName: "Something" } rollNo(int), email, subjectName
    /// if (reqBody.email != null) { ... }
    /// if ()
    public String updateStudentInfo(@PathVariable Integer roll, @RequestBody Student reqBody) {
        if (reqBody.getEmail() != null) {
            studservice.update(roll, StudentService.UpdateAction.UPDATE_EMAIL, reqBody.getEmail(), null, null, null);
        }
        if (reqBody.getSubjectName() != null) {
            // TODO
            // String subject = null;
            return "Error: Cannot change subject name yet";
            // studservice.update(roll, StudentService.UpdateAction.ADD_SUBJECT, null,
            // subject, null, null);
            // studservice.update(roll, StudentService.UpdateAction.REMOVE_SUBJECT, null,
            // subject, null, null);
        }
        if (reqBody.getFirstName() != null) {
            studservice.update(roll, StudentService.UpdateAction.UPDATE_FNAME, null, null, reqBody.getFirstName(),
                    null);
        }
        if (reqBody.getLastName() != null) {
            studservice.update(roll, StudentService.UpdateAction.UPDATE_LNAME, null, null, null, reqBody.getLastName());
        }

        return "Success Update";
    }

    @PatchMapping("/api/student/addsubject/{roll}")
    public String addSubject(@PathVariable Integer roll, @RequestBody Student reqBody) {
        if (reqBody.getSubjectName() == null) {
            return "No subject given";
        }
        if (reqBody.getSubjectName().size() > 0) {
            for (String item : reqBody.getSubjectName()) {
                studservice.update(roll, StudentService.UpdateAction.ADD_SUBJECT, null, item,
                        null,
                        null);
            }
            return String.format("Subjects '%s' added", reqBody.toString());
        }
        return "No subject given";
    }

    @PatchMapping("/api/student/remove-subject/{roll}")
    public String removeSubject(@PathVariable Integer roll, @RequestBody Student reqBody) {
        if (reqBody.getSubjectName() == null) {
            return "No subject given";
        }
        if (reqBody.getSubjectName().size() > 0) {
            for (String item : reqBody.getSubjectName()) {
                studservice.update(roll, StudentService.UpdateAction.REMOVE_SUBJECT, null, item,
                        null,
                        null);
            }
            return String.format("Subjects '%s' removed", reqBody.toString());
        }
        return "No subject given";
    }

    @DeleteMapping("/api/student/{roll}")
    public String deleteStudent(@PathVariable Integer roll) {
        if (roll == null) {
            return "Wrong Param";
        }
        studservice.delete(roll);

        return "Sucess Delete";
    }

    final String UPLOAD_FOLDER_PATH = "demo/src/main/resources/static/uploads/";

    @PostMapping("/api/multi-upload")
    public String form(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("files") MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_FOLDER_PATH);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        String resFmt = "Received POST w/ name = %s & email = %s.\n"
                + "File will be accessible at localhost:8080/uploads/%s";
        return String.format(resFmt, name, email, file.getOriginalFilename());
    }
}
