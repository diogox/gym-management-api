package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Client;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

/**
 * Interface que define as operações relativas aos clientes
 */
public interface ClientService {

    /**
     * Obter um cliente através do seu número de identificação. Esta
     * operação necessita de uma token de autorização.
     *
     * @param token token de autorização
     * @param id número de identificação do cliente
     *
     * @return cliente
     */
    @GET("clients/{id}")
    Call<Client> getClient(@Header("Authorization") String token, @Path("id") long id);

    /**
     * Fazer o check-in de um cliente. Esta operação necessita de uma
     * token de autorização
     *
     * @param token token de autorização
     * @param id número de identificação do cliente
     *
     * @return cliente
     */
    @GET("clients/{id}/check-in")
    Call<Client> checkIn(@Header("Authorization") String token, @Path("id") long id);

}