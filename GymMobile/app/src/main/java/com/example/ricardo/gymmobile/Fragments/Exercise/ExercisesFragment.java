package com.example.ricardo.gymmobile.Fragments.Exercise;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExercisesFragment extends Fragment implements OnItemClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém a listagem dos equipamentos
     */
    private RecyclerView recyclerView;
    /**
     * Exercise adapter
     */
    private ExerciseAdapter exerciseAdapter;
    /**
     * Lista de exercicios a ser adicionada na RecyclerView
     */
    private List<Exercise> exercises = new ArrayList<>();


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        context = getActivity(); // Contexto da atividade
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View mContentView = inflater.inflate(R.layout.fragment_exercises, container, false);

        exerciseAdapter = new ExerciseAdapter(context, exercises, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_exercise);
        recyclerView.setAdapter(exerciseAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num exercicio da lista
        exerciseAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getExercises(); // Obter os exercicios

        return mContentView;
    }

    /**
     * Obter os exercicios da API e coloca-los na recycler view de exercicios
     */
    private void getExercises() {

        // Token do cliente
        final String token = MainActivity.loginDataResponse.getToken();

        Call<List<Exercise>> call = APIServices.exerciseService().getExercises("Bearer " + token);
        call.enqueue(new Callback<List<Exercise>>() {
            @Override
            public void onResponse(Call<List<Exercise>> call, Response<List<Exercise>> response) {

                if (response.isSuccessful()) { // Resposta com sucesso

                    List<Exercise> list = response.body();

                    if (list.isEmpty()) { // Se a lista não contiver exercicios

                        Toast.makeText(context, "List is empty!!!", Toast.LENGTH_SHORT).show();

                    } else {

                        /**
                         * Adicionar todos o exercicios à lista de exercicios
                         * Notificar o adapter
                         */
                        for (int i = 0; i < list.size(); i++) {
                            exercises.add(list.get(i));
                            exerciseAdapter.notifyItemInserted(i);
                        }

                    }

                } else {

                    Toast.makeText(context, "Erro", Toast.LENGTH_SHORT).show();
                    System.out.println("******* " + response.code() + " ********");

                }

            }

            @Override
            public void onFailure(Call<List<Exercise>> call, Throwable t) {

                Toast.makeText(context, "No internet connection!!!", Toast.LENGTH_SHORT).show();
                System.out.println("******** " + t.getMessage());
                System.out.println("******** " + t.getCause());

            }
        });

    }

    /**
     * Método que permite clicar num exercicio da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(context, "Position -> " + position, Toast.LENGTH_SHORT).show();
    }

}
