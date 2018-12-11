package com.example.ricardo.gymmobile.Retrofit.Entities;

import com.example.ricardo.gymmobile.Entities.ClientCheckIn;
import com.example.ricardo.gymmobile.Entities.ClientNotification;
import com.example.ricardo.gymmobile.Entities.SupportTicket;
import com.example.ricardo.gymmobile.Entities.WorkPlan;

import java.util.Date;
import java.util.List;

public class SignInResponse {

    private long id;
    private int nif;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private Date birthDate;
    private int age;
    private double heightInMeters;
    private float weightInKg;
    private WorkPlan trainingPlanId;
    private List<ClientCheckIn> checkInHistory;
    private List<ClientNotification> notifications;
    private List<SupportTicket> supportTickets;

}
