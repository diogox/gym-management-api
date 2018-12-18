package com.example.ricardo.gymmobile.Fragments.Support.TicketMessages;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.Enums.SupportTicketMessageSender;
import com.example.ricardo.gymmobile.Entities.SupportTicketMessage;
import com.example.ricardo.gymmobile.R;

import java.text.SimpleDateFormat;
import java.util.List;

public class TicketMessagesAdapter extends RecyclerView.Adapter<TicketMessagesAdapter.TicketMessageViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de tickets de suporte
     */
    private List<SupportTicketMessage> messages;

    public static TicketMessagesAdapter tma;


    public TicketMessagesAdapter(Context context, List<SupportTicketMessage> messages) {
        this.context  = context;
        this.messages = messages;
        tma           = this;
    }


    public class TicketMessageViewHolder extends RecyclerView.ViewHolder {

        /**
         * Data da mensagem
         */
        public TextView dateMessage;
        /**
         * Remetente da mensagem
         */
        public TextView fromMessage;
        /**
         * Texto da mensagem
         */
        public TextView textMessage;


        public TicketMessageViewHolder(View view) {
            super(view);

            dateMessage = view.findViewById(R.id.date_ticket_message);
            fromMessage = view.findViewById(R.id.from_ticket_message);
            textMessage = view.findViewById(R.id.text_ticket_message);
        }

    }

    @Override
    public TicketMessageViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View supportTicketMessage = layoutInflater.inflate(
                R.layout.item_recycler_view_support_ticket_message, viewGroup, false
        );

        // Return a new holder instance
        return new TicketMessageViewHolder(supportTicketMessage);
    }

    @Override
    public void onBindViewHolder(TicketMessageViewHolder ticketMessageViewHolder, int position) {

        if (messages.get(position) != null) {

            // Mensagem
            SupportTicketMessage message = messages.get(position);

            TextView dateMessage = ticketMessageViewHolder.dateMessage;
            dateMessage.setText(
                    new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(message.getAt())
            );

            TextView fromMessage = ticketMessageViewHolder.fromMessage;
            if (message.getFrom() == SupportTicketMessageSender.Client)
                fromMessage.setText("Client");
            else
                fromMessage.setText("Staff");

            TextView textMessage = ticketMessageViewHolder.textMessage;
            textMessage.setText(message.getMessage());

        }

    }

    /**
     * Adicionar uma nova mensagem à lista de mensagens
     *
     * @param message nova mensagem
     */
    public void addMesage(SupportTicketMessage message) {
        messages.add(message);
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

}
