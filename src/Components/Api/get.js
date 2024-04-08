import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

export const fetchClientMessages = async (clientName) => {
  try {
    const clientMessages = [];

    // Get the client document based on the client name
    const clientQuery = query(collection(firestore, 'clients'), where('name', '==', clientName));
    const clientSnapshot = await getDocs(clientQuery);

    // If client exists, fetch its messages
    if (!clientSnapshot.empty) {
      const clientDoc = clientSnapshot.docs[0];
      const messagesQuery = query(collection(clientDoc.ref, 'messages'));
      const messagesSnapshot = await getDocs(messagesQuery);

      messagesSnapshot.forEach((doc) => {
        clientMessages.push(doc.data());
      });
    }

    // Return JSX with fetched messages
    return (
      <div>
        Messages:
        <ul>
          {clientMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error fetching client messages:', error);
    return null;
  }
};
