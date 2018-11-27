package com.example.ricardo.gymmobile.Entities;

import java.util.Date;

/**
 * Classe que representa uma notificação de um cliente
 */
public class ClientNotification {

    /**
     * Número de identificação da notificação
     */
    public long id;
    /**
     * Mensagem da notificação
     */
    public String message;
    /**
     * Data da notificação
     */
    public Date timestamp;
    /**
     * Sinalizar se a notificação já foi lida
     */
    public boolean isUnread;
    /**
     * Número de identificação do cliente a que está associada a notificação
     */
    public long clientId;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isUnread() {
        return isUnread;
    }

    public void setUnread(boolean unread) {
        isUnread = unread;
    }

    public long getClientId() {
        return clientId;
    }

    public void setClientId(long clientId) {
        this.clientId = clientId;
    }
}
