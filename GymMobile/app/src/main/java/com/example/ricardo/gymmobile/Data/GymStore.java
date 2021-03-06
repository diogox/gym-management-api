package com.example.ricardo.gymmobile.Data;

import com.example.ricardo.gymmobile.Entities.Equipment;
import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Retrofit.APIServices;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Dados relativos ao ginásio: equipamentos e exercicios
 */
public class GymStore {

    /**
     * Lista de exercicios disponíveis
     */
    public static List<Exercise> exerciseList;
    /**
     * Lista de equipamentos disponíveis
     */
    public static List<Equipment> equipmentList;

}
