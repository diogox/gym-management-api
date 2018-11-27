package com.example.ricardo.gymmobile.Fragments.Exercise;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.Exercise;
import com.example.ricardo.gymmobile.Fragments.LoadImages;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.List;

public class ExerciseAdapter extends RecyclerView.Adapter<ExerciseAdapter.ExerciseViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de exercicios
     */
    private List<Exercise> exerciseList;
    /**
     * Atividade onde se encontra o fragmento que utiliza o adapter
     */
    private Activity activity;

    /**
     * Interface que permite clicar num item da RecyclerView
     */
    private OnItemClickListener onItemClickListener;

    public static ExerciseAdapter exerciseAdapter;


    public ExerciseAdapter(Context context, List<Exercise> exerciseList, Activity activity) {
        this.context      = context;
        this.exerciseList = exerciseList;
        this.activity     = activity;
        exerciseAdapter   = this;
    }


    public class ExerciseViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        /**
         * Nome do exercicio
         */
        public TextView exerciseName;
        /**
         * Imagem do exercicio
         */
        public ImageView exerciseImage;


        public ExerciseViewHolder(View itemView) {
            super(itemView);

            exerciseName = itemView.findViewById(R.id.name_exercise);
            exerciseImage = itemView.findViewById(R.id.image_exercise);

            // Permite clicar num item da lista
            itemView.setOnClickListener(this);
        }


        @Override
        public void onClick(View v) {

            if (onItemClickListener != null)
                onItemClickListener.onItemClick(v, getAdapterPosition());

        }
    }

    public void setClickListener (OnItemClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    @Override
    public ExerciseViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View exerciseView = layoutInflater.inflate(R.layout.item_recycler_view_exercise, viewGroup, false);

        // Return a new holder instance
        return new ExerciseAdapter.ExerciseViewHolder(exerciseView);
    }

    @Override
    public void onBindViewHolder(ExerciseViewHolder exerciseViewHolder, int position) {

        if (exerciseList.get(position) != null) {

            // Equipamento
            Exercise exercise = exerciseList.get(position);

            // Dados do equipamento
            TextView name = exerciseViewHolder.exerciseName;
            name.setText(exercise.getName());

            // ImageView do equipamento
            ImageView imageView = exerciseViewHolder.exerciseImage;

            // Obter e carregar a imagem do equipamento
            String urlImage = exercise.getImageUrl();

            // Carregar as imagens
            LoadImages loadImages = new LoadImages(activity, urlImage, imageView);

        }

    }

    @Override
    public int getItemCount() {
        return exerciseList.size();
    }

}
