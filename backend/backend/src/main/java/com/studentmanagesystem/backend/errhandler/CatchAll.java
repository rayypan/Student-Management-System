package com.studentmanagesystem.backend.errhandler;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.studentmanagesystem.backend.dtos.GenericMessage;
import com.studentmanagesystem.backend.errors.UserMessageException;

import io.jsonwebtoken.JwtException;

@ControllerAdvice
public class CatchAll {
    // Catch for custom thrown UserMessageException
    @ExceptionHandler(UserMessageException.class)
    public ResponseEntity<GenericMessage> handler(UserMessageException ex) {
        GenericMessage gm = new GenericMessage(ex.getStatus(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(gm);
    }

    // Catch for any JwtException
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<GenericMessage> handler(JwtException ex) {
        GenericMessage gm = new GenericMessage(HttpStatus.UNAUTHORIZED.value(), "Invalid Credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(gm);
    }

    // Catch for any DuplicateKeyException
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<GenericMessage> handler(DuplicateKeyException ex) {
        GenericMessage gm = new GenericMessage(HttpStatus.CONFLICT.value(), "Already Exists");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(gm);
    }

    // Catch for any NoResourceFoundException
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<GenericMessage> handler(NoResourceFoundException ex) {
        GenericMessage gm = new GenericMessage(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(gm);
    }

    // Catch for any IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GenericMessage> handler(IllegalArgumentException ex) {
        GenericMessage gm = new GenericMessage(HttpStatus.BAD_REQUEST.value(), "Bad Request");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(gm);
    }

    // Catch-all for any other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericMessage> handler(Exception ex) {
        ex.printStackTrace();
        GenericMessage gm = new GenericMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gm);
    }
}
