package com.rangerops.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeController {
    @MessageMapping("/presence.join")
    @SendTo("/topic/presence")
    public PresenceMessage join(PresenceMessage message) {
        // Add user to board members, broadcast
        return message;
    }

    @MessageMapping("/edit.card")
    @SendTo("/topic/board/{boardId}")
    public EditMessage editCard(EditMessage message) {
        // Update card via service, return updated
        return message;
    }
}

// DTOs: PresenceMessage { userId, boardId, action: "join/leave" }
// EditMessage { cardId, updates: {position, etc.} }
