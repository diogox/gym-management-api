package com.example.ricardo.gymmobile.Fragments.Equipment;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Entities.Equipment;
import com.example.ricardo.gymmobile.Fragments.LoadImages;
import com.example.ricardo.gymmobile.Interfaces.OnItemClickListener;
import com.example.ricardo.gymmobile.R;

import java.util.List;

public class EquipmentAdapter extends RecyclerView.Adapter<EquipmentAdapter.EquipmentViewHolder> {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Lista de equipamentos
     */
    private List<Equipment> equipmentList;
    /**
     * Atividade onde se encontra o fragmento que utiliza o adapter
     */
    private Activity activity;

    /**
     * Interface que permite clicar num item da RecyclerView
     */
    private OnItemClickListener onItemClickListener;

    public static EquipmentAdapter equipmentAdapter;


    public EquipmentAdapter(Context context, List<Equipment> equipmentList, Activity activity) {
        this.context       = context;
        this.equipmentList = equipmentList;
        this.activity      = activity;
        equipmentAdapter   = this;
    }


    public class EquipmentViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        /**
         * Nome do equipamento
         */
        public TextView equipmentName;
        /**
         * Imagem do equipamento
         */
        public ImageView equipmentImage;


        public EquipmentViewHolder(View itemView) {
            super(itemView);

            equipmentName  = itemView.findViewById(R.id.name_equipment);
            equipmentImage = itemView.findViewById(R.id.image_equipment);

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
    public EquipmentViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        // Get layout inflater from context
        Context context = viewGroup.getContext();
        LayoutInflater layoutInflater = LayoutInflater.from(context);

        // Inflate layout
        View equipmentView = layoutInflater.inflate(R.layout.item_recycler_view_equipment, viewGroup, false);

        // Return a new holder instance
        return new EquipmentViewHolder(equipmentView);
    }

    @Override
    public void onBindViewHolder(EquipmentViewHolder equipmentViewHolder, int position) {

        if (equipmentList.get(position) != null) {

            // Equipamento
            Equipment equipment = equipmentList.get(position);

            // Dados do equipamento
            TextView name = equipmentViewHolder.equipmentName;
            name.setText(equipment.getName());

            // ImageView do equipamento
            ImageView imageView = equipmentViewHolder.equipmentImage;

            // Obter e carregar a imagem do equipamento
            String urlImage = equipment.getImageUrl();

            // Carregar as imagens
            LoadImages loadImages = new LoadImages(activity, urlImage, imageView);

        }

    }

    @Override
    public int getItemCount() {
        return equipmentList.size();
    }

}
