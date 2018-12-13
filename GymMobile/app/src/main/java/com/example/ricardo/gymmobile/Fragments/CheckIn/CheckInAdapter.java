package com.example.ricardo.gymmobile.Fragments.CheckIn;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.ClientCheckIn;
import com.example.ricardo.gymmobile.R;

import java.text.SimpleDateFormat;
import java.util.List;

public class CheckInAdapter extends RecyclerView.Adapter<CheckInAdapter.CheckInViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de checkin
     */
    private List<ClientCheckIn> checkInList;


    public CheckInAdapter(Context context, List<ClientCheckIn> checkInList) {
        this.context     = context;
        this.checkInList = checkInList;
    }


    public class CheckInViewHolder extends RecyclerView.ViewHolder {

        /**
         * Número do checkIn
         */
        public TextView numberCheckIn;
        /**
         * Data do checkIn
         */
        public TextView dateCheckIn;

        public CheckInViewHolder(View itemView) {
            super(itemView);

            numberCheckIn = itemView.findViewById(R.id.number_check_in);
            dateCheckIn   = itemView.findViewById(R.id.date_check_in);

        }

    }

    @Override
    public CheckInViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View equipmentView = layoutInflater.inflate(R.layout.item_recycler_view_check_in_history, viewGroup, false);

        // Return a new holder instance
        return new CheckInViewHolder(equipmentView);
    }

    @Override
    public void onBindViewHolder(CheckInViewHolder checkInViewHolder, int position) {

        if (checkInList.get(position) != null) {

            // Equipamento
            ClientCheckIn checkIn = checkInList.get(position);

            // Dados do equipamento
            TextView numberCheckIn = checkInViewHolder.numberCheckIn;
            numberCheckIn.setText(position + ".");

            TextView dateCheckIn = checkInViewHolder.dateCheckIn;
            dateCheckIn.setText(
                    new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(checkIn.getAt())
            );

        }

    }


    @Override
    public int getItemCount() {
        return checkInList.size();
    }
}
