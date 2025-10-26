package com.studentmanagesystem.backend.errors;

public class UserMessageException extends RuntimeException {

    public int status;

    public UserMessageException(int status, String message) {
        super(message);
        this.status = status;
    }

    @Override
    public String toString() {
        return status + ": " + this.getMessage();
    }
}
