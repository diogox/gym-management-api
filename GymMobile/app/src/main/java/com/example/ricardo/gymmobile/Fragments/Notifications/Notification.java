package com.example.ricardo.gymmobile.Fragments.Notifications;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.ClientNotification;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;
import com.google.gson.Gson;

import java.text.SimpleDateFormat;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Atividade que apresenta a informação de uma notifcação
 */
public class Notification extends AppCompatActivity {

    /**
     * Notificação
     */
    private ClientNotification notification;
    /**
     * Posição da notificação no adapter
     */
    private int notificationPosition;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // Notificação
        String jsonNotification = getIntent().getStringExtra("CURRENT_NOTIFICATION");
        notification = new Gson().fromJson(jsonNotification, ClientNotification.class);

        // Posição
        notificationPosition = getIntent().getIntExtra("NOTIFICATTION_POSITION", -1);

        setTitle(
                new SimpleDateFormat("yyyy-MM-dd    HH:mm:ss").format(
                        notification.getTimestamp()
                )
        );

        TextView title = findViewById(R.id.title_notification);
        title.setText(notification.getTitle());

        TextView message = findViewById(R.id.message_notification);
        message.setText(notification.getMessage());

        checkNotificationRead(); // Marcar a notificação como vista
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    /**
     * Marcar a notificação como lida caso ainda esteja marcada como não lida
     */
    private void checkNotificationRead() {

        if (notification.isUnread()) { // Se a notificação ainda não estiver marcada como lida

            String token        = Session.dataLogin.getToken();
            long clientId       = Session.client.getId();
            long notificationId = notification.getId();

            Call<ClientNotification> call = APIServices.notificationService()
                    .checkNotificationRead(
                            "Bearer " + token,
                            clientId,
                            notificationId
                    );
            call.enqueue(new Callback<ClientNotification>() {
                @Override
                public void onResponse(Call<ClientNotification> call, Response<ClientNotification> response) {

                    if (response.isSuccessful()) { // Resposta com sucesso

                        ClientNotification notification = response.body();

                        // Atualizar a lista de notificações
                        // Notificar o adapter
                        NotificationAdapter.na.setNotificationList(notificationPosition, notification);
                        NotificationAdapter.na.notifyItemChanged(notificationPosition);
                        Session.client.getNotifications().set(notificationPosition, notification);

                    }

                    System.out.println("********* ERROR: " + response.code() + " *********");

                }

                @Override
                public void onFailure(Call<ClientNotification> call, Throwable t) {

                    System.out.println("********** " + t.getMessage());
                    System.out.println("********** " + t.getCause());

                }
            });

        }

    }

}
