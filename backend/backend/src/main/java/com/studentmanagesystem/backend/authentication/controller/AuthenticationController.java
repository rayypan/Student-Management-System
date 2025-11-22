package com.studentmanagesystem.backend.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagesystem.backend.authentication.dto.EmailRequest;
import com.studentmanagesystem.backend.authentication.dto.LoginRequest;
import com.studentmanagesystem.backend.authentication.dto.LoginResponse;
import com.studentmanagesystem.backend.authentication.dto.ResetPasswordRequest;
import com.studentmanagesystem.backend.authentication.service.AuthenticationService;
import com.studentmanagesystem.backend.dtos.GenericMessage;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//for login
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest reqBody) {
        return authService.login(reqBody);
    }

    @PostMapping("/forgot-username")
    public GenericMessage forgotUsername(@RequestBody EmailRequest reqBody) {
        authService.forgotUsername(reqBody.email);
        return new GenericMessage("You'll receive an email with your username shortly!");
    }

    // Called by API when user clicks "Reset Password". Sends email with reset code.
    @PostMapping("/reset-password/send-email")
    public GenericMessage sendPasswordResetEmail(@RequestBody EmailRequest reqBody) {
        authService.sendPasswordResetEmail(reqBody.email);
        return new GenericMessage("Password reset email sent");
    }

    // Called by API from the reset password page when user visits it and enters new password
    @PostMapping("/reset-password/verify-and-reset")
    public GenericMessage verifyAndResetPassword(@RequestBody ResetPasswordRequest reqBody) {
        authService.verifyAndResetPassword(reqBody.code, reqBody.password);
        return new GenericMessage("Password reset successfully!");
    }
}
