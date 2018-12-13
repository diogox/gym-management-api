package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Exercise;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

/**
 * Interface que define as operações relativas aos exercicios
 */
public interface ExerciseService {

    /**
     * Obter uma lista de exercicios. Esta operação necessita
     * de uma token de autorização
     *
     * @param token token de autenticação
     *
     * @return lista de exercicios disponíveis na api
     */
    @GET("exercises")
    Call<List<Exercise>> getExercises(@Header("Authorization") String token);

}