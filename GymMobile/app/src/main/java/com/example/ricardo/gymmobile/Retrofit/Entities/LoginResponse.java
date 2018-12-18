package com.example.ricardo.gymmobile.Retrofit.Entities;

import java.util.Date;

/**
 * Resposta da API ao pedido de login
 */
public class LoginResponse {

    /**
     * Token de autorização
     */
    private String token;
    /**
     * Data de expiração da token
     */
    private Date expiration;
    /**
     * Tipo de utilizador: no caso da aplicação móvel apenas pode
     * ser do tipo cliente
     */
    private String userType;
    /**
     * Número de identificação do utilizador
     */
    private long userTypeId;


    public LoginResponse(String token, Date expiration, String userType, long userTypeId) {
        this.token      = token;
        this.expiration = expiration;
        this.userType   = userType;
        this.userTypeId = userTypeId;
    }


    public String getToken() {
        return token;
    }

    public Date getExpiration() {
        return expiration;
    }

    public String getUserType() {
        return userType;
    }

    public long getUserTypeId() {
        return userTypeId;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiration=" + expiration +
                ", userType='" + userType + '\'' +
                ", userTypeId=" + userTypeId +
                '}';
    }
}
