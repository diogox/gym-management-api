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
    private TicketState state;
    /**
     * Número de identificação do cliente que criou o ticket de suporte
     */
    private Long clientId;

    public SupportTicket(long id, String title, List<SupportTicketMessage> messages, Date openedAt, TicketState state, Long clientId) {
        this.id = id;
        this.title = title;
        this.messages = messages;
        this.openedAt = openedAt;
        this.state = state;
        this.clientId = clientId;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<SupportTicketMessage> getMessages() {
        return messages;
    }

    public Date getOpenedAt() {
        return openedAt;
    }

    public TicketState getState() {
        return state;
    }

    public Long getClientId() {
        return clientId;
    }
}
