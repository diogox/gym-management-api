package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.TrainingPlanBlock;
import com.example.ricardo.gymmobile.Entities.WorkPlan;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

/**
 * Interface que define as operações relativas aos planos de treino
 */
public interface WorkPlanService {

    /**
     * Obter os exercicios de um plano de treino. Esta operação necessita
     * de uma token de autorização
     *
     * @param token token de autenticação
     * @param id número de identificação do plano de treino
     *
     * @return lista de exercicios do plano de treino
     */
    @GET("plans/{id}/exercises")
    Call<List<TrainingPlanBlock>> getWorkPlan(
            @Header("Authorization") String token,
            @Path("id") Long id
    );

}
