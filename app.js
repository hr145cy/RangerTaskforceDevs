import React, { useState } from 'react';

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
    cardDesc: {
      color: '#94a3b8',
      fontSize: '0.75rem',
      marginBottom: '0.75rem'
    },
    labels: {
      display: 'flex',
      gap: '0.25rem',
      marginBottom: '0.75rem',
      flexWrap: 'wrap'
    },
    label: {
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.7rem',
      fontWeight: '500'
    },
    cardFooter: {
      display: 'flex',
      gap: '0.75rem',
      fontSize: '0.75rem',
      color: '#94a3b8'
    },
    cardIcon: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    button: {
      background: '#f97316',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      color: 'white',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'background 0.2s ease'
    },
    buttonSecondary: {
      background: '#475569',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'background 0.2s ease'
    },
    input: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      background: '#475569',
      border: '1px solid #64748b',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '0.875rem',
      outline: 'none',
      marginBottom: '0.5rem'
    },
    textarea: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      background: '#475569',
      border: '1px solid #64748b',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '0.875rem',
      outline: 'none',
      marginBottom: '0.5rem',
      resize: 'none',
      fontFamily: 'inherit'
    },
    addButton: {
      width: '100%',
      background: 'rgba(51, 65, 85, 0.5)',
      border: '1px dashed #475569',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: '#94a3b8',
      cursor: 'pointer',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1.5rem'
    },
    modalContent: {
      background: '#1e293b',
      borderRadius: '0.75rem',
      border: '1px solid #334155',
      maxWidth: '42rem',
      width: '100%',
      padding: '1.5rem'
    },
    deleteButton: {
      background: 'transparent',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '1rem',
      opacity: 0,
      transition: 'opacity 0.2s ease'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .card:hover { border-color: #f97316; box-shadow: 0 10px 30px rgba(249, 115, 22, 0.2); }
        .card:hover .delete-btn { opacity: 1; }
        .add-button:hover { background: rgba(51, 65, 85, 0.7); color: white; }
        .button:hover { background: #ea580c; }
        .button-secondary:hover { background: #64748b; }
        input:focus, textarea:focus { border-color: #f97316; }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>RANGER OPS PLANNER</h1>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>{activeBoard.name}</p>
            </div>
          </div>

          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.onlineUsers}>
            <div style={styles.userAvatars}>
              {onlineUsers.map((user, i) => (
                <div key={i} style={styles.avatar} title={user}>
                  {user.slice(-2)}
                </div>
              ))}
            </div>
            <div style={styles.onlineStatus}>
              <div style={styles.onlineDot}></div>
              <span>{onlineUsers.length} online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main style={styles.main}>
        <div style={styles.board}>
          {filteredLists.map(list => (
            <div key={list.id} style={styles.list} onDragOver={handleDragOver} onDrop={() => handleDrop(list.id)}>
              <div style={styles.listHeader}>
                <div style={styles.listTitle}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{list.name}</h3>
                  <span style={{ background: '#334155', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                    {list.cards.length}
                  </span>
                </div>
              </div>

              <div style={styles.listBody}>
                {list.cards.map(card => (
                  <div
                    key={card.id}
                    className="card"
                    draggable
                    onDragStart={() => handleDragStart(card, list.id)}
                    onClick={() => setSelectedCard(card)}
                    style={styles.card}
                  >
          <div style={styles.cardTitle}>
                      <span style={{ flex: 1 }}>{card.title}</span>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCard(list.id, card.id);
                        }}
                        style={styles.deleteButton}
                      >
                        🗑️
                      </button>
                    </div>
                    <p style={styles.cardDesc}>{card.description}</p>

                    {card.labels.length > 0 && (
                      <div style={styles.labels}>
                        {card.labels.map((label, i) => (
                          <span key={i} style={{ ...styles.label, background: labelColors[label] }}>
                            {label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={styles.cardFooter}>
                      {card.comments > 0 && (
                        <div style={styles.cardIcon}>
                          💬 <span>{card.comments}</span>
                        </div>
                      )}
                      {card.attachments > 0 && (
                        <div style={styles.cardIcon}>
                          📎 <span>{card.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {showNewCard === list.id ? (
                  <div style={{ background: '#334155', borderRadius: '0.5rem', padding: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Card title..."
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      style={styles.input}
                      autoFocus
                    />
                    <textarea
                      placeholder="Description..."
                      value={newCardDesc}
                      onChange={(e) => setNewCardDesc(e.target.value)}
                      style={styles.textarea}
                      rows="2"
                    />
                         <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => addCard(list.id)} style={styles.button} className="button">
                        Add Card
                      </button>
                      <button onClick={() => setShowNewCard(null)} style={styles.buttonSecondary} className="button-secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowNewCard(list.id)} style={styles.addButton} className="add-button">
                    ➕ <span>Add a card</span>
                  </button>
                )}
              </div>

              <div style={styles.listFooter}></div>
            </div>
          ))}

          {showNewList ? (
            <div style={{ ...styles.list, background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1rem' }}>
              <input
                type="text"
                placeholder="List name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                style={styles.input}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={addList} style={styles.button} className="button">
                  Add List
                </button>
                <button onClick={() => setShowNewList(false)} style={styles.buttonSecondary} className="button-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewList(true)}
              style={{ ...styles.addButton, minWidth: '320px', border: '2px dashed #334155' }}
              className="add-button"
            >
              ➕ <span style={{ fontWeight: '500' }}>Add another list</span>
            </button>
          )}
        </div>
      </main>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div style={styles.modal} onClick={() => setSelectedCard(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{selectedCard.title}</h2>
              <button onClick={() => setSelectedCard(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>{selectedCard.description}</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>🏷️ Labels:</span>
                <div style={styles.labels}>
                  {selectedCard.labels.map((label, i) => (
                    <span key={i} style={{ ...styles.label, background: labelColors[label] }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
