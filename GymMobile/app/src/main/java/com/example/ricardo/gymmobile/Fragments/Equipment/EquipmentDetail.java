package com.example.ricardo.gymmobile.Fragments.Equipment;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.ricardo.gymmobile.Entities.Equipment;
import com.example.ricardo.gymmobile.R;
import com.google.gson.Gson;

/**
 * Atividade que mostra os detalhes de um equipamento
 */
public class EquipmentDetail extends AppCompatActivity {

    /**
     * Equipamento
     */
    private Equipment equipment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_equipment_detail);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle("Equipamento");

        String equipmentString = getIntent().getStringExtra("CURRENT_EQUIPMENT");

        // Equipamento
        equipment = new Gson().fromJson(
                equipmentString, Equipment.class
        );

        ImageView image = findViewById(R.id.equipment_image);
        Glide.with(this).load(equipment.getImageUrl()).into(image);

        TextView name = findViewById(R.id.equipment_name);
        name.setText(equipment.getName());

        TextView brand = findViewById(R.id.equipment_brand);
        brand.setText(equipment.getBrandName());

        TextView supplier = findViewById(R.id.equipment_supplier_name);
        supplier.setText(equipment.getSupplierName());

        TextView quantity = findViewById(R.id.equipment_quantity);
        quantity.setText(String.valueOf(equipment.getQuantity()));

        TextView description = findViewById(R.id.equipment_description);
        description.setText(equipment.getDescription());
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }
}
