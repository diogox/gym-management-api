package com.example.ricardo.gymmobile.Retrofit;

import com.example.ricardo.gymmobile.Retrofit.Interfaces.EquipmentService;

public class ApiUtils {

    /**
     * API url
     */
    private static final String BASE_URL = "https://gym-management-lds.herokuapp.com/api/";

    public static EquipmentService getEquipments() {
        return RetrofitClient.getClient(BASE_URL).create(EquipmentService.class);
    }

}
