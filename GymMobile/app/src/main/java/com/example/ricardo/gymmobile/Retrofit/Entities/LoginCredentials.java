package com.example.ricardo.gymmobile.Retrofit.Entities;

/**
 * Credenciais para efetuar o login de um cliente
 */
public class LoginCredentials {

    /**
     * Usernsame do cliente
     */
    private String username;
    /**
     * Password do cliente
     */
    private String password;

    public LoginCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
