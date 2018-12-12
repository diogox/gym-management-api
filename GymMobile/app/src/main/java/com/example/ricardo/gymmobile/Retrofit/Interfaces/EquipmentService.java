package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Equipment;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

/**
 * Interface que define as operações relativas aos equipamentos
 */
public interface EquipmentService {

    /**
     * Obter uma lista de equipamentos. Esta operação necessida
     * de uma token de autorização
     *
     * @param token token de autenticação
     *
     * @return lista de equipamentos disponíveis na api
     */
    @GET("equipment")
    Call<List<Equipment>> getEquipments(@Header("Authorization") String token);

}