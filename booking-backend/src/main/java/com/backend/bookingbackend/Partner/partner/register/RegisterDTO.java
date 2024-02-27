package com.backend.bookingbackend.Partner.partner.register;

import com.backend.bookingbackend.RandomGUID;
import jakarta.persistence.Id;

public class RegisterDTO {

    private String email;
        private String firstname;
    private String lastname;
    private Number phoneNumber;
    private String password;
    private String confirmPassword;



    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Number getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
}
