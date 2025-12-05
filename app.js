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
      if (list.id === targetListId) {
        return {
          ...list,
          cards: [...list.cards, draggedCard]
        };
      }
      return list;
    });

    setActiveBoard({ ...activeBoard, lists: newLists });
    setDraggedCard(null);
    setDraggedFromList(null);
  };

  const addCard = (listId) => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      description: newCardDesc,
      comments: 0,
      labels: [],
      attachments: 0
    };

    const newLists = activeBoard.lists.map(list => {
      if (list.id === listId) {
        return { ...list, cards: [...list.cards, newCard] };
      }
      return list;
    });

    setActiveBoard({ ...activeBoard, lists: newLists });
    setNewCardTitle('');
    setNewCardDesc('');
    setShowNewCard(null);
  };

  const addList = () => {
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now(),
      name: newListName,
      cards: []
    };

    setActiveBoard({
      ...activeBoard,
      lists: [...activeBoard.lists, newList]
    });
    setNewListName('');
    setShowNewList(false);
  };

  const deleteCard = (listId, cardId) => {
    const newLists = activeBoard.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(c => c.id !== cardId)
        };
      }
      return list;
    });
    setActiveBoard({ ...activeBoard, lists: newLists });
  };

  const filteredLists = activeBoard.lists.map(list => ({
    ...list,
    cards: list.cards.filter(card =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #334155',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 1.5rem'
    },
    headerContent: {
      maxWidth: '1800px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
          
