package com.example.ricardo.gymmobile.Fragments.Support.TicketMessages;

import android.content.Context;
import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Entities.Enums.TicketState;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.LinkedList;
import java.util.List;

/**
 * Actividade que apresenta a lista de mensagens de um determinado ticket de suporte
 */
public class SupportTicketMessages extends AppCompatActivity implements View.OnClickListener {

    /**
     * RecyclerView que contém a listagem das mensagens do ticket
     */
    private RecyclerView recyclerView;
    /**
     * Ticket message adapter
     */
    private TicketMessagesAdapter messagesAdapter;
    /**
     * Lista de mensagens de um ticket
     */
    private List<SupportTicketMessage> messages = new LinkedList<>();
    /**
     * Número de identificação do ticket
     */
    private long ticketId;
    /**
     * Posição do ticket na lista
     */
    private int ticketPositionList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_support_ticket_messages);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle(getIntent().getStringExtra("CURRENT_TICKET_TITLE"));

        ticketId = getIntent().getLongExtra("CURRENT_TICKET_ID", -1);
        ticketPositionList = getIntent().getIntExtra("CURRENT_TICKET_POSITION", -1);

        messagesAdapter = new TicketMessagesAdapter(this, messages);

        recyclerView = findViewById(R.id.recycler_view_support_ticket_messages);
        recyclerView.setAdapter(messagesAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(
                this, DividerItemDecoration.VERTICAL
        );

        recyclerView.addItemDecoration(itemDecoration);

        getTicketMessages(); // Mensagens do ticket

        FloatingActionButton mFab = findViewById(R.id.new_ticket_message_button);
        mFab.setOnClickListener(this);

        Toast.makeText(this, String.valueOf(ticketId), Toast.LENGTH_SHORT).show();

    }

    /**
     * Obter as mensagens e adicioná-las à lista
     */
    private void getTicketMessages() {

        // Obter as mensagens
        String ticketMessages = getIntent().getStringExtra("CURRENT_TICKET_MESSAGES");

        Type listType = new TypeToken<LinkedList<SupportTicketMessage>>(){}.getType();
        List<SupportTicketMessage> list = new Gson().fromJson(ticketMessages, listType);

        /**
         * Adicionar as mensagens à lista
         * Notificar o adapter
         */
        for (int i = 0; i < list.size(); i++) {
            messages.add(list.get(i));
            messagesAdapter.notifyItemInserted(i);
        }

    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    @Override
    public void onClick(View v) {

        int id = v.getId();

        if (id == R.id.new_ticket_message_button) { // Nova mensagem

            String intentString = getIntent().getStringExtra("CURRENT_TICKET_STATE");
            TicketState state = new Gson().fromJson(intentString, TicketState.class);

            if (state == TicketState.Open) { // Se o ticket estiver aberto

                // Atividade para criar nova mensagem
                Intent intent = new Intent(this, NewMessage.class);
                intent.putExtra("CURRENT_TICKET_ID", ticketId);
                intent.putExtra("CURRENT_TICKET_POSITION", ticketPositionList);
                startActivity(intent);

            } else {

                Toast.makeText(
                        this, "O ticket não está aberto a novas mensagens",
                        Toast.LENGTH_SHORT
                ).show();

            }

        }

    }
}
