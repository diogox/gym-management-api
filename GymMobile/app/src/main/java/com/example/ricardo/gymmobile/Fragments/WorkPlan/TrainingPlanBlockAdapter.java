package com.example.ricardo.gymmobile.Fragments.WorkPlan;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Data.GymStore;
import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Entities.TrainingPlanBlock;
import com.example.ricardo.gymmobile.R;

import java.util.LinkedList;
import java.util.List;

public class TrainingPlanBlockAdapter
        extends RecyclerView.Adapter<TrainingPlanBlockAdapter.TrainingPlanBlockViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de blocos de um plano de treino
     */
    private List<TrainingPlanBlock> planBlockList = new LinkedList<>();


    public TrainingPlanBlockAdapter(Context context, List<TrainingPlanBlock> planBlockList) {
        this.context = context;
        this.planBlockList = planBlockList;
    }


    public class TrainingPlanBlockViewHolder extends RecyclerView.ViewHolder {

        public TextView exercisePlanBlock;
        public TextView repetitionsPlanBlock;
        public TextView seriesPlanBlock;
        public TextView dayPlanBlock;

        public TrainingPlanBlockViewHolder(View view) {
            super(view);

            exercisePlanBlock    = view.findViewById(R.id.training_plan_block_exercise);
            repetitionsPlanBlock = view.findViewById(R.id.training_plan_block_repetitions);
            seriesPlanBlock      = view.findViewById(R.id.training_plan_block_series);
            dayPlanBlock         = view.findViewById(R.id.training_plan_block_day);
        }

    }


    @Override
    public TrainingPlanBlockViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View planBlockView = layoutInflater.inflate(
                R.layout.item_recycler_view_training_plan_block_list, viewGroup, false
        );

        // Return a new holder instance
        return new TrainingPlanBlockViewHolder(planBlockView);
    }

    @Override
    public void onBindViewHolder(TrainingPlanBlockViewHolder trainingPlanBlockViewHolder, int position) {

        if (planBlockList.get(position) != null) {

            // Bloco de treino
            TrainingPlanBlock planBlock = planBlockList.get(position);

            TextView exercisePlan = trainingPlanBlockViewHolder.exercisePlanBlock;
            setNameExercise(planBlock.getExerciseId(), exercisePlan);

            TextView repetitionPlan = trainingPlanBlockViewHolder.repetitionsPlanBlock;
            repetitionPlan.setText(
                    String.valueOf(planBlock.getNumberOfRepetitions())
            );

            TextView seriePlan = trainingPlanBlockViewHolder.seriesPlanBlock;
            seriePlan.setText(
                    String.valueOf(planBlock.getNumberOfSeries())
            );

            TextView dayPlan = trainingPlanBlockViewHolder.dayPlanBlock;
            switch (planBlock.getDayOfTheWeek()) {
                case Monday:
                    dayPlan.setText("Segunda");
                    break;
                case Tuesday:
                    dayPlan.setText("Terça");
                    break;
                case Wednesday:
                    dayPlan.setText("Quarta");
                    break;
                case Thursday:
                    dayPlan.setText("Quinta");
                    break;
                case Friday:
                    dayPlan.setText("Sexta");
                    break;
                case Saturday:
                    dayPlan.setText("Sábado");
                    break;
                case Sunday:
                    dayPlan.setText("Domingo");
                    break;
            }

        }

    }

    /**
     * Obter o nome do exercicio
     *
     * @param exerciseId número de identificação do exercicio
     * @param exercisePlanText textView que irá mostrar o nome do exercicio
     */
    private void setNameExercise(long exerciseId, TextView exercisePlanText) {

        Exercise exercise = null;

        for (int i = 0; i < GymStore.exerciseList.size(); i++)
            if (GymStore.exerciseList.get(i).getId() == exerciseId)
                exercise = GymStore.exerciseList.get(i);

        exercisePlanText.setText(exercise.getName());
    }

    @Override
    public int getItemCount() {
        return planBlockList.size();
    }

}
