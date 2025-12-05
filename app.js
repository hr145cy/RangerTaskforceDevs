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
          
