package com.example.ricardo.gymmobile.Retrofit.Entities;

public class LoginResponse {

    public String token;
    public String expiration;

    public LoginResponse(String token, String expiration) {
        this.token = token;
        this.expiration = expiration;
    }

    public String getToken() {
        return token;
    }

    public String getExpiration() {
        return expiration;
    }
}
