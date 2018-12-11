package com.example.ricardo.gymmobile.Retrofit.Entities;

/**
 * Credenciais para efetuar o login
 */
public class LoginCredentials {

    private String username;
    private String password;

    public LoginCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
