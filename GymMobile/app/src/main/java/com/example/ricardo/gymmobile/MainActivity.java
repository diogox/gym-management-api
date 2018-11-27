package com.example.ricardo.gymmobile;

import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Fragments.Equipment.EquipmentFragment;
import com.example.ricardo.gymmobile.Fragments.Exercise.ExercisesFragment;
import com.example.ricardo.gymmobile.Fragments.MainFragment;
import com.example.ricardo.gymmobile.Fragments.Notifications.NotificationsFragment;
import com.example.ricardo.gymmobile.Fragments.ReportsFragment;
import com.example.ricardo.gymmobile.Fragments.SupportTicketFragment;
import com.example.ricardo.gymmobile.Fragments.WorkPlan.WorkPlanFragment;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Toolbar
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setBackgroundColor(Color.parseColor("#150901"));
        setSupportActionBar(toolbar);

        // Barra lateral
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        View headerView = navigationView.getHeaderView(0);

        TextView nameClient = headerView.findViewById(R.id.client_name);
        nameClient.setText("Ricardo");

        TextView emailClient = headerView.findViewById(R.id.client_email);
        emailClient.setText("ricardofernandes_1998@hotmail.com");

        // MainFragment
        MainFragment mainFragment = new MainFragment();

        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.add(R.id.fragment_container, mainFragment);
        fragmentTransaction.commit();
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    /**
     * Opções da barra de navegação lateral
     *
     * @param item item da barra lateral
     * @return valor boolean
     */
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();

        if (id == R.id.nav_check_in) { // Check-In

            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Confirmar check-in:")
                   .setMessage("Deseja confirmar o check-in de entrada?")
                   .setPositiveButton("Sim", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            Toast.makeText(MainActivity.this, "Checked!!!", Toast.LENGTH_SHORT).show();
                        }
                   })
                   .setNegativeButton("Não", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                   });
            builder.show(); // Mostrar diálogo

        } else if (id == R.id.nav_my_work_plan) { // Plano de treino

            WorkPlanFragment workPlanFragment = new WorkPlanFragment();
            fragmentTransaction.replace(R.id.fragment_container, workPlanFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Planos de treino");

        } else if (id == R.id.nav_exercises) { // Lista de Exercicios

            ExercisesFragment exercisesFragment = new ExercisesFragment();
            fragmentTransaction.replace(R.id.fragment_container, exercisesFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Exercicios");

        } else if (id == R.id.nav_equipments) { // Lista de equipamentos

            EquipmentFragment equipmentFragment = new EquipmentFragment();
            fragmentTransaction.replace(R.id.fragment_container, equipmentFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Equipamentos");

        } else if (id == R.id.nav_support_ticket) { // Tickets de suporte

            SupportTicketFragment supportTicketFragment = new SupportTicketFragment();
            fragmentTransaction.replace(R.id.fragment_container, supportTicketFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Tickets de suporte");

        } else if (id == R.id.nav_notifications) { // Notificações

            NotificationsFragment notificationsFragment = new NotificationsFragment();
            fragmentTransaction.replace(R.id.fragment_container, notificationsFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Notificações");

        } else if (id == R.id.nav_reports) { // Relatórios

            ReportsFragment reportsFragment = new ReportsFragment();
            fragmentTransaction.replace(R.id.fragment_container, reportsFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Relatórios");

        } else if (id == R.id.nav_share) {
            Toast.makeText(this, "Share", Toast.LENGTH_SHORT).show();
        } else if (id == R.id.nav_send) {
            Toast.makeText(this, "Share", Toast.LENGTH_SHORT).show();
        } else if (id == R.id.nav_settings) {
            Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show();
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
