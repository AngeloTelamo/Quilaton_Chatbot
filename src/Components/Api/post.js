import React, { Component } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from '@firebase/firestore';
import { firestore } from '../../firebase';

// Define a class component named Post
class Post extends Component {
  // Constructor to initialize state with values received from props
  constructor(props) {
    super(props);

    // Destructure the steps prop to get Names, concern, and contact values
    const { steps } = this.props;
    const { Names, concern, contact } = steps;

    // Initialize state with default values from props or empty strings
    this.state = {
      name: Names ? Names.value : '',
      concern: concern ? concern.value : '',
      contact: contact ? contact.value : ''
    };
  }

  // method called after the component is mounted
  componentDidMount() {
    // Extract name, concern, and contact from state
    const { name, concern, contact } = this.state;

    // If name and concern exist, save data to Firestore
    if (name && concern) {
      this.saveToFirestore(name, concern, contact);
    }
  }

  // Method to save data to Firestore
  async saveToFirestore(name, concern, contact) {
    try {
      // Add a document to the 'clients' collection in Firestore
      const docRef = await addDoc(collection(firestore, 'clients'), {
        name: name,
        concern: concern,
        contact: contact,
        createdTime: serverTimestamp()
      });

      // Get the ID of the newly added document
      const clientUid = docRef.id;

      // Update the document with the clientUid
      await updateDoc(doc(firestore, 'clients', docRef.id), {
        clientUid: clientUid
      });

      // Log success message with document ID
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      // Log error if document addition fails
      console.error('Error adding document: ', error);
    }
  }

  // Render method to display content based on state values
  render() {
    const { name, concern, contact } = this.state;

    return (
      <div>
        {/* Display a message thanking the user if name is present */}
        {name ? `Thank you ${name}!` : 'Data received successfully!'} <br/>
        {/* Display contact information if present */}
        {contact ? `Your contact is ${contact}! was submitted successfully!` : 'Data received successfully!'} <br/>
        {/* Display concern/message if present */}
        {concern ? `Your concern/message: ${concern}` : ''}
      </div>
    );
  }
}

// Export the Post component as the default export of the module
export default Post;
