package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Exercise;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface ExerciseService {

    @GET("exercises")
    Call<List<Exercise>> getExercises(@Header("Authorization") String token);

}