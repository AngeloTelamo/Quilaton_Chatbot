import React, { useState } from 'react';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components"; 
import { Segment, Popup } from 'semantic-ui-react'; // Import Popup from semantic-ui-react
import ChatbotSteps from "./ChatSteps"; 


const ChatComponents = () => {

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

  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

   return (
    <div style={{
      position: 'fixed',
      bottom: '-40%', 
      left: '45%',// Adjust the distance from the bottom
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set the height of the container to 100vh
    }}>
      <Segment>
        <ThemeProvider theme={theme}>
          <Popup
            content="Chat with us"
            backgroundColor = "#c0c0c0"
            trigger={
              <div
                onMouseEnter={toggleTooltip}
                onMouseLeave={toggleTooltip}
              >
                <ChatBot 
                  headerTitle = {
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
              </div>
            }
            open={showTooltip}
            position="left center" // Position the Popup message 
            style={{ border: '1px solid #c0c0c0' }} //background color 
          /> 
        </ThemeProvider>
      </Segment>
    </div>
  );
}

export default ChatComponents;
