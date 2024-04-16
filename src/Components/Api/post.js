import React, { Component } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase';

class Post extends Component {
  constructor(props) {
    super(props);

    const { steps } = this.props;
    const { Names, concern, contact } = steps;

    this.state = {
      name: Names ? Names.value : '',
      concern: concern ? concern.value : '',
      contact: contact ? contact.value : '',
      loading: false,
      adminReplies: [],
      clientUid: null, // Initialize clientUid state
    };
  }

  componentDidMount() {
    const { name, concern, contact } = this.state;

    if (name && concern) {
      this.saveToFirestore(name, concern, contact);
    }
  }

  async saveToFirestore(name, concern, contact) {
    try {
      const docRef = await addDoc(collection(firestore, 'clients'), {
        name: name,
        concern: concern,
        contact: contact,
        createdTime: serverTimestamp()
      });

      const clientUid = docRef.id;

      await updateDoc(doc(firestore, 'clients', docRef.id), {
        clientUid: clientUid
      });

      // Set the clientUid in state
      this.setState({ clientUid: clientUid }, () => {
        // After setting clientUid, fetch admin replies
        this.fetchAdminReplies();
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async fetchAdminReplies() {
    try {
      this.setState({ loading: true });

      const { name } = this.state;

      if (!name) {
        throw new Error('Client name is not set');
      }

      const messagesRef = collection(firestore, 'clients', name, 'messages');
      const querySnapshot = await getDocs(messagesRef);

      if (querySnapshot.empty) {
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        return await this.fetchAdminReplies(); 
      }
      const adminReplies = [];
      querySnapshot.forEach((doc) => {
        adminReplies.push(doc.data().message);
      });

      console.log('Admin replies fetched:', adminReplies); // Log admin replies
      this.setState({ adminReplies, loading: false });
    } catch (error) {
      console.error('Error fetching admin replies:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { name, concern, contact, loading, adminReplies } = this.state;

    return (
      <div>
        {loading ? (
          <p>Wait for reply...</p>
        ) : (
          <div>
            {name ? `Thank you ${name}!` : 'Data received successfully!'} <br/>
            {contact ? `Your contact is ${contact}! was submitted successfully!` : 'Data received successfully!'} <br/>
            {concern ? `Your concern/message: ${concern}` : ''}

            {adminReplies.length > 0 && (
              <div>
                <h2>Admin Replies:</h2>
                <ul>
                  {adminReplies.map((reply, index) => (
                    <li key={index}>{reply}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Post;
