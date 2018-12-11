package com.example.ricardo.gymmobile.Retrofit.Entities;

import java.util.Date;

public class LoginResponse {

    private String token;
    private Date expiration;
    private String userType;
    private long userTypeId;
    private String string;

    public LoginResponse(String token, Date expiration, String userType, long userTypeId, String string) {
        this.token = token;
        this.expiration = expiration;
        this.userType = userType;
        this.userTypeId = userTypeId;
        this.string = string;
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

    public String getString() {
        return string;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiration=" + expiration +
                ", userType='" + userType + '\'' +
                ", userTypeId=" + userTypeId +
                ", string='" + string + '\'' +
                '}';
    }
}
