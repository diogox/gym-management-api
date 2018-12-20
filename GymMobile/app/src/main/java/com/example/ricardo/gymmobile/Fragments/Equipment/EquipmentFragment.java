package com.example.ricardo.gymmobile.Fragments.Equipment;

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
import com.example.ricardo.gymmobile.Entities.Equipment;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe que representa um fragmento onde irá ser apresentado uma lista
 * de equipamentos disponíveis no ginásio
 */
public class EquipmentFragment extends Fragment implements OnItemClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém a listagem dos equipamentos
     */
    private RecyclerView recyclerView;
    /**
     * Equipment adapter
     */
    private EquipmentAdapter equipmentAdapter;
    /**
     * Lista de equipamentos a ser adicionada na RecyclerView
     */
    private List<Equipment> equipments = new ArrayList<>();


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

        final View mContentView = inflater.inflate(R.layout.fragment_equipment, container, false);

        /**
         * Verificar se houve alteração na lista de equipamentos
         */
        MainActivity.instance.getEquipments();

        equipmentAdapter = new EquipmentAdapter(context, equipments, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_equipment);
        recyclerView.setAdapter(equipmentAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num equipamento da lista
        equipmentAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getEquipments(); // Obter equipamentos

        return mContentView;
    }

    /**
     * Obter a lista de equipamentos a adicionar à recycler view
     */
    private void getEquipments() {

        // Lista de equipamentos
        List<Equipment> list = GymStore.equipmentList;

        if (list.isEmpty()) { // Se a lista estiver vazia

            Toast.makeText(context, "Não existem equipamentos", Toast.LENGTH_SHORT).show();

        } else {

            /**
             * Adicionar os equipamentos à lista
             * Notificar o adapter
             */
            for (int i = 0; i < list.size(); i++) {
                equipments.add(list.get(i));
                equipmentAdapter.notifyItemInserted(i);
            }

        }

    }

    /**
     * Método que permite clicar num equipamento da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {

        // Equipamento
        Equipment equipment = equipments.get(position);

        Intent intent = new Intent(context, EquipmentDetail.class);
        intent.putExtra(
                "CURRENT_EQUIPMENT", new Gson().toJson(equipment)
        );
        startActivity(intent);
    }
}
