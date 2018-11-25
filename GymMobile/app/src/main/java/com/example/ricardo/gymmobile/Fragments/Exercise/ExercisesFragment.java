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

import com.example.ricardo.gymmobile.Entities.Enums.DifficultyLevels;
import com.example.ricardo.gymmobile.Entities.Enums.MuscleGroups;
import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.ArrayList;
import java.util.List;

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

        /** < TESTE > */
        Exercise exercise = new Exercise();
        exercise.setId(1);
        exercise.setName("Abdominais");
        exercise.setDescription("O exercício abdominal é um dos mais conhecidos exercícios para " +
                "desenvolvimento e fortalecimento da musculatura abdominal, principalmente do músculo " +
                "reto abdominal. É também um modelo pertencente ao método Hiit, que dentro deste, " +
                "pode sofrer muitas variações, de acordo com a necessidade do praticante.");
        exercise.setImageUrl("https://images.fitpregnancy.mdpcdn.com/sites/fitpregnancy.com/files/styles/width_360/public/field/image/young-woman-abdominal-exercise_700x700.jpg");
        exercise.setTargetMuscleGroup(MuscleGroups.Abs);
        exercise.setDifficultyLevel(DifficultyLevels.Easy);
        exercise.setEquipmentToUse(null);

        exercises.add(exercise);
        exerciseAdapter.notifyItemInserted(0);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View mContentView = inflater.inflate(R.layout.fragment_exercises, container, false);

        exerciseAdapter = new ExerciseAdapter(context, exercises, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_exercise);
        recyclerView.setAdapter(exerciseAdapter);

        // Set LayoutManager
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num exercicio da lista
        exerciseAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        return mContentView;
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
