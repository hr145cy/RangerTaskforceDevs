package com.rangerops.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "lists") // Embedded or separate? For simplicity, embedded in Board, but separate for scale
public class ListEntity {
    @Id
    private String id;
    private String boardId;
    private String title;
    private int position; // For drag-drop ordering
    private List<Card> cards = new ArrayList<>();

    // Constructors, getters, setters...
    public ListEntity() {}
    public ListEntity(String title, int position) {
        this.title = title;
        this.position = position;
    }
    // ... similar to Board
}
