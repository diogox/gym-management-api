package com.example.ricardo.gymmobile.Fragments.WorkPlan;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.WorkPlan;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.List;

public class WorkPlanAdapter extends RecyclerView.Adapter<WorkPlanAdapter.WorkPlanViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de planos de treino
     */
    private List<WorkPlan> workPlanList;
    /**
     * Atividade onde se encontra o fragmento que utiliza o adapter
     */
    private Activity activity;

    /**
     * Interface que permite clicar num item da RecyclerView
     */
    private OnItemClickListener onItemClickListener;

    public static WorkPlanAdapter workPlanAdapter;


    public WorkPlanAdapter(Context context, List<WorkPlan> workPlanList, Activity activity) {
        this.context      = context;
        this.workPlanList = workPlanList;
        this.activity     = activity;
        workPlanAdapter   = this;
    }


    public class WorkPlanViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        /**
         * Nome do plano de treino
         */
        public TextView workPlanName;


        public WorkPlanViewHolder(View itemView) {
            super(itemView);

            workPlanName  = itemView.findViewById(R.id.name_work_plan);

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
    public WorkPlanViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View workPlanView = layoutInflater.inflate(R.layout.item_recycler_view_work_plan, viewGroup, false);

        // Return a new holder instance
        return new WorkPlanViewHolder(workPlanView);
    }

    @Override
    public void onBindViewHolder(WorkPlanViewHolder workPlanViewHolder, int position) {

        if (workPlanList.get(position) != null) {

            // Equipamento
            WorkPlan workPlan = workPlanList.get(position);

            // Dados do equipamento
            TextView name = workPlanViewHolder.workPlanName;
            name.setText(workPlan.getName());

        }

    }

    @Override
    public int getItemCount() {
        return workPlanList.size();
    }

}
