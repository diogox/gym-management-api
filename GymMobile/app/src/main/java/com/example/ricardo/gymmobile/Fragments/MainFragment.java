package com.example.ricardo.gymmobile.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.ricardo.gymmobile.R;

/** FRAGMENTO DE TESTE **/
public class MainFragment extends Fragment {

    private Button register_button;
    private Button login_button;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View mContentView = inflater.inflate(R.layout.fragment_main, container, false);

        register_button = mContentView.findViewById(R.id.register_button);
        register_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(mContentView.getContext(), "Register button", Toast.LENGTH_SHORT).show();
            }
        });

        login_button = mContentView.findViewById(R.id.login_button);
        login_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(mContentView.getContext(), "Login button", Toast.LENGTH_SHORT).show();
            }
        });

        return mContentView;
    }
}
