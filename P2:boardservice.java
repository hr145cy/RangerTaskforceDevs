package com.rangerops.service;

import com.rangerops.entity.Board;
import com.rangerops.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(String name, String ownerId) {
        Board board = new Board(name, ownerId);
        board.getMembers().add(ownerId);
        return boardRepository.save(board);
    }

    public Board getBoard(String id) {
        return boardRepository.findById(id).orElse(null);
    }

    // Update for drag-drop: e.g., move card between lists
    public void updateCardPosition(String cardId, String newListId, int newPosition) {
        // Fetch card, update listId and position, save
        // Broadcast via WebSocket (Phase 3)
    }
}
