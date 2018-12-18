package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.SupportTicket;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

/**
 * Interface que define as operações relativas aos tickets de suporte
 */
public interface TicketService {

    /**
     * Adicionar uma nova mensagem a um ticket especifico. Esta
     * operação necessita de um token de autorização
     *
     * @param token token de autorização
     * @param ticketId número de identificação do ticket
     * @param message nova mensagem do ticket
     *
     * @return mensagem criada
     */
    @POST("tickets/{id}/messages")
    Call<SupportTicketMessage> addNewTicketMessage(
            @Header("Authorization") String token,
            @Path("id") long ticketId,
            @Body SupportTicketMessage message
    );

    /**
     * Criar um novo ticket. Esta operação necessita de uma
     * token de autorização
     *
     * @param token token de autorização
     * @param ticket novo ticket
     *
     * @return Ticket criado
     */
    @POST("tickets")
    Call<SupportTicket> addNewTicket(
            @Header("Authorization") String token,
            @Body SupportTicket ticket
    );

}
