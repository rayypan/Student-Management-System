package com.studentmanagesystem.backend.errhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.studentmanagesystem.backend.dtos.GenericMessage;
import com.studentmanagesystem.backend.errors.UserMessageException;

import io.jsonwebtoken.JwtException;

import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class CatchAll {
    // Catch for custom thrown UserMessageException
    @ExceptionHandler(UserMessageException.class)
    public GenericMessage handleResourceNotFoundException(UserMessageException ex) {
        return new GenericMessage(ex.getStatus(), ex.getMessage());
    }

    // Catch for any JwtException
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<String> handleJwtException(JwtException ex) {
        System.err.println(ex.getStackTrace());
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    // Catch for any IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        System.err.println(ex.getStackTrace());
        return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
    }

    // Catch-all for any other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        System.err.println(ex.getStackTrace());
        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
