package com.example.ricardo.gymmobile.Entities;

import com.example.ricardo.gymmobile.Entities.Enums.TicketState;

import java.util.Date;
import java.util.List;

/**
 * Classe que representa um ticket de suporte
 */
public class SupportTicket {

    /**
     * Número de identificação do ticket de suporte
     */
    private long id;
    /**
     * Titulo do ticket de suporte
     */
    private String title;
    /**
     * Lista de mensagens do ticket de suporte
     */
    private List<SupportTicketMessage> messages;
    /**
     * Data de abertura do ticket de suporte
     */
    private Date openedAt;
    /**
     * Atual estado do ticket de suporte
     */
    private TicketState State;
    /**
     * Número de identificação do cliente que criou o ticket de suporte
     */
    private long ClientId;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<SupportTicketMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<SupportTicketMessage> messages) {
        this.messages = messages;
    }

    public Date getOpenedAt() {
        return openedAt;
    }

    public void setOpenedAt(Date openedAt) {
        this.openedAt = openedAt;
    }

    public TicketState getState() {
        return State;
    }

    public void setState(TicketState state) {
        State = state;
    }

    public long getClientId() {
        return ClientId;
    }

    public void setClientId(long clientId) {
        ClientId = clientId;
    }
}
