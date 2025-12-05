mport React, { useState } from 'react';

const RangerOpsPlanner = () => {
  const [boards] = useState([
    {
      id: 1,
      name: 'Mission Control',
      lists: [
        {
          id: 1,
          name: 'Planning',
          cards: [
            { id: 1, title: 'Reconnaissance Mission', description: 'Scout area Alpha-7', comments: 2, labels: ['urgent', 'recon'], attachments: 1 },
            { id: 2, title: 'Equipment Check', description: 'Verify all gear', comments: 0, labels: ['routine'], attachments: 0 }
              },
        ]
        {
          id: 2,
          name: 'In Progress',
          cards: [
            { id: 3, title: 'Border Patrol', description: 'Northern sector monitoring', comments: 5, labels: ['ongoing'], attachments: 2 }
          ]
        },
        {
          id: 3,
          name: 'Completed',
          cards: []
        }
      ]
    }
  ]);

  const [activeBoard, setActiveBoard] = useState(boards[0]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedFromList, setDraggedFromList] = useState(null);
  const [showNewCard, setShowNewCard] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [onlineUsers] = useState(['Ranger-01', 'Ranger-02', 'Ranger-03']);
  const [selectedCard, setSelectedCard] = useState(null);

  const labelColors = {
    urgent: '#ef4444',
    routine: '#3b82f6',
    recon: '#a855f7',
    ongoing: '#eab308'
  };

  const handleDragStart = (card, listId) => {
    setDraggedCard(card);
    setDraggedFromList(listId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetListId) => {
    if (!draggedCard || !draggedFromList) return;

    const newLists = activeBoard.lists.map(list => {
      if (list.id === draggedFromList) {
        return {
          ...list,
          cards: list.cards.filter(c => c.id !== draggedCard.id)
        };
      }
          
