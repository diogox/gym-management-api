package com.example.ricardo.gymmobile.Data;

import com.example.ricardo.gymmobile.Entities.Client;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;

/**
 * Representa a sessão atual de um cliente
 */
public class Session {

    /**
     * Atual cliente com a sessão iniciada
     */
    public static Client client;
    /**
     * Dados de login do cliente logado
     */
    public static LoginResponse dataLogin;

}
