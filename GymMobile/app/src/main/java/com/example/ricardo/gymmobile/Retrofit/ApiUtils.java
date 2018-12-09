package com.example.ricardo.gymmobile.Retrofit;

import com.example.ricardo.gymmobile.Retrofit.Interfaces.AuthService;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.EquipmentService;

public class ApiUtils {

    public static EquipmentService getEquipments() {
        return RetrofitClient.getClient().create(EquipmentService.class);
    }

    public static AuthService getAuth() {
        return RetrofitClient.getClient().create(AuthService.class);
    }

}
