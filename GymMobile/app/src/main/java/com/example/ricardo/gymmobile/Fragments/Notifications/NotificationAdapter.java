package com.example.ricardo.gymmobile.Fragments.Notifications;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.ClientNotification;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.text.SimpleDateFormat;
import java.util.List;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de notificações de um cliente
     */
    private List<ClientNotification> clientNotificationList;
    /**
     * Atividade onde se encontra o fragmento que utiliza o adapter
     */
    private Activity activity;

    /**
     * Interface que permite clicar num item da RecyclerView
     */
    private OnItemClickListener onItemClickListener;

    public static NotificationAdapter na;


    public NotificationAdapter(Context context, List<ClientNotification> clientNotificationList, Activity activity) {
        this.context                = context;
        this.clientNotificationList = clientNotificationList;
        this.activity               = activity;
        na                          = this;
    }


    public class NotificationViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        /**
         * Data da notificação
         */
        public TextView notificationDate;
        /**
         * Imagem que mostra se a notificação já está lida
         */
        public ImageView notificationIsUnread;
        /**
         * Mensagem da notificação
         */
        public TextView notificationTitle;


        public NotificationViewHolder(View itemView) {
            super(itemView);

            notificationDate     = itemView.findViewById(R.id.date_notification);
            notificationIsUnread = itemView.findViewById(R.id.image_isUnread);
            notificationTitle    = itemView.findViewById(R.id.title_notification);

            // Permite clicar num item da lista
            itemView.setOnClickListener(this);
        }


        @Override
        public void onClick(View v) {

            if (onItemClickListener != null)
                onItemClickListener.onItemClick(v, getAdapterPosition());

        }
    }

    public void setClickListener (OnItemClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    @Override
    public NotificationViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View notificationView = layoutInflater.inflate(R.layout.item_recycler_view_notification, viewGroup, false);

        // Return a new holder instance
        return new NotificationViewHolder(notificationView);
    }

    @Override
    public void onBindViewHolder(NotificationViewHolder notificationViewHolder, int position) {

        if (clientNotificationList.get(position) != null) {

            // Notificação
            ClientNotification clientNotification = clientNotificationList.get(position);

            // Dados da notificação
            TextView dateNotification = notificationViewHolder.notificationDate;
            dateNotification.setText(
                    new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(
                            clientNotification.getTimestamp()
                    )
            );

            ImageView imageIsUnread = notificationViewHolder.notificationIsUnread;
            if (clientNotification.isUnread())
                imageIsUnread.setImageResource(R.drawable.unread_message_icon);
            else
                imageIsUnread.setImageResource(R.drawable.read_message_icon);

            TextView messageNotification = notificationViewHolder.notificationTitle;
            messageNotification.setText(clientNotification.getTitle());

        }

    }

    /**
     * Alterar uma notificação da lista
     *
     * @param position posição da lista
     * @param notification nova notificação
     */
    public void setNotificationList(int position, ClientNotification notification) {
        clientNotificationList.set(position, notification);
    }

    @Override
    public int getItemCount() {
        return clientNotificationList.size();
    }

}
