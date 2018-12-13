package com.example.ricardo.gymmobile.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
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
import com.example.ricardo.gymmobile.Entities.Connection;
import com.example.ricardo.gymmobile.Fragments.CheckIn.CheckInFragment;
import com.example.ricardo.gymmobile.Fragments.Equipment.EquipmentFragment;
import com.example.ricardo.gymmobile.Fragments.Exercise.ExercisesFragment;
import com.example.ricardo.gymmobile.Fragments.Home.MainFragment;
import com.example.ricardo.gymmobile.Fragments.Notifications.NotificationsFragment;
import com.example.ricardo.gymmobile.Fragments.ReportsFragment;
import com.example.ricardo.gymmobile.Fragments.Support.SupportTicketFragment;
import com.example.ricardo.gymmobile.Fragments.WorkPlan.WorkPlanFragment;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;
import com.google.gson.Gson;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    /**
     * Toolbar
     */
    private Toolbar toolbar;
    /**
     * Cliente com a sessão inciada
     */
    public static Client clientLogged = null;
    /**
     * Dados obtidos após o pedido de login
     */
    public static LoginResponse loginDataResponse;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Toolbar
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setBackgroundColor(Color.parseColor("#150901"));
        toolbar.setTitle("Home");
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
        final TextView appName = headerView.findViewById(R.id.drawer_app_name);
        appName.setText("GYM MOBILE");

        // Obter o utilizador com a conta iniciada
        String jsonClient = getIntent().getStringExtra("CURRENT_USER");
        LoginResponse login = new Gson().fromJson(jsonClient, LoginResponse.class);
        loginDataResponse = login;

        getClientAccount(username);

        final SwipeRefreshLayout swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_layout);
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {

                swipeRefreshLayout.setRefreshing(true);
                getClientAccount(username);
                swipeRefreshLayout.setRefreshing(false);

            }
        });

        // MainFragment
        MainFragment mainFragment = new MainFragment();

        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.add(R.id.fragment_container, mainFragment);
        fragmentTransaction.commit();
    }

    /**
     * Obter os dados do cliente
     *
     * @param username username TextView
     */
    private void getClientAccount(final TextView username) {

        if (Connection.isConnected(this)) { // Se houver conecção com internet

            final long clientId = MainActivity.loginDataResponse.getUserTypeId();
            final String token  = MainActivity.loginDataResponse.getToken();

            Call<Client> call = APIServices.clientService().getClient("Bearer " + token, clientId);
            call.enqueue(new Callback<Client>() {
                @Override
                public void onResponse(Call<Client> call, Response<Client> response) {

                    if (response.isSuccessful()) { // Resposta com sucesso

                        clientLogged = response.body(); // Cliente obtido

                        username.setText(clientLogged.getFirstName() + " " + clientLogged.getLastName());

                        System.out.println("CLIENT: " + clientLogged.toString());
                        System.out.println("************** " + response.code() + " ************");

                    } else {

                        Toast.makeText(MainActivity.this, "Fail!!!", Toast.LENGTH_SHORT).show();
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

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            //super.onBackPressed();
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
                    .setPositiveButton("Efetuar check-in", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            Toast.makeText(MainActivity.this, "Aguarde...", Toast.LENGTH_SHORT).show();
                            clientCheckIn();
                        }
                    })
                    .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    });
            builder.show(); // Mostrar diálogo

        }else if (id == R.id.nav_check_in_history) { // Histórico de check-in

            CheckInFragment checkInFragment = new CheckInFragment();
            fragmentTransaction.replace(R.id.fragment_container, checkInFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Histórico de entradas");

        }else if (id == R.id.nav_home) { // Página inicial

            MainFragment mainFragment = new MainFragment();
            fragmentTransaction.replace(R.id.fragment_container, mainFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Home");

        } else if (id == R.id.nav_my_work_plan) { // Plano de treino

            WorkPlanFragment workPlanFragment = new WorkPlanFragment();
            fragmentTransaction.replace(R.id.fragment_container, workPlanFragment);
            fragmentTransaction.commit();
            toolbar.setTitle("Plano de treino");

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

        } else if (id == R.id.nav_logout) { // Terminar sessão

            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Terminar sessão:")
                    .setMessage("Deseja terminar a sessão?")
                    .setPositiveButton("Terminar sessão", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            logout();
                        }
                    })
                    .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    });
            builder.show(); // Mostrar diálogo

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    /**
     * Efetuar o check-in do cliente
     */
    private void clientCheckIn() {

        if (Connection.isConnected(this)) { // Se houver conecção com a internet

            // Dados
            final long clientId = MainActivity.loginDataResponse.getUserTypeId();
            final String token  = MainActivity.loginDataResponse.getToken();
            
            Call<Client> call = APIServices.clientService().checkIn("Bearer " + token, clientId);
            call.enqueue(new Callback<Client>() {
                @Override
                public void onResponse(Call<Client> call, Response<Client> response) {

                    if (response.code() == 400) {

                        Toast.makeText(MainActivity.this, "Já efetuou o check-in hoje", Toast.LENGTH_SHORT).show();

                    } else if (response.isSuccessful()) { // Resposta com sucesso
                        
                        clientLogged = response.body();
                        Toast.makeText(MainActivity.this, "Checked!!!", Toast.LENGTH_SHORT).show();
                        
                    } else {

                        Toast.makeText(MainActivity.this, "Error", Toast.LENGTH_SHORT).show();
                        System.out.println("********* ERROR " + response.code() + " ************");
                        
                    }
                    
                }

                @Override
                public void onFailure(Call<Client> call, Throwable t) {

                    Toast.makeText(MainActivity.this, "Check-in failed!!!", Toast.LENGTH_SHORT).show();
                    System.out.println("********** " + t.getMessage());
                    System.out.println("********** " + t.getCause());
                    
                }
            });

        } else {

            Toast.makeText(this, "No internet connection!!!", Toast.LENGTH_SHORT).show();

        }

    }

    /**
     * Fechar sessão do cliente
     */
    private void logout() {

        // Eliminar os valores da sessão
        loginDataResponse = null;
        clientLogged      = null;

        // Iniciar atividade de login
        Intent intent = new Intent(this, AuthActivity.class);
        startActivity(intent);

    }

}
