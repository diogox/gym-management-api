package com.example.ricardo.gymmobile.Fragments.Exercise;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.Data.GymStore;
import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

/**
 * Fragmento de exercicios
 *
 * Permite visualizar os exercicios disponíveis no ginásio
 */
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

        /**
         * Verificar se o houve alterações nos exercicios
         */
        MainActivity.instance.getExercises();

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
     * Obter os exercicios da API e coloca-los na recycler view
     */
    private void getExercises() {

        // Lista de exercicios
        List<Exercise> list = GymStore.exerciseList;

        if (list.isEmpty()) { // Se a lista estiver vazia

            Toast.makeText(context, "Não existem exercicios", Toast.LENGTH_SHORT).show();

        } else {

            /**
             * Adicionar os exercicios à lista
             * Notificar o adapter
             */
            for (int i = 0; i < list.size(); i++) {
                exercises.add(list.get(i));
                exerciseAdapter.notifyItemInserted(i);
            }

        }

    }

    /**
     * Método que permite clicar num exercicio da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {

        // Exercicio
        Exercise exercise = exercises.get(position);

        // Visualizar os detalhes de um exercicio específico
        Intent intent = new Intent(context, ExerciseDetail.class);
        intent.putExtra(
                "CURRENT_EXERCISE", new Gson().toJson(exercise)
        );
        startActivity(intent);
    }

}
