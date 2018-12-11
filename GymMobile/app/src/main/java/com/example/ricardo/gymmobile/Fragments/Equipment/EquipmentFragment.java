package com.example.ricardo.gymmobile.Fragments.Equipment;

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

import com.example.ricardo.gymmobile.Entities.Equipment;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

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

        equipmentAdapter = new EquipmentAdapter(context, equipments, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_equipment);
        recyclerView.setAdapter(equipmentAdapter);

        // Set LayoutManager
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num equipamento da lista
        equipmentAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        return mContentView;
    }

    /**
     * Método que permite clicar num equipamento da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(context, "Position: " + position, Toast.LENGTH_SHORT).show();
    }
}
