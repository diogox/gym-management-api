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

import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.TrainingPlanBlock;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;

import java.util.LinkedList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Fragemnto do plano de treino
 *
 * Permite visualizar o atual plano de treino definido para o cliente
 */
public class WorkPlanFragment extends Fragment {

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
    private TrainingPlanBlockAdapter planBlockAdapter;
    /**
     * Lista de blocos de treino a ser adicionada na RecyclerView
     */
    private List<TrainingPlanBlock> planBlockList = new LinkedList<>();


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

        /**
         * Verificar se o houve alterações do plano de treino
         */
        MainActivity.instance.getClientAccount();

        planBlockAdapter = new TrainingPlanBlockAdapter(context, planBlockList);

        recyclerView = mContentView.findViewById(R.id.recycler_view_training_plan_block_list);
        recyclerView.setAdapter(planBlockAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(
                context, DividerItemDecoration.VERTICAL
        );

        recyclerView.addItemDecoration(itemDecoration);

        getWorkPlanClient(); // Plano de treino

        return mContentView;
    }

    /**
     * Obter o plano de treino do cliente
     */
    private void getWorkPlanClient() {

        // Número de identificação do plano de treino
        Long workPlanId = Session.client.getTrainingPlanId();

        /**
         * Se o id do plano de treino não for null
         * Significa que o cliente tem um plano de treino atribuído
         */
        if (workPlanId != null) {

            // Token de autorização
            String token = Session.dataLogin.getToken();

            Call<List<TrainingPlanBlock>> call = APIServices.workPlanService().getWorkPlan(
                    "Bearer " + token,
                    workPlanId
            );
            call.enqueue(new Callback<List<TrainingPlanBlock>>() {
                @Override
                public void onResponse(Call<List<TrainingPlanBlock>> call, Response<List<TrainingPlanBlock>> response) {

                    if (response.isSuccessful()) { // Resposta com sucesso

                        List<TrainingPlanBlock> list = response.body();
                        System.out.println(">>>>>>>>>> WORKPLAN: " + list.toString());

                        /**
                         * Adicionar os exercicios à lista
                         * Notificar o adapter
                         */
                        for (int i = 0; i < list.size(); i++) {
                            planBlockList.add(list.get(i));
                            planBlockAdapter.notifyItemInserted(i);
                        }

                    } else {

                        Toast.makeText(context, "Erro", Toast.LENGTH_SHORT).show();
                        System.out.println("******* " + response.code() + " ********");

                    }

                }

                @Override
                public void onFailure(Call<List<TrainingPlanBlock>> call, Throwable t) {

                    Toast.makeText(context, "No internet connection!!!", Toast.LENGTH_SHORT).show();
                    System.out.println("******** " + t.getMessage());
                    System.out.println("******** " + t.getCause());

                }

            });

        } else {

            Toast.makeText(context, "Não possui planos atribuídos", Toast.LENGTH_SHORT).show();

        }

    }

}
