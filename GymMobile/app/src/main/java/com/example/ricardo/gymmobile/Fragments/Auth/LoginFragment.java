package com.example.ricardo.gymmobile.Fragments.Auth;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Patterns;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.ApiUtils;
import com.example.ricardo.gymmobile.Retrofit.Entities.LoginResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginFragment extends Fragment implements View.OnClickListener {

    private Context context;

    private TextView loginEmail;
    private TextView loginPassword;
    private TextView loginError;
    private Button loginButton;
    ProgressBar progressBar;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        context = getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View mContentView = inflater.inflate(R.layout.fragment_auth_login, container, false);

        loginEmail    = mContentView.findViewById(R.id.auth_login_email);
        loginPassword = mContentView.findViewById(R.id.auth_login_password);
        loginError    = mContentView.findViewById(R.id.auth_login_error_message);
        progressBar   = getActivity().findViewById(R.id.progress_bar_auth);

        loginButton = mContentView.findViewById(R.id.auth_login_button);
        loginButton.setOnClickListener(this);

        return mContentView;
    }

    private void loginUser(String email, String password) {

        if (loginError.getVisibility() == View.VISIBLE)
            loginError.setVisibility(View.INVISIBLE);

        /** <Se a TextView do username estiver vazia> */
        if (email.isEmpty()) {
            loginEmail.setError("Please, enter a email!!!");
            loginEmail.requestFocus();
            return;
        }

        /** <Se o email não for válido> */
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            loginEmail.setError("Email address is invalid!!!");
            loginEmail.requestFocus();
            return;
        }

        /** <Se a TextView do username estiver vazia> */
        if (password.isEmpty()) {
            loginPassword.setError("Please, enter a password");
            loginPassword.requestFocus();
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        loginButton.setEnabled(false);

        if (isConnected()) {

            Call<LoginResponse> call = ApiUtils.getAuth().userLogin(email, password);

            call.enqueue(new Callback<LoginResponse>() {

                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                    LoginResponse loginResponse = response.body();

                    System.out.println("Response: ");
                    System.out.println(response.body());

                    Toast.makeText(context, "Success!!", Toast.LENGTH_SHORT).show();

                    progressBar.setVisibility(View.INVISIBLE);

                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {

                    progressBar.setVisibility(View.INVISIBLE);
                    Toast.makeText(context, "Login failed", Toast.LENGTH_SHORT).show();

                }
            });

            loginButton.setEnabled(true);

        } else {

            Toast.makeText(context, "No internet connection.", Toast.LENGTH_SHORT).show();
            loginButton.setEnabled(true);

        }

    }

    private boolean isConnected() {

        ConnectivityManager connectivityManager = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        return networkInfo != null && networkInfo.isConnectedOrConnecting();
    }

    @Override
    public void onClick(View v) {

        if (v.getId() == R.id.auth_login_button) {

            String email    = loginEmail.getText().toString();
            String password = loginPassword.getText().toString();

            loginUser(email, password);

        }

    }
}
