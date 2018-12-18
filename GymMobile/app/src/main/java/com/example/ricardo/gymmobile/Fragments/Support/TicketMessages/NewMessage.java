package com.example.ricardo.gymmobile.Fragments.Support.TicketMessages;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.Enums.SupportTicketMessageSender;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;

import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Actividade que permite criar uma nova mensagem para um determinado ticket
 */
public class NewMessage extends AppCompatActivity implements View.OnClickListener {

    /**
     * Caixa de texto da mensagem
     */
    private TextView textMessage;
    /**
     * Botão que permite criar a nova mensagem
     */
    private Button button;
    /**
     * Progress bar
     */
    private ProgressBar progressBar;
    /**
     * Número de identificação do ticket a que a mensagem pertence
     */
    private long ticketId;
    /**
     * Posição do ticket na lista
     */
    private int ticketPositionList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_message);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle("Nova mensagem");

        ticketId = getIntent().getLongExtra("CURRENT_TICKET_ID", -1);
        ticketPositionList = getIntent().getIntExtra("CURRENT_TICKET_POSITION", -1);

        textMessage = findViewById(R.id.text_new_message);

        button = findViewById(R.id.button_new_ticket_message);
        button.setOnClickListener(this);

        progressBar = findViewById(R.id.progress_bar_new_message);
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    @Override
    public void onClick(View v) {

        int id = v.getId();

        if (id == R.id.button_new_ticket_message) {

            addNewTicketMessage();

        }

    }

    private void addNewTicketMessage() {

        // Obter mensagem
        String message = textMessage.getText().toString();

        if (message.length() < 5) {

            Toast.makeText(this, "A mensagem deverá ter pelo menos 5 caracteres", Toast.LENGTH_SHORT).show();

        } else {

            progressBar.setVisibility(View.VISIBLE);

            long clientId = Session.client.getId();
            String token  = Session.dataLogin.getToken();

            SupportTicketMessage ticketMessage = new SupportTicketMessage(
                    message,
                    ticketId,
                    SupportTicketMessageSender.Client
            );

            Call<SupportTicketMessage> call = APIServices.ticketService().addNewTicketMessage(
                    "Bearer " + token, ticketId, ticketMessage
            );
            call.enqueue(new Callback<SupportTicketMessage>() {
                @Override
                public void onResponse(Call<SupportTicketMessage> call, Response<SupportTicketMessage> response) {

                    if (response.isSuccessful()) { // Resposta com sucesso

                        SupportTicketMessage message = response.body();

                        int positionList = TicketMessagesAdapter.tma.getItemCount();

                        TicketMessagesAdapter.tma.addMesage(message);
                        TicketMessagesAdapter.tma.notifyItemInserted(positionList);

                        Toast.makeText(NewMessage.this, "Success!!!", Toast.LENGTH_SHORT).show();
                        progressBar.setVisibility(View.INVISIBLE);

                        NewMessage.super.onBackPressed();

                    } else {

                        Toast.makeText(NewMessage.this, "Erro!!!", Toast.LENGTH_SHORT).show();
                        System.out.println("******* " + response.code() + " ********");
                        progressBar.setVisibility(View.INVISIBLE);

                    }

                }

                @Override
                public void onFailure(Call<SupportTicketMessage> call, Throwable t) {

                    System.out.println("******** " + t.getMessage());
                    System.out.println("******** " + t.getCause());
                    progressBar.setVisibility(View.INVISIBLE);

                }
            });

        }

    }
}
