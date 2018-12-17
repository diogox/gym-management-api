package com.example.ricardo.gymmobile.Fragments.Exercise;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.ricardo.gymmobile.Data.GymStore;
import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;

/**
 * Ativiade que apresenta os detalhes de um exercicio
 */
public class ExerciseDetail extends AppCompatActivity {

    /**
     * Atividade que mostra os detalhes de um exercicio
     */
    private Exercise exercise;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_detail);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle("Exercicio");

        String exerciseString = getIntent().getStringExtra("CURRENT_EXERCISE");

        // Exercicio
        exercise = new Gson().fromJson(
                exerciseString, Exercise.class
        );

        ImageView image = findViewById(R.id.exercise_image);
        Glide.with(this).load(exercise.getImageUrl()).into(image);

        TextView name = findViewById(R.id.exercise_name);
        name.setText(exercise.getName());

        TextView muscle = findViewById(R.id.exercise_muscle);
        switch (exercise.getTargetMuscleGroup()) {
            case Abs:
                muscle.setText("Abdominais");
                break;
            case Back:
                muscle.setText("Costas");
                break;
            case Chest:
                muscle.setText("Peito");
                break;
            case Legs:
                muscle.setText("Pernas");
                break;
            case Shoulders:
                muscle.setText("Ombros");
                break;
        }

        TextView difficulty = findViewById(R.id.exercise_difficulty);
        switch (exercise.getDifficultyLevel()) {
            case Easy:
                difficulty.setText("Fácil");
                break;
            case Intermediate:
                difficulty.setText("Intermédia");
                break;
            case Hard:
                difficulty.setText("Difícil");
                break;
        }

        TextView equipment = findViewById(R.id.exercise_equipment);
        equipment.setText(
                getEquipmentName(exercise.getId())
        );

        TextView description = findViewById(R.id.exercise_description);
        description.setText(exercise.getDescription());
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    /**
     * Obter o nome de um equipamento com base no
     * seu número de identificação
     *
     * @param equipmentId
     *
     * @return nome do equipamento
     */
    private String getEquipmentName(long equipmentId) {

        for (int i = 0; i < GymStore.equipmentList.size(); i++)
            if (GymStore.equipmentList.get(i).getId() == equipmentId)
                return GymStore.equipmentList.get(i).getName();

        return null;
    }

}
