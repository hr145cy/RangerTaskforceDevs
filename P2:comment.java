package com.rangerops.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String cardId;
    private String userId;
    private String text;
    private Date timestamp = new Date();

    // Constructors, getters, setters...
    public Comment() {}
    public Comment(String userId, String text) {
        this.userId = userId;
        this.text = text;
    }
    // ... getters/setters
}
