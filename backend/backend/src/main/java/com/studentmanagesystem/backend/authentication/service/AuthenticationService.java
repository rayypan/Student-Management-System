package com.studentmanagesystem.backend.authentication.service;

import com.studentmanagesystem.backend.authentication.model.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import com.studentmanagesystem.backend.authentication.dto.LoginRequest;
import com.studentmanagesystem.backend.authentication.dto.LoginResponse;
import com.studentmanagesystem.backend.authentication.repo.UserRepository;
import com.studentmanagesystem.backend.authentication.util.JwtUtil;
import com.studentmanagesystem.backend.errors.UserMessageException;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser = userRepo.findByEmail(request.email);

        if (optionalUser.isEmpty()) {
            throw new UserMessageException(401, "Invalid credential");
        } else if (!optionalUser.get().password.equals(request.password)) {
            throw new UserMessageException(401, "Invalid credential");
        }

        User user = optionalUser.get();
        String token = jwtUtil.generateTokens(user.email, user.role);

        LoginResponse response = new LoginResponse();
        response.token = token;
        response.expires = "15 Mins";

        return response;
    }

    public User getCurrentUserAuthDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object maybeUser = authentication.getPrincipal();
        if (maybeUser instanceof User) {
            return (User) maybeUser;
        }
        return null;
    }

}
