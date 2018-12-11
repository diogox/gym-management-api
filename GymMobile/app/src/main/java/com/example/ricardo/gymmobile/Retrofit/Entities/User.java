package com.example.ricardo.gymmobile.Retrofit.Entities;

import java.util.Date;

public class User {

    private String email;
    private String username;
    private String password;
    private long nif;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private Date birthDate;
    private double heightInMeters;
    private float weightInKg;

    public User(String email, String username, String password, long nif,
                String firstName, String lastName, String imageUrl,
                Date birthDate, double heightInMeters, float weightInKg) {

        this.email          = email;
        this.username       = username;
        this.password       = password;
        this.nif            = nif;
        this.firstName      = firstName;
        this.lastName       = lastName;
        this.imageUrl       = imageUrl;
        this.birthDate      = birthDate;
        this.heightInMeters = heightInMeters;
        this.weightInKg     = weightInKg;
    }
}
