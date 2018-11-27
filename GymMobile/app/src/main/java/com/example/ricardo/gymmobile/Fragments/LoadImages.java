package com.example.ricardo.gymmobile.Fragments;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.view.View;
import android.widget.ImageView;

import com.example.ricardo.gymmobile.R;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class LoadImages extends AsyncTask<Integer, Integer, Integer> {

    /**
     * Atividade
     */
    private Activity activity;
    /**
     * Conetividade da internet
     */
    private boolean isConnected = false;
    /**
     * Bitmap
     */
    private Bitmap bitmap;
    /**
     * String que representa a URL da imagem
     */
    private String urlToImage;
    /**
     * ImageView que irá receber a imagem do URL
     */
    private ImageView imageView;

    public LoadImages(Activity activity, String urlToImage, ImageView imageView) {
        this.activity   = activity;
        this.urlToImage = urlToImage;
        this.imageView  = imageView;
    }

    @Override
    protected void onPreExecute() {

        imageView.setVisibility(View.VISIBLE);

        ConnectivityManager connectivityManager = (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        isConnected = networkInfo != null && networkInfo.isConnectedOrConnecting();

    }

    @Override
    protected Integer doInBackground(Integer... integers) {

        while (!isCancelled()) {

            // Se houver conecção, obter imagem através do url introduzido
            if (isConnected) {

                try {

                    // Converter string em url
                    URL url = new URL(urlToImage);

                    // Obter a conecção
                    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                    httpURLConnection.setRequestMethod("GET");

                    // Converter a imagem obtida pelo URL em bitmap
                    bitmap = BitmapFactory.decodeStream(httpURLConnection.getInputStream());

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }

            break;
        }

        return null;
    }

    /**
     * Após a execução
     */
    @Override
    protected void onPostExecute(Integer integer) {

        // Definir a imagem na ImageView
        imageView.setImageBitmap(bitmap);

    }

    @Override
    protected void onCancelled() {
        super.onCancelled();
    }
}
