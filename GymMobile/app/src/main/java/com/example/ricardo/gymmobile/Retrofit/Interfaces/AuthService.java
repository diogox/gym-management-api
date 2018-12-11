package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.Client;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginCredentials;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;
import com.example.ricardo.gymmobile.Retrofit.Entities.User;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.POST;

/**
 * Interface que permite a autenticação no sistema
 */
public interface AuthService {

    /**
     * Efetuar o login de um cliente
     *
     * @param credentials credenciais de login: username e password
     *
     * @return em caso de sucesso, retorna um objeto com uma token
     * associada ao cliente, a data de expiração da token, o tipo de
     * utilizador (neste caso Cliente) e o id do cliente
     */
    @POST("auth/login")
    Call<LoginResponse> userLogin(@Body LoginCredentials credentials);

    /**
     * Efetuar o registo de um utilizador
     *
     * @param user utilizador a ser registado
     *
     * @return em caso de sucesso, retorna o cliente registado que é gerado
     * através do dados introduzidos
     */
    @POST("clients")
    Call<Client> userSignIn(@Body JSONObject object);

}