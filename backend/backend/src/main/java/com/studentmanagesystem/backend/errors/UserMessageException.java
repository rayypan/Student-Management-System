package com.studentmanagesystem.backend.errors;

import org.springframework.http.HttpStatus;

public class UserMessageException extends RuntimeException {

    private int status;

    public UserMessageException(HttpStatus status, String message) {
        super(message);
        this.status = status.value();
    }

    public UserMessageException(int status, String message) {
        super(message);
        this.status = status;
    }

    public UserMessageException(HttpStatus status, String message, Throwable cause) {
        super(message, cause);
        this.status = status.value();
    }

    public UserMessageException(int status, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

    public int getStatus() {
        return this.status;
    }

    @Override
    public String toString() {
        return status + ": " + this.getMessage();
    }
}
