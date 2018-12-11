package com.example.ricardo.gymmobile.Fragments.Notifications;

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

import com.example.ricardo.gymmobile.Entities.ClientNotification;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

        notificationAdapter = new NotificationAdapter(context, clientNotifications, getActivity());

        recyclerView = mContentView.findViewById(R.id.recycler_view_notification);
        recyclerView.setAdapter(notificationAdapter);

        // Set LayoutManager
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        // Clicar num plano de treino da lista
        notificationAdapter.setClickListener(this);

        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(context, DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);

        return mContentView;
    }

    /**
     * Método que permite clicar numa notificação da RecycleView para
     * poder visualizar a informação e marcar a notificação como lida
     */
    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(context, "Position -> " + position, Toast.LENGTH_SHORT).show();
    }

}
