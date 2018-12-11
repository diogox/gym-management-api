package com.example.ricardo.gymmobile.Fragments.Auth;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.util.Patterns;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ricardo.gymmobile.Entities.Client;
import com.example.ricardo.gymmobile.R;
import com.example.ricardo.gymmobile.Retrofit.Entities.User;
import com.example.ricardo.gymmobile.Retrofit.Interfaces.AuthService;
import com.example.ricardo.gymmobile.Retrofit.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignInFragment extends Fragment implements View.OnClickListener {

    private Context context;

    private TextView signInFirstName;
    private TextView signInLastName;
    private TextView signInUserName;
    private TextView signInEmail;
    private TextView signInPassword;
    private TextView signInConfirmPassword;
    private TextView signInNif;
    private TextView signInHeight;
    private TextView signInWeight;
    private Button signInBirthDate;
    private Button signInButton;

    private ProgressBar progressBar;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        context = getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View mContentView = inflater.inflate(R.layout.fragment_auth_sign_in, container, false);

        signInFirstName       = mContentView.findViewById(R.id.auth_sign_in_first_name);
        signInLastName        = mContentView.findViewById(R.id.auth_sign_in_last_name);
        signInUserName        = mContentView.findViewById(R.id.auth_sign_in_username);
        signInEmail           = mContentView.findViewById(R.id.auth_sign_in_email);
        signInPassword        = mContentView.findViewById(R.id.auth_sign_in_password);
        signInConfirmPassword = mContentView.findViewById(R.id.auth_sign_in_confirm_password);
        signInNif             = mContentView.findViewById(R.id.auth_sign_in_nif);
        signInHeight          = mContentView.findViewById(R.id.auth_sign_in_height);
        signInWeight          = mContentView.findViewById(R.id.auth_sign_in_weight);
        progressBar           = getActivity().findViewById(R.id.progress_bar_auth);

        signInBirthDate = mContentView.findViewById(R.id.auth_sign_in_birth_date);
        signInBirthDate.setOnClickListener(this);

        signInButton = mContentView.findViewById(R.id.auth_sign_in_button);
        signInButton.setOnClickListener(this);

        return mContentView;
    }

    @Override
    public void onClick(View v) {

        int id = v.getId();

        if (id == R.id.auth_sign_in_button) { // Botão de registo

            try {
                signInUser(); // Fazer o registo
            } catch (JSONException e) {
                e.printStackTrace();
            }

        } else if (id == R.id.auth_sign_in_birth_date) { // Botão da data de nascimento

            DialogFragment dateFragment = new DatePickerFragment();
            dateFragment.show(getFragmentManager(), "datePicker");

        }

    }

    public static class DatePickerFragment extends DialogFragment implements DatePickerDialog.OnDateSetListener {

        /**
         * Data a ser obtida pelo Dialog
         */
        public static Date birthDate;
        private Calendar calendar;

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            calendar = Calendar.getInstance();
            int year  = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day   = calendar.get(Calendar.DAY_OF_MONTH);

            return new DatePickerDialog(getContext(), this, year, month, day);
        }

        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {

            calendar.set(Calendar.YEAR, year);
            calendar.set(Calendar.MONTH, month);
            calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);

            birthDate = calendar.getTime();
        }
    }

    private void signInUser() throws JSONException {

        String firstName       = signInFirstName.getText().toString();
        String lastName        = signInLastName.getText().toString();
        String userName        = signInUserName.getText().toString();
        String email           = signInEmail.getText().toString();
        String password        = signInPassword.getText().toString();
        String confirmPassword = signInConfirmPassword.getText().toString();
        String nif             = signInNif.getText().toString();
        String height          = signInHeight.getText().toString();
        String weight          = signInWeight.getText().toString();

        /**
        // Se houver campos vazios
        if (firstName.isEmpty() || lastName.isEmpty() || userName.isEmpty() || email.isEmpty() ||
             password.isEmpty() || confirmPassword.isEmpty() || nif.isEmpty() || height.isEmpty() ||
             weight.isEmpty()) {

            Toast.makeText(context, "There is empty fields!!!", Toast.LENGTH_SHORT).show();
            return;
        }**/

        // Validação do email
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            signInEmail.setError("Email not valid!!!");
            signInEmail.requestFocus();
            return;
        }

        // Validação da password
        if (!password.matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")) {

            signInPassword.setError("Password inválida. Deve conter pelo menos 8 caractéres, " +
                    "um número e uma letra maiúscula.");
            signInPassword.requestFocus();

            if (!confirmPassword.equals(password)) {
                signInConfirmPassword.setError("Password does not match!!!");
                signInConfirmPassword.requestFocus();
            }

            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        signInButton.setEnabled(false);

        if (isConnected()) { // Verificar a conecção com a internet

            Gson gson = new GsonBuilder()
                    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                    .create();

            // RETROFIT
            Retrofit.Builder builder = new Retrofit.Builder()
                    .baseUrl(RetrofitClient.BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create(gson));

            Retrofit retrofit = builder.build();

            AuthService authService = retrofit.create(AuthService.class);
            JSONObject object = new JSONObject();
            object.put("username", userName);
            object.put("email", email);
            object.put("password", password);

            System.out.println(">>>>>>>>> OBJECT: " + object.toString());

            Call<Client> call = authService.userSignIn(object);
            System.out.println(">>>>>>> ");
            call.enqueue(new Callback<Client>() {
                @Override
                public void onResponse(Call<Client> call, Response<Client> response) {

                    if (response.isSuccessful()) { // Se o utilizador for registado com sucesso

                        Client client = response.body();
                        System.out.println(client.toString());
                        Toast.makeText(context, "Sign in successfull!!!", Toast.LENGTH_SHORT).show();

                    } else {

                        System.out.println("****  STATUS: " + response.code() + " ******");
                        System.out.println("Message: " + response.message());

                    }

                    progressBar.setVisibility(View.INVISIBLE);

                }

                @Override
                public void onFailure(Call<Client> call, Throwable t) {

                    progressBar.setVisibility(View.INVISIBLE);
                    Toast.makeText(context, "Sign in failed!!!", Toast.LENGTH_SHORT).show();

                }
            });

            signInButton.setEnabled(true);

        } else {

            Toast.makeText(context, "No internet connection.", Toast.LENGTH_SHORT).show();
            signInButton.setEnabled(true);
            progressBar.setVisibility(View.INVISIBLE);

        }

    }

    private boolean isConnected() {

        ConnectivityManager connectivityManager = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        return networkInfo != null && networkInfo.isConnectedOrConnecting();
    }

}
