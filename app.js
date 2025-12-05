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
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBar: {
      flex: '1',
      maxWidth: '500px',
      margin: '0 2rem'
    },
    searchInput: {
      width: '100%',
      padding: '0.5rem 1rem 0.5rem 2.5rem',
      background: 'rgba(51, 65, 85, 0.5)',
      border: '1px solid #475569',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '0.875rem',
      outline: 'none'
    },
    onlineUsers: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    userAvatars: {
      display: 'flex',
      marginLeft: '-0.5rem'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
      border: '2px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      marginLeft: '-0.5rem'
    },
    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem',
      color: '#94a3b8'
    },
     onlineDot: {
      width: '8px',
      height: '8px',
      background: '#22c55e',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    main: {
      maxWidth: '1800px',
      margin: '0 auto',
      padding: '1.5rem'
    },
    board: {
      display: 'flex',
      gap: '1.5rem',
      overflowX: 'auto',
      paddingBottom: '1.5rem'
    },
    list: {
      minWidth: '320px',
      maxWidth: '320px',
      flexShrink: 0
    },
    listHeader: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #334155',
      borderRadius: '0.75rem 0.75rem 0 0',
      padding: '1rem'
    },
    listTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.75rem'
    },
    listBody: {
      background: 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #334155',
      borderTop: 'none',
      borderBottom: 'none',
      padding: '0.75rem',
      minHeight: '200px',
      maxHeight: 'calc(100vh - 300px)',
      overflowY: 'auto'
    },
    listFooter: {
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #334155',
      borderRadius: '0 0 0.75rem 0.75rem',
      height: '0.5rem'
    },
    card: {
      background: 'rgba(51, 65, 85, 0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #475569',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      cursor: 'move',
      transition: 'all 0.2s ease'
    },
    cardTitle: {
      fontWeight: '500',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start'
    },
          
