package com.studentmanagesystem.backend.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagesystem.backend.authentication.dto.LoginRequest;
import com.studentmanagesystem.backend.authentication.dto.LoginResponse;
import com.studentmanagesystem.backend.authentication.service.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//for login
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

}
