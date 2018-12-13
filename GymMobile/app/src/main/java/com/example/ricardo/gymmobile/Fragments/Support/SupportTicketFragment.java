package com.example.ricardo.gymmobile.Fragments.Support;

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
import com.example.ricardo.gymmobile.Entities.Enums.SupportTicketMessageSender;
import com.example.ricardo.gymmobile.Entities.Enums.TicketState;
import com.example.ricardo.gymmobile.Entities.SupportTicket;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SupportTicketFragment extends Fragment implements OnItemClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém a listagem dos tickets de suporte
     */
    private RecyclerView recyclerView;
    /**
     * Support Adapter
     */
    private SupportAdapter supportAdapter;
    /**
     * Lista de tickets de suporte a ser adicionada na RecyclerView
     */
    private List<SupportTicket> supportTickets = new ArrayList<>();


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

        final View mContentView = inflater.inflate(R.layout.fragment_support_ticket, container, false);

        supportAdapter = new SupportAdapter(context, supportTickets, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_support_ticket);
        recyclerView.setAdapter(supportAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num ticket de suporte da lista
        supportAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getClientSupportTickets(); // Tickets de suporte

        return mContentView;
    }

    /**
     * Obter os tickets de suporte de um cliente
     */
    private void getClientSupportTickets() {

        // Lista de Tickets de Suporte
        List<SupportTicket> list = MainActivity.clientLogged.getSupportTickets();

        if (list.isEmpty()) { // Se a lista estiver vazia

            Toast.makeText(context, "Não existem tickets de suporte", Toast.LENGTH_SHORT).show();

        } else {

            /**
             * Obter os tickets de suporte e introduzir na lista
             * Notificar o adapter
             */
            for (int i = 0; i < list.size(); i++) {
                supportTickets.add(list.get(i));
                supportAdapter.notifyItemInserted(i);
            }

        }

    }

    /**
     * Método que permite clicar num ticket de suporte da RecycleView para
     * poder visualizar a informação
     */
    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(context, "Position -> " + position, Toast.LENGTH_SHORT).show();
    }

}
