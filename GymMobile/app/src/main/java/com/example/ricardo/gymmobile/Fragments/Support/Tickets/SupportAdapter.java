package com.example.ricardo.gymmobile.Fragments.Support.Tickets;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.Enums.TicketState;
import com.example.ricardo.gymmobile.Entities.SupportTicket;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.text.SimpleDateFormat;
import java.util.List;

public class SupportAdapter extends RecyclerView.Adapter<SupportAdapter.SupportViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de tickets de suporte
     */
    private List<SupportTicket> supportTicketList;
    /**
     * Atividade onde se encontra o fragmento que utiliza o adapter
     */
    private Activity activity;

    /**
     * Interface que permite clicar num item da RecyclerView
     */
    private OnItemClickListener onItemClickListener;

    public static SupportAdapter supportAdapter;


    public SupportAdapter(Context context, List<SupportTicket> supportTicketList, Activity activity) {
        this.context           = context;
        this.supportTicketList = supportTicketList;
        this.activity          = activity;
        supportAdapter         = this;
    }


    public class SupportViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        /**
         * Data de abertura do ticket de suporte
         */
        public TextView supportTicketDate;
        /**
         * Estado do ticket de suporte
         */
        public TextView supportTicketState;
        /**
         * Titulo do ticket de suporte
         */
        public TextView supportTicketTitle;


        public SupportViewHolder(View itemView) {
            super(itemView);

            supportTicketDate  = itemView.findViewById(R.id.date_open_support_ticket);
            supportTicketState = itemView.findViewById(R.id.state_support_ticket);
            supportTicketTitle = itemView.findViewById(R.id.title_support_ticket);

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
    public SupportViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View supportTicketView = layoutInflater.inflate(
                R.layout.item_recycler_view_support_ticket, viewGroup, false
        );

        // Return a new holder instance
        return new SupportViewHolder(supportTicketView);
    }

    @Override
    public void onBindViewHolder(SupportViewHolder supportViewHolder, int position) {

        if (supportTicketList.get(position) != null) {

            // Ticket de suporte
            SupportTicket supportTicket = supportTicketList.get(position);

            // Dados do ticket de suporte
            TextView dateSupport = supportViewHolder.supportTicketDate;
            dateSupport.setText(
                    new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(
                            supportTicket.getOpenedAt()
                    )
            );

            TextView stateSupport = supportViewHolder.supportTicketState;
            if (supportTicket.getState() == TicketState.Open) {
                stateSupport.setText("Open");
                stateSupport.setTextColor(Color.rgb(0, 255, 0));
            } else if (supportTicket.getState() == TicketState.Closed) {
                stateSupport.setText("Closed");
                stateSupport.setTextColor(Color.rgb(255, 0, 0));
            } else {
                stateSupport.setText("Suspended");
                stateSupport.setTextColor(Color.rgb(3, 152, 252));
            }

            TextView titleSupport = supportViewHolder.supportTicketTitle;
            titleSupport.setText(supportTicket.getTitle());

        }

    }

    /**
     * Adicionar um novo ticket na lista
     *
     * @param supportTicket novo ticket
     */
    public void addNewTicket(SupportTicket supportTicket) {
        supportTicketList.add(supportTicket);
    }

    @Override
    public int getItemCount() {
        return supportTicketList.size();
    }

}
