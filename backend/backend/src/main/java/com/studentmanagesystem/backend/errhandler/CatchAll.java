package com.studentmanagesystem.backend.errhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.studentmanagesystem.backend.dtos.GenericMessage;
import com.studentmanagesystem.backend.errors.UserMessageException;

import io.jsonwebtoken.JwtException;

@ControllerAdvice
public class CatchAll {
    // Catch for custom thrown UserMessageException
    @ExceptionHandler(UserMessageException.class)
    public ResponseEntity<GenericMessage> handleUserMessageException(UserMessageException ex) {
        System.err.println(ex);
        GenericMessage gm = new GenericMessage(ex.getStatus(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(gm);
    }

    // Catch for any JwtException
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<GenericMessage> handleJwtException(JwtException ex) {
        System.err.println(ex);
        GenericMessage gm = new GenericMessage(HttpStatus.UNAUTHORIZED.value(), "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(gm);
    }

    // Catch for any IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GenericMessage> handleIllegalArgumentException(IllegalArgumentException ex) {
        System.err.println(ex);
        GenericMessage gm = new GenericMessage(HttpStatus.BAD_REQUEST.value(), "Bad Request");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(gm);
    }

    // Catch-all for any other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericMessage> handleGenericException(Exception ex) {
        ex.printStackTrace();
        GenericMessage gm = new GenericMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gm);
    }
}
