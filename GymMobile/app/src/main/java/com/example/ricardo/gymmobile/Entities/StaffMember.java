package com.example.ricardo.gymmobile.Entities;

import com.example.ricardo.gymmobile.Entities.Enums.StaffMemberRank;

import java.util.Date;

/**
 * Classe que representa um funcionário do ginásio
 */
public class StaffMember {

    /**
     * Número de identificação do funcionário
     */
    public long id;
    /**
     * Número de identificação fiscal do funcionário
     */
    public long nif;
    /**
     * Email do funcionário
     */
    public String email;
    /**
     * Primeiro nome do funcionário
     */
    public String firstName;
    /**
     * Último nome do funcionário
     */
    public String lastName;
    /**
     * Url da imagem do funcionário
     */
    public String imageUrl;
    /**
     * Idade do funcionário
     */
    public int age;
    /**
     * Data de nascimento do funcionário
     */
    public Date birthDate;
    /**
     * Tipo do funcionário
     */
    public StaffMemberRank rank;
    /**
     * Saláriodo funcionário
     */
    public float salary;
    /**
     * Sinalizar se já recebeu o salário deste mês
     */
    public boolean hasBeenPaidThisMonth;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getNif() {
        return nif;
    }

    public void setNif(long nif) {
        this.nif = nif;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public StaffMemberRank getRank() {
        return rank;
    }

    public void setRank(StaffMemberRank rank) {
        this.rank = rank;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public boolean isHasBeenPaidThisMonth() {
        return hasBeenPaidThisMonth;
    }

    public void setHasBeenPaidThisMonth(boolean hasBeenPaidThisMonth) {
        this.hasBeenPaidThisMonth = hasBeenPaidThisMonth;
    }

}
