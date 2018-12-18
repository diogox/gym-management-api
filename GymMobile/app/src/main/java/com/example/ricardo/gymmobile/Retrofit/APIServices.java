package com.example.ricardo.gymmobile.Retrofit;

import com.example.ricardo.gymmobile.Retrofit.Interfaces.AuthService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.ClientService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.EquipmentService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.ExerciseService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.NotificationService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.TicketService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.WorkPlanService;

/**
 * Serviços da API com base na interfaces definidas
 */
public class APIServices {

    /**
     * Obter os Servicos de autenticação
     *
     * @return serviços de autenticação
     */
    public static AuthService authService() {
        return RetrofitClient.getClient().create(AuthService.class);
    }

    /**
     * Obter os serviços do cliente
     *
     * @return serviços do cliente
     */
    public static ClientService clientService() {
        return RetrofitClient.getClient().create(ClientService.class);
    }

    /**
     * Obter os serviços de equipamento
     *
     * @return serviços de equipamento
     */
    public static EquipmentService equipmentService() {
        return RetrofitClient.getClient().create(EquipmentService.class);
    }

    /**
     * Obter os serviços de exercicio
     *
     * @return serviços de exercicio
     */
    public static ExerciseService exerciseService() {
        return RetrofitClient.getClient().create(ExerciseService.class);
    }

    /**
     * Obter os serviços de planos de treino
     *
     * @return serviços de planos de treino
     */
    public static WorkPlanService workPlanService() {
        return RetrofitClient.getClient().create(WorkPlanService.class);
    }

    /**
     * Obter os serviços de notificações
     *
     * @return serviços de notificações
     */
    public static NotificationService notificationService() {
        return RetrofitClient.getClient().create(NotificationService.class);
    }

    /**
     * Obter os serviços de tickets
     *
     * @return serviços de tickets
     */
    public static TicketService ticketService() {
        return RetrofitClient.getClient().create(TicketService.class);
    }

}
