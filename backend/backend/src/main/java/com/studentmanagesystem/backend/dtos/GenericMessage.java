package com.studentmanagesystem.backend.dtos;

public class GenericMessage {
    public int status;
    public String message;

    public GenericMessage(String message) {
        this.status = 200;
        this.message = message;
    }

    public GenericMessage(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
