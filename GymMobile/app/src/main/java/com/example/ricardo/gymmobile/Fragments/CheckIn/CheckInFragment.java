package com.example.ricardo.gymmobile.Fragments.CheckIn;

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
import com.example.ricardo.gymmobile.Entities.ClientCheckIn;
import com.example.ricardo.gymmobile.R;

import java.util.LinkedList;
import java.util.List;

public class CheckInFragment extends Fragment {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém o histórico de check-in
     */
    private RecyclerView recyclerView;
    /**
     * CheckIn adapter
     */
    private CheckInAdapter checkInAdapter;
    /**
     * Lista de equipamentos a ser adicionada na RecyclerView
     */
    private List<ClientCheckIn> checkInList = new LinkedList<>();


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

        final View mContentView = inflater.inflate(R.layout.fragment_check_in, container, false);

        checkInAdapter = new CheckInAdapter(context, checkInList);

        recyclerView = mContentView.findViewById(R.id.recycler_view_check_in);
        recyclerView.setAdapter(checkInAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getCheckInHistory(); // Histórico de check-in

        return mContentView;
    }

    /**
     * Obter o histórico de checkIns de um cliente
     */
    private void getCheckInHistory() {

        // Lista de check-ins
        List<ClientCheckIn> list = MainActivity.clientLogged.getCheckInHistory();

        if (list.isEmpty()) { // Se a lista estiver vazia

            Toast.makeText(context, "Não existem check-ins", Toast.LENGTH_SHORT).show();

        } else {

            /**
             * Obter o histórico de check-in e introduzir na lista
             * Notificar o adapter
             */
            for (int i = 0; i < list.size(); i++) {
                checkInList.add(list.get(i));
                checkInAdapter.notifyItemInserted(i);
            }

        }

    }

}
