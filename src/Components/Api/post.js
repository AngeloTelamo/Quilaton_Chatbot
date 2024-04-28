import React, { Component } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from '@firebase/firestore';
import { firestore } from '../../firebase';

class Post extends Component {
  constructor(props) {
    super(props);

    const { steps } = this.props;
    const { Names, concern, contact, email } = steps; // Add email step

    this.state = {
      name: Names ? Names.value : '',
      concern: concern ? concern.value : '',
      contact: contact ? contact.value : '',
      email: email ? email.value : '', // Initialize email state
      loading: false,
      adminReplies: [],
      clientUid: null, // Initialize clientUid state
    };
  }

  componentDidMount() {
    const { name, concern, contact, email } = this.state;

    if (name && concern && email) {
      this.saveToFirestore(name, concern, contact, email);
    }
  }

  async saveToFirestore(name, concern, contact, email) {
    try {
      const docRef = await addDoc(collection(firestore, 'clients'), {
        name: name,
        concern: concern,
        contact: contact,
        email: email, // Add email field to Firestore document
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
    const { name, concern, contact, email } = this.state;
    return (
      <div>
        {name ? `Thank you ${name}!` : 'Data received successfully!'} <br/>
        {email ? `Your email is ${email}!` : 'Data received successfully!'} <br/>
        {contact ? `Your contact is ${contact}! was submitted successfully!` : 'Data received successfully!'} <br/>
        {concern ? `Your concern/message: ${concern}` : ''} <br/>

      </div>
    );
  }
}

export default Post;
