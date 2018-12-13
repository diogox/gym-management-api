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
import com.example.ricardo.gymmobile.Entities.Enums.DayOfTheWeek;
import com.example.ricardo.gymmobile.Entities.TrainingPlanBlock;
import com.example.ricardo.gymmobile.Entities.WorkPlan;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class WorkPlanFragment extends Fragment {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Plano de treino
     */
    private WorkPlan workPlan;


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

        getWorkPlanClient(); // Plano de treino

        return mContentView;
    }

    /**
     * Obter o plano de treino do cliente
     */
    private void getWorkPlanClient() {

        // Número de identificação do plano de treino
        Long workPlanId = MainActivity.clientLogged.getTrainingPlanId();

        // Se o id do plano de treino não for null
        // Significa que o cliente tem um plano de treino atribuído
        if (workPlanId != null) {

            // Token de autorização
            String token = MainActivity.loginDataResponse.getToken();

            Call<WorkPlan> call = APIServices.workPlanService().getWorkPlan("Bearer " + token, workPlanId);
            call.enqueue(new Callback<WorkPlan>() {
                @Override
                public void onResponse(Call<WorkPlan> call, Response<WorkPlan> response) {

                    if (response.isSuccessful()) { // Resposta com sucesso

                        workPlan = response.body();

                    } else {

                        Toast.makeText(context, "Erro", Toast.LENGTH_SHORT).show();
                        System.out.println("******* " + response.code() + " ********");

                    }

                }

                @Override
                public void onFailure(Call<WorkPlan> call, Throwable t) {

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
