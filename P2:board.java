package com.rangerops.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "boards")
public class Board {
    @Id
    private String id;
    private String name;
    private String ownerId;
    private List<ListEntity> lists = new ArrayList<>();
    private List<String> members = new ArrayList<>();

    // Constructors, getters, setters
    public Board() {}
    public Board(String name, String ownerId) {
        this.name = name;
        this.ownerId = ownerId;
    }
    // ... getters/setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
    public List<ListEntity> getLists() { return lists; }
    public void setLists(List<ListEntity> lists) { this.lists = lists; }
    public List<String> getMembers() { return members; }
    public void setMembers(List<String> members) { this.members = members; }
}
