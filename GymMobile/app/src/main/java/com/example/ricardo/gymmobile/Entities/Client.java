package com.example.ricardo.gymmobile.Entities;

import java.util.Date;
import java.util.List;

public class Client {

    public long id;
    public long nif;
    public String firstName;
    public String lastName;
    public String imageUrl;
    public Date birthDate;
    public int age;
    public double heightInMeters;
    public float weightInKg;
    public WorkPlan trainingPlan;
    public long trainingPlanId;

    /// <summary>
    /// Contains a list of times and dates the client checked-in at the gym.
    /// </summary>
    public List<ClientCheckIn> checkInHistory;

    /// <summary>
    /// Contains a list of notifications for the user.
    /// </summary>
    public List<ClientNotification> notifications;

    /// <summary>
    /// Contains a list of support tickets associated with the user.
    /// </summary>
    public List<SupportTicket> supportTickets;


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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getHeightInMeters() {
        return heightInMeters;
    }

    public void setHeightInMeters(double heightInMeters) {
        this.heightInMeters = heightInMeters;
    }

    public float getWeightInKg() {
        return weightInKg;
    }

    public void setWeightInKg(float weightInKg) {
        this.weightInKg = weightInKg;
    }

    public WorkPlan getTrainingPlan() {
        return trainingPlan;
    }

    public void setTrainingPlan(WorkPlan trainingPlan) {
        this.trainingPlan = trainingPlan;
    }

    public long getTrainingPlanId() {
        return trainingPlanId;
    }

    public void setTrainingPlanId(long trainingPlanId) {
        this.trainingPlanId = trainingPlanId;
    }

    public List<ClientCheckIn> getCheckInHistory() {
        return checkInHistory;
    }

    public void setCheckInHistory(List<ClientCheckIn> checkInHistory) {
        this.checkInHistory = checkInHistory;
    }

    public List<ClientNotification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<ClientNotification> notifications) {
        this.notifications = notifications;
    }

    public List<SupportTicket> getSupportTickets() {
        return supportTickets;
    }

    public void setSupportTickets(List<SupportTicket> supportTickets) {
        this.supportTickets = supportTickets;
    }
}
