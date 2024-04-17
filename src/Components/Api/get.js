import React, { Component } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase'; 

class Get extends Component {
  constructor(props) {
    super(props);

    const { steps } = this.props;
    const { names } = steps;

    this.state = {
      name: names ? names.value : '',
      loading: false,
      adminReplies: [],
    };
  }

  componentDidMount() {
    const { name } = this.props;

    if (name) {
      this.fetchAdminReplies(name);
    }
  }

  async fetchAdminReplies(name) {
    try {
      console.log('Name:', name);
      this.setState({ loading: true });
      const clientsRef = collection(firestore, 'clients');
      const nameQuery = query(clientsRef, where('name', '==', name));
      const querySnapshot = await getDocs(nameQuery);

      console.log('Query Snapshot:', querySnapshot);
      if (querySnapshot.empty) {
        console.log('No client found with the provided name');
        this.setState({ loading: false });
        return;
      }

      const clientDoc = querySnapshot.docs[0];

      // Get messages for the client
      const messagesRef = collection(clientDoc.ref, 'messages');
      const messagesSnapshot = await getDocs(messagesRef);

      const messages = messagesSnapshot.docs.map(doc => doc.data().message);
      console.log('Admin replies fetched:', messages);
      this.setState({ adminReplies: messages, loading: false });
    } catch (error) {
      console.error('Error fetching admin replies:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, adminReplies } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        {adminReplies.length > 0 ? (
          <div>
            <h2>Admin Replies:</h2>
            <ul>
              {adminReplies.map((reply, index) => (
                <li key={index}>{reply}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No admin replies found.</p>
        )}
      </div>
    );
  }
}

export default Get;
