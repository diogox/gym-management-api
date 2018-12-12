package com.example.ricardo.gymmobile.Entities;

import java.util.Date;

/**
 * Classe que representa um check-in de um cliente
 */
public class ClientCheckIn {

    /**
     * Número de identificação do check-in
     */
    private long id;
    /**
     * Data do check-in
     */
    private Date at;
    /**
     * Número de identificação do cliente que está asociado o check-in
     */
    private long clientId;


    public ClientCheckIn(long id, Date at, long clientId) {
        this.id       = id;
        this.at       = at;
        this.clientId = clientId;
    }


    public long getId() {
        return id;
    }

    public Date getAt() {
        return at;
    }

    public long getClientId() {
        return clientId;
    }
}
