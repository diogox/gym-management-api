package com.example.ricardo.gymmobile.Retrofit;

import com.example.ricardo.gymmobile.Retrofit.Interfaces.AuthService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.ClientService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.EquipmentService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.ExerciseService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.WorkPlanService;

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
     * @return planos de treino
     */
    public static WorkPlanService workPlanService() {
        return RetrofitClient.getClient().create(WorkPlanService.class);
    }

}
