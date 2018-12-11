package com.example.ricardo.gymmobile.Entities;

import java.util.Date;
import java.util.List;

public class Client {

    private long id;
    private long nif;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private Date birthDate;
    private int age;
    private double heightInMeters;
    private float weightInKg;
    private Long trainingPlanId;
    private List<ClientCheckIn> checkInHistory;
    private List<ClientNotification> notifications;
    private List<SupportTicket> supportTickets;

    public Client(long id, long nif, String firstName, String lastName, String imageUrl, Date birthDate, int age, double heightInMeters, float weightInKg, Long trainingPlanId, List<ClientCheckIn> checkInHistory, List<ClientNotification> notifications, List<SupportTicket> supportTickets) {
        this.id             = id;
        this.nif            = nif;
        this.firstName      = firstName;
        this.lastName       = lastName;
        this.imageUrl       = imageUrl;
        this.birthDate      = birthDate;
        this.age            = age;
        this.heightInMeters = heightInMeters;
        this.weightInKg     = weightInKg;
        this.trainingPlanId = trainingPlanId;
        this.checkInHistory = checkInHistory;
        this.notifications  = notifications;
        this.supportTickets = supportTickets;
    }


    public long getId() {
        return id;
    }

    public long getNif() {
        return nif;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public int getAge() {
        return age;
    }

    public double getHeightInMeters() {
        return heightInMeters;
    }

    public float getWeightInKg() {
        return weightInKg;
    }

    public Long getTrainingPlanId() {
        return trainingPlanId;
    }

    public List<ClientCheckIn> getCheckInHistory() {
        return checkInHistory;
    }

    public List<ClientNotification> getNotifications() {
        return notifications;
    }

    public List<SupportTicket> getSupportTickets() {
        return supportTickets;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", nif=" + nif +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", birthDate=" + birthDate +
                ", age=" + age +
                ", heightInMeters=" + heightInMeters +
                ", weightInKg=" + weightInKg +
                ", trainingPlanId=" + trainingPlanId +
                ", checkInHistory=" + checkInHistory +
                ", notifications=" + notifications +
                ", supportTickets=" + supportTickets +
                '}';
    }
}
