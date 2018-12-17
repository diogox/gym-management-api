package com.example.ricardo.gymmobile.Retrofit.Entities;

import java.util.Date;

/**
 * Credenciais de registo
 */
public class UserSignIn {

    /**
     * Email do utilizador
     */
    private String email;
    /**
     * Usernme do utilizador
     */
    private String username;
    /**
     * Password do utilizador
     */
    private String password;
    /**
     * Número de identificação fiscal do utilizador
     */
    private long nif;
    /**
     * Primeiro nome do utilizador
     */
    private String firstName;
    /**
     * último nome do utilizador
     */
    private String lastName;
    /**
     * Imagem do utilizador
     */
    private String imageUrl;
    /**
     * Data de nascimento do utilizador
     */
    private Date birthDate;
    /**
     * Altura, em metros, do utilizador
     */
    private double heightInMeters;
    /**
     * Peso, em kilos, do utilizador
     */
    private float weightInKg;


    public UserSignIn(String email, String username, String password, long nif,
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

    @Override
    public String toString() {
        return "UserSignIn{" +
                "email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", nif=" + nif +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", birthDate=" + birthDate +
                ", heightInMeters=" + heightInMeters +
                ", weightInKg=" + weightInKg +
                '}';
    }
}
