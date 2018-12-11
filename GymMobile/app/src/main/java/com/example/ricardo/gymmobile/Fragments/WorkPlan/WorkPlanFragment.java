package com.example.ricardo.gymmobile.Fragments.WorkPlan;

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

import com.example.ricardo.gymmobile.Entities.Enums.DayOfTheWeek;
import com.example.ricardo.gymmobile.Entities.TrainingPlanBlock;
import com.example.ricardo.gymmobile.Entities.WorkPlan;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.ArrayList;
import java.util.List;

public class WorkPlanFragment extends Fragment implements OnItemClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém a listagem dos planos de treino
     */
    private RecyclerView recyclerView;
    /**
     * WorkPlan adapter
     */
    private WorkPlanAdapter workPlanAdapter;
    /**
     * Lista de blocos de treino associados a um plano de treino
     */
    private List<TrainingPlanBlock> trainingPlanBlocks = new ArrayList<>();
    /**
     * Lista de planos de treino a ser adicionada na RecyclerView
     */
    private List<WorkPlan> workPlans = new ArrayList<>();


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

        final View mContentView = inflater.inflate(R.layout.fragment_work_plan, container, false);

        workPlanAdapter = new WorkPlanAdapter(context, workPlans, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_work_plan);
        recyclerView.setAdapter(workPlanAdapter);

        // Set LayoutManager
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num plano de treino da lista
        workPlanAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        return mContentView;
    }

    /**
     * Método que permite clicar num plano de treino da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(context, "Position -> " + position, Toast.LENGTH_SHORT).show();
    }

}
