package com.studentmanagesystem.backend.authentication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.studentmanagesystem.backend.Config;
import com.studentmanagesystem.backend.authentication.dto.LoginRequest;
import com.studentmanagesystem.backend.authentication.dto.LoginResponse;
import com.studentmanagesystem.backend.authentication.model.User;
import com.studentmanagesystem.backend.authentication.repo.UserRepository;
import com.studentmanagesystem.backend.authentication.util.JwtUtil;
import com.studentmanagesystem.backend.errors.UserMessageException;
import com.studentmanagesystem.backend.repo.RegistrationRepo;
import com.studentmanagesystem.backend.service.EmailService;

@Service
public class AuthenticationService {

    /**
     * This is used only to get data from repo, NOT to write
     * Writing is still handled by JDBC coz the JPA Entity for User is incomplete
     */
    @Autowired
    private UserRepository jpaUserRepo;

    /** Used for writes - namely, updating password */
    @Autowired
    private RegistrationRepo jdbcRegnRepo;

    /** Used to generate a token for password reset link */
    @Autowired
    private JwtUtil jwtUtil;

    /** Used to match password - mainly during login */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /** Send emails to users for password reset or username */
    @Autowired
    private EmailService emailService;

    /** App related configurations */
    @Autowired
    private Config config;

    public LoginResponse login(LoginRequest reqBody) {

        Optional<User> optionalUser = jpaUserRepo.findByEmail(reqBody.email);
        if (optionalUser.isEmpty()) {
            throw new UserMessageException(401, "Invalid credential");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(reqBody.password, user.password)) {
            throw new UserMessageException(401, "Invalid credential");
        }

        String token = jwtUtil.generateTokens(user.email, user.role);

        LoginResponse response = new LoginResponse();
        response.token = token;
        response.expires = "15 Mins";
        response.role = user.role;

        return response;
    }

    public User getCurrentUserAuthDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object maybeUser = authentication.getPrincipal();
        if (maybeUser instanceof User user) {
            return user;
        }
        return null;
    }

    public void forgotUsername(String email) {
        Optional<User> user = jpaUserRepo.findByEmail(email);
        // if not found, ensure success by returning silently
        if (user.isEmpty()) {
            return;
        }
        String username = user.get().username;
        String subject = "Your username was found";
        String body = String.format("Your username is: '%s'", username);
        emailService.send(email, subject, body);
    }

    public void sendPasswordResetEmail(String email) {
        Optional<User> user = jpaUserRepo.findByEmail(email);
        // if not found, ensure success by returning silently
        if (user.isEmpty()) {
            return;
        }
        int timeInMin = 5;
        String token = jwtUtil.generateTokens(user.get().email, user.get().role, timeInMin);
        /*
         * WARNING: Compact JWT tokes are Base64 encoded and thus URL safe.
         * If different token variety used, url-encode the token explicitly.
         */
        String link = String.format("%s/reset-password?token=%s", config.getWebappOrigin(), token);
        String body = String.format(
                "Visit %s to reset your password.\n"
                        + "This link expires in %d minutes.\n"
                        + "If not requested by you, ignore this email.\n"
                        + "Rest assured, your account remains secure.",
                link, timeInMin);
        emailService.send(email, "Reset your password", body);
    }

    public void verifyAndResetPassword(String code, String password) {
        String email = jwtUtil.extractEmail(jwtUtil.validateToken(code));
        Optional<User> user = jpaUserRepo.findByEmail(email);
        if (user.isEmpty()) {
            throw new UserMessageException(401, "Invalid credentials");
        }
        String hashedPassword = passwordEncoder.encode(password);
        jdbcRegnRepo.resetPassword(user.get().registrationNo, hashedPassword);
    }

}
