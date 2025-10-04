package com.example.demo.model;

import java.util.Set;

import lombok.Data;

@Data
public class Student {

    private String firstName;
    private String lastName;
    private int rollNo;
    private String email;
    private Set<String> subjectName;

}


// ask chagpt:

// req body:
// @Data
// public class Student {

//     private String firstName;
//     private String lastName;
//     private int rollNo;
//     private String email;
//     private Set<String> subjectName;

// }

// controller:
// public String addNewStudent(@RequestBody Student studentrequestbody) {

// issue:

// System.out.println(studentrequestbody.getFirstName());
//         System.out.println(studentrequestbody.getLastName());
//         System.out.println(studentrequestbody.getEmail());
//         System.out.println(studentrequestbody.getRollNo());
//         System.out.println(
//                 studentrequestbody.getSubjectName() == null ? null
//                         : new ArrayList<String>(studentrequestbody.getSubjectName()));
// o/p:
// Aviruk
// Basak
// Avirukbasak@yopmail.com
// 1
// null
