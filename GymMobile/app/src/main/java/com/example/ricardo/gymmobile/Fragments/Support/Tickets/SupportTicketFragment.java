package com.example.ricardo.gymmobile.Fragments.Support.Tickets;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.SupportTicket;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;
import com.example.ricardo.gymmobile.Fragments.Support.TicketMessages.SupportTicketMessages;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Fragmento que apresenta a listagem dos tickets de suporte existentes
 */
public class SupportTicketFragment extends Fragment implements OnItemClickListener, View.OnClickListener {

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

        /**
         * Verificar se o houve alterações nos tickets
         */
        MainActivity.instance.getClientAccount();

        supportAdapter = new SupportAdapter(context, supportTickets, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_support_ticket);
        recyclerView.setAdapter(supportAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num ticket de suporte da lista
        supportAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getClientSupportTickets(); // Tickets de suporte

        FloatingActionButton fab = mContentView.findViewById(R.id.new_ticket_button);
        fab.setOnClickListener(this);

        return mContentView;
    }

    /**
     * Obter os tickets de suporte de um cliente
     */
    private void getClientSupportTickets() {

        // Lista de Tickets de Suporte
        List<SupportTicket> list = Session.client.getSupportTickets();

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
     * poder visualizar as mensagens
     */
    @Override
    public void onItemClick(View view, int position) {

        // Mensagens de um ticket de suporte
        List<SupportTicketMessage> messages = supportTickets.get(position).getMessages();

        // Mostrar as mensagens de um ticket
        Intent intent = new Intent(context, SupportTicketMessages.class);
        intent.putExtra("CURRENT_TICKET_MESSAGES", new Gson().toJson(messages));
        intent.putExtra("CURRENT_TICKET_TITLE", supportTickets.get(position).getTitle());
        intent.putExtra("CURRENT_TICKET_ID", supportTickets.get(position).getId());
        intent.putExtra(
                "CURRENT_TICKET_STATE",
                new Gson().toJson(supportTickets.get(position).getState())
        );
        intent.putExtra("CURRENT_TICKET_POSITION", position);
        startActivity(intent);

    }

    @Override
    public void onClick(View v) {

        int id = v.getId();

        if (id == R.id.new_ticket_button) {

            final EditText text = new EditText(context);
            text.setHint("Título");

            final AlertDialog.Builder builder = new AlertDialog.Builder(context);
            builder.setTitle("Novo ticket")
                   .setView(text)
                   .setPositiveButton("Criar", new DialogInterface.OnClickListener() {
                       @Override
                       public void onClick(DialogInterface dialog, int which) {
                           Toast.makeText(context, "Aguarde...", Toast.LENGTH_SHORT).show();
                           String title = text.getText().toString();
                           createTicket(title);
                       }
                   })
                   .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                       @Override
                       public void onClick(DialogInterface dialog, int which) {
                           dialog.cancel();
                       }
                   });
            builder.show();
        }

    }

    /**
     * Criar um novo ticket
     *
     * @param title titulo do ticket
     */
    private void createTicket(String title) {

        String token  = Session.dataLogin.getToken();
        long clientId = Session.client.getId();

        SupportTicket ticket = new SupportTicket(title, clientId);

        Call<SupportTicket> call = APIServices.ticketService().addNewTicket(
                "Bearer " + token,
                ticket
        );
        call.enqueue(new Callback<SupportTicket>() {
            @Override
            public void onResponse(Call<SupportTicket> call, Response<SupportTicket> response) {

                if (response.isSuccessful()) { // Resposta com sucesso

                    SupportTicket ticket = response.body();

                    int positionList = SupportAdapter.supportAdapter.getItemCount();

                    SupportAdapter.supportAdapter.addNewTicket(ticket);
                    SupportAdapter.supportAdapter.notifyItemInserted(positionList);
                    Session.client.getSupportTickets().add(ticket);
                    Toast.makeText(context, "Sucesso!!!", Toast.LENGTH_SHORT).show();

                } else {

                    System.out.println("******* " + response.code() + " ********");
                    System.out.println("******* " + response.message() + " *******");

                }

            }

            @Override
            public void onFailure(Call<SupportTicket> call, Throwable t) {

                System.out.println("******** " + t.getMessage());
                System.out.println("******** " + t.getCause());

            }
        });

    }
}
