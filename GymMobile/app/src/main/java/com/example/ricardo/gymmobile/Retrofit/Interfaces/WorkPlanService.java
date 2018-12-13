package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.WorkPlan;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface WorkPlanService {

    /**
     * Obter um plano de treino. Esta operação necessita
     * de uma token de autorização
     *
     * @param token token de autenticação
     * @param id número de identificação do plano de treino
     *
     * @return plano de treino disponível na api
     */
    @GET("plans/{id}")
    Call<WorkPlan> getWorkPlan(@Header("Authorization") String token, @Path("id") Long id);

}
