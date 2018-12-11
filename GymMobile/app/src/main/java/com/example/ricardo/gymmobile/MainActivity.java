package com.example.ricardo.gymmobile;

import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Entities.Client;
import com.example.ricardo.gymmobile.Fragments.Equipment.EquipmentFragment;
import com.example.ricardo.gymmobile.Fragments.Exercise.ExercisesFragment;
import com.example.ricardo.gymmobile.Fragments.MainFragment;
import com.example.ricardo.gymmobile.Fragments.Notifications.NotificationsFragment;
import com.example.ricardo.gymmobile.Fragments.ReportsFragment;
import com.example.ricardo.gymmobile.Fragments.Support.SupportTicketFragment;
import com.example.ricardo.gymmobile.Fragments.WorkPlan.WorkPlanFragment;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.ClientService;
import com.example.ricardo.gymmobile.Retrofit.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private Toolbar toolbar;
    private Client client;
    public static LoginResponse clientLogin;

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

        final NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        View headerView = navigationView.getHeaderView(0);
        final TextView username = headerView.findViewById(R.id.client_name);
        final TextView userMail = headerView.findViewById(R.id.client_email);

        // Obter o utilizador com a conta iniciada
        String jsonClient = getIntent().getStringExtra("CURRENT_USER");
        LoginResponse login = new Gson().fromJson(jsonClient, LoginResponse.class);
        clientLogin = login;

        getClientAccount(clientLogin, username, userMail);

        final SwipeRefreshLayout swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_layout);
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                swipeRefreshLayout.setRefreshing(true);

                getClientAccount(clientLogin, username, userMail);

                swipeRefreshLayout.setRefreshing(false);
            }
        });

        // MainFragment
        MainFragment mainFragment = new MainFragment();

        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.add(R.id.fragment_container, mainFragment);
        fragmentTransaction.commit();
    }

    private void getClientAccount(LoginResponse client, final TextView username, final TextView userMail) {

        if (isConnected()) { // Se houver conecção coma internet

            final String token = MainActivity.clientLogin.getToken();
            final long clientId = MainActivity.clientLogin.getUserTypeId();

            Gson gson = new GsonBuilder()
                    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                    .create();

            // RETROFIT
            Retrofit.Builder builder = new Retrofit.Builder()
                    .baseUrl(RetrofitClient.BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create(gson));

            Retrofit retrofit = builder.build();

            ClientService clientService = retrofit.create(ClientService.class);
            Call<Client> call = clientService.getClient("Bearer " + token, clientId);
            call.enqueue(new Callback<Client>() {
                @Override
                public void onResponse(Call<Client> call, Response<Client> response) {

                    System.out.println("************** " + response.isSuccessful() + "************");

                    if (response.isSuccessful()) {

                        Client client = response.body();

                        username.setText(client.getFirstName() + " " + client.getLastName());
                        userMail.setText("");

                        System.out.println("CLIENT: " + client.toString());

                        System.out.println("************** " + response.code() + "************");

                    } else {

                        System.out.println("***** STATUS" + response.code() + "******");

                    }

                }

                @Override
                public void onFailure(Call<Client> call, Throwable t) {

                    Toast.makeText(MainActivity.this, "Failure!!!", Toast.LENGTH_SHORT).show();
                    System.out.println("********** " + t.getMessage());
                    System.out.println("********** " + t.getCause());

                }
            });

        } else {

            Toast.makeText(this, "No internet connection!!!", Toast.LENGTH_SHORT).show();

        }

    }

    private boolean isConnected() {

        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        return networkInfo != null && networkInfo.isConnectedOrConnecting();
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
