package com.example.ricardo.gymmobile.Fragments.Profile;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.Data.Session;
import com.example.ricardo.gymmobile.Entities.Client;
import com.example.ricardo.gymmobile.R;

import java.text.SimpleDateFormat;

/**
 * Fragmento de perfil
 *
 * Permite visualizar os dados do cliente
 */
public class ProfileFragment extends Fragment {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Cliente
     */
    private Client client;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        context = getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View mContentView = inflater.inflate(R.layout.fragment_user_profile, container, false);

        /**
         * Verificar se o houve alterações nos dados do cliente
         */
        MainActivity.instance.getClientAccount();

        // Cliente atual
        client = Session.client;

        TextView firstName = mContentView.findViewById(R.id.first_name_user_profile);
        firstName.setText(
                client.getFirstName()
        );

        TextView lastName = mContentView.findViewById(R.id.last_name_user_profile);
        lastName.setText(
                client.getLastName()
        );

        TextView birthDate = mContentView.findViewById(R.id.birth_date_user_profile);
        birthDate.setText(
                new SimpleDateFormat("yyyy-MM-dd").format(
                        client.getBirthDate()
                )
        );

        TextView age = mContentView.findViewById(R.id.age_user_profile);
        age.setText(
                String.valueOf(client.getAge()) + " anos"
        );

        TextView height = mContentView.findViewById(R.id.height_user_profile);
        height.setText(
                String.valueOf(client.getHeightInMeters()) + " Metros"
        );

        TextView weight = mContentView.findViewById(R.id.weight_user_profile);
        weight.setText(
                String.valueOf(client.getWeightInKg()) + " Kilogramas"
        );

        return mContentView;
    }
}
