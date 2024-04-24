import React, { useState, useEffect } from 'react';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components"; 
import { Segment, Popup } from 'semantic-ui-react'; // Import Popup from semantic-ui-react
import ChatbotSteps from "./ChatSteps"; 

const ChatComponents = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [isHovered, setIsHovered] = useState(false); // State to track chatbot hover state

  useEffect(() => {

    if (isHovered) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    
  }, [isHovered]);

  const theme = {
    background: 'linear-gradient(to bottom, #f0f0f0, #c0c0c0)',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#747264',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#747264',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const bubbleStyle = {
    textAlign: 'fixed',
    whiteSpace: 'pre-wrap',
  };

  const online = {
    width: '10px',
    height: '10px',
    backgroundColor: '#0af50e',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px',
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '-40%', 
        left: '45%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters chatbot area
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves chatbot area
    >
      <Popup
        hoverable
        open={showPopup}
        onClose={() => setShowPopup(false)}
        content="How can I help you?"
        trigger={<div></div>}
      />
      <Segment>
        <ThemeProvider theme={theme}>            
          <ChatBot 
            headerTitle={
              <div>
                <span style={online}></span> Chat with Quilaton Law Office
              </div>
            }
            steps={new ChatbotSteps().render()} // render method
            floating={true}
            opened={false} 
            avatarStyle={{ width: '50px', height: '50px' }}
            botAvatar={require('../Components/AvatarProfile/Profile.jpg')}
            userAvatar={require('../Components/AvatarProfile/Avatar.jpg')}
            bubbleStyle={bubbleStyle}
            parseText={true}
          />          
        </ThemeProvider>
      </Segment>
    </div>
  );
}

export default ChatComponents;
