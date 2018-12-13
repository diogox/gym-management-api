package com.example.ricardo.gymmobile.Retrofit.Entities;

import java.util.Date;

/**
 * Resposta da API
 */
public class LoginResponse {


    private String token;
    private Date expiration;
    private String userType;
    private long userTypeId;

    public LoginResponse(String token, Date expiration, String userType, long userTypeId) {
        this.token = token;
        this.expiration = expiration;
        this.userType = userType;
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
