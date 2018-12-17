package com.example.ricardo.gymmobile.Retrofit.Interfaces;

import com.example.ricardo.gymmobile.Entities.ClientNotification;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

/**
 * Interface que define as operações relativas às notificações
 */
public interface NotificationService {

    /**
     * Marcar uma notificação como lida
     *
     * @param id número de identificação do cliente
     * @param notificationId número de identificação da notificação
     *
     * @return notificação marcada como lida
     */
    @GET("clients/{id}/notifications/{notificationId}/read")
    Call<ClientNotification> checkNotificationRead(
            @Header("Authorization") String token,
            @Path("id") long id,
            @Path("notificationId") long notificationId
    );

}
