package com.example.ricardo.gymmobile.Fragments.Notifications;

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
import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.ClientNotification;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

/**
 * Fragmento de notificações
 *
 * Permite visualizar todas as notificações recebidas pelo cliente
 */
public class NotificationsFragment extends Fragment implements OnItemClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * RecyclerView que contém a listagem das notificações
     */
    private RecyclerView recyclerView;
    /**
     * Notification adapter
     */
    private NotificationAdapter notificationAdapter;
    /**
     * Lista de notificações a ser adicionada na RecyclerView
     */
    private List<ClientNotification> clientNotifications = new ArrayList<>();


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

        final View mContentView = inflater.inflate(R.layout.fragment_notifications, container, false);

        /**
         * Verificar se o houve alterações nas notificações
         */
        MainActivity.instance.getClientAccount();

        notificationAdapter = new NotificationAdapter(context, clientNotifications, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_notification);
        recyclerView.setAdapter(notificationAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num plano de treino da lista
        notificationAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        getClientNotifications(); // Notificações do cliente

        return mContentView;
    }

    /**
     * Obter as notificações de um cliente
     */
    private void getClientNotifications() {

        // Lista de notificações
        List<ClientNotification> list = Session.client.getNotifications();

        if (list.isEmpty()) { // Se a lista estiver vazia

            Toast.makeText(context, "Não existem notificações", Toast.LENGTH_SHORT).show();

        } else {

            /**
             * Obter o histórico de check-in e introduzir na lista
             * Notificar o adapter
             */
            for (int i = 0; i < list.size(); i++) {
                clientNotifications.add(list.get(i));
                notificationAdapter.notifyItemInserted(i);
            }

        }

    }

    /**
     * Método que permite clicar numa notificação da RecycleView para
     * poder visualizar a informação e marcar a notificação como lida
     */
    @Override
    public void onItemClick(View view, int position) {

        // Notificação
        ClientNotification notification = clientNotifications.get(position);

        // Visualizar uma notificação
        Intent intent = new Intent(context, Notification.class);
        intent.putExtra("CURRENT_NOTIFICATION", new Gson().toJson(notification));
        intent.putExtra("NOTIFICATTION_POSITION", position);
        startActivity(intent);

    }

}
