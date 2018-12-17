package com.example.ricardo.gymmobile.Fragments.Auth;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Entities.Connection;
import com.example.ricardo.gymmobile.Activities.MainActivity;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.APIServices;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginCredentials;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;
import com.google.gson.Gson;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Fragmento de login.
 *
 * Permite ao cliente autenticar-se na aplicação
 */
public class LoginFragment extends Fragment implements View.OnClickListener {

    /**
     * Contexto
     */
    private Context context;
    /**
     * Credenciais de login
     */
    private TextView loginUsername;
    private TextView loginPassword;
    /**
     * Mensagem de erro em caso de as credenciais estarem erradas
     */
    private TextView loginError;
    /**
     * Botão de login
     */
    private Button loginButton;
    /**
     * Barra de progresso
     */
    private ProgressBar progressBar;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        context = getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View mContentView = inflater.inflate(R.layout.fragment_auth_login, container, false);

        loginUsername = mContentView.findViewById(R.id.auth_login_username);
        loginPassword = mContentView.findViewById(R.id.auth_login_password);
        loginError    = mContentView.findViewById(R.id.auth_login_error_message);
        progressBar   = getActivity().findViewById(R.id.progress_bar_auth);

        loginButton = mContentView.findViewById(R.id.auth_login_button);
        loginButton.setOnClickListener(this);

        return mContentView;
    }

    @Override
    public void onClick(View v) {

        if (v.getId() == R.id.auth_login_button) {

            String username = loginUsername.getText().toString();
            String password = loginPassword.getText().toString();

            loginUser(username, password);

        }

    }

    /**
     * Permite efetuar o login, enviando as credenciais de login para a API
     *
     * @param username username do cliente
     * @param password password do cliente
     */
    private void loginUser(String username, String password) {

        /** <Se a mensagem de erro estiver visivel> */
        if (loginError.getVisibility() == View.VISIBLE)
            loginError.setVisibility(View.INVISIBLE);

        /** <Se a TextView do username estiver vazia> */
        if (username.isEmpty()) {
            loginUsername.setError("Please, enter a email!!!");
            loginUsername.requestFocus();
            return;
        }

        /** <Se a TextView da password estiver vazia> */
        if (password.isEmpty()) {
            loginPassword.setError("Please, enter a password");
            loginPassword.requestFocus();
            return;
        }

        /** <Se a password não for válida> */
        if (!password.matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
            loginPassword.setError("Password inválida. Deve conter pelo menos 8 caractéres, " +
                    "um número e uma letra maiúscula.");
            loginPassword.requestFocus();
            return;
        }

        /**
         * No momento de conecção com a API para efetuar o login a
         * barra de progresso fica visível e o botão de login
         * fica desailitado
         */
        progressBar.setVisibility(View.VISIBLE);
        loginButton.setEnabled(false);

        if (Connection.isConnected(getActivity())) { // Verificar a conecção com a internet

            // New credentials
            LoginCredentials credentials = new LoginCredentials(username, password);

            Call<LoginResponse> call = APIServices.authService().userLogin(credentials);
            call.enqueue(new Callback<LoginResponse>() {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                    if (response.isSuccessful()) { // Se as credenciais forem válidas

                        LoginResponse loginResponse = response.body();

                        if (!loginResponse.getUserType().equals("Client")) {

                            Toast.makeText(context, "Falha. Você não está registado como cliente", Toast.LENGTH_SHORT).show();

                        } else {

                            System.out.println("--------- USER: " + loginResponse.toString());

                            // Iniciar a atividade principal
                            Intent intent = new Intent(context, MainActivity.class);
                            intent.putExtra("CURRENT_USER", new Gson().toJson(loginResponse));
                            startActivity(intent);

                        }

                    } else {

                        // Credenciais inválidas
                        loginError.setVisibility(View.VISIBLE);

                    }

                    System.out.println(response.code());
                    progressBar.setVisibility(View.INVISIBLE);

                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {

                    progressBar.setVisibility(View.INVISIBLE);
                    Toast.makeText(context, "Login failed!!!", Toast.LENGTH_SHORT).show();

                }
            });

            loginButton.setEnabled(true);

        } else {

            Toast.makeText(context, "No internet connection.", Toast.LENGTH_SHORT).show();
            loginButton.setEnabled(true);
            progressBar.setVisibility(View.INVISIBLE);

        }

    }

}
