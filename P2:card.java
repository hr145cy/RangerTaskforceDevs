package com.rangerops.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "cards")
public class Card {
    @Id
    private String id;
    private String listId;
    private String boardId;
    private String title;
    private String description;
    private int position; // Within list
    private List<String> labels = new ArrayList<>(); // Advanced
    private List<Comment> comments = new ArrayList<>();
    private Date createdAt = new Date();

    // Constructors, getters, setters...
    public Card() {}
    public Card(String title, int position) {
        this.title = title;
        this.position = position;
    }
    // ... getters/setters
}
