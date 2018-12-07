package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Equipment;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface EquipmentService {

    @GET("/equipment")
    Call<List<Equipment>> getEquipments();

}