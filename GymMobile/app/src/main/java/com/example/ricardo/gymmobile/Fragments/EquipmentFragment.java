package com.example.ricardo.gymmobile.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.ricardo.gymmobile.R;

public class EquipmentFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        final View mContentView = inflater.inflate(R.layout.fragment_equipment, container, false);

        return mContentView;
    }

}
