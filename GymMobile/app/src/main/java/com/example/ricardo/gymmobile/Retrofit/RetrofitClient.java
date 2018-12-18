package com.example.ricardo.gymmobile.Retrofit;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Retrofit
 *
 * Permite comunicar com a API
 */
public class RetrofitClient {

    /**
     * Url base da API
     */
    public static final String BASE_URL = "https://gym-lds.herokuapp.com/api/";

    private static Retrofit retrofit = null;

    /**
     * Criar a instancia do objeto retrofit
     *
     * @return instanca do objeto retrofit. A instancia é criada caso ainda não
     * exista (Padrão Singleton)
     */
    public static Retrofit getClient() {
        if (retrofit == null) {
            Gson gson = new GsonBuilder()
                    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                    .serializeNulls()
                    .create();

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .build();
        }
        return retrofit;
    }

}
