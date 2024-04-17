import React, { Component } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from '@firebase/firestore';
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

      console.log('Document written with ID: ', docRef.id);

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  render() {
    const { name, concern, contact } = this.state;
    return (
      <div>
        {name ? `Thank you ${name}!` : 'Data received successfully!'} <br/>
        {contact ? `Your contact is ${contact}! was submitted successfully!` : 'Data received successfully!'} <br/>
        {concern ? `Your concern/message: ${concern}` : ''} <br/>

      </div>
    );
  }
}

export default Post;
