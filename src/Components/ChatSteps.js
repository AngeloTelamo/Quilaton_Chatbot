import React, { useEffect, useState } from 'react';
import messageSound from './AvatarProfile/tap.mp3';
import Post from './Api/post';

const CustomComponent = ({ message }) => {
  const [messageSoundAudio, setMessageSoundAudio] = useState(null);

  useEffect(() => {
    // Initialize the audio
    const audio = new Audio(messageSound);
    setMessageSoundAudio(audio);
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);   
  useEffect(() => {
    // Play the audio when the messages sent
    if (messageSoundAudio) {
      messageSoundAudio.play();
    }
  }, [message, messageSoundAudio]);
  

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

class ChatbotSteps extends React.Component {
  render() {
    const chatbotSteps = [
      {
        id: 'main',
        message: "Hi, Welcome to Quilation Law Office. An all-specialization and independent law firm in Cebu City, Philippines that offers a wide range of legal services. Our law firm places a premium on competence, integrity, and professionalism to ensure maximum satisfaction among our clients. With years of service in the legal industry, we continuously and passionately expand our presence both locally and internationally.",
        trigger: 'get_started',
      },
      {
        id: 'get_started',
        options: [
          {
            value: '1',
            label: 'Get Started',
            trigger: 'responseName_1',
          },
        ],
      },

      {
        id: 'responseName_1',
        component: <CustomComponent message='May I know your name first?' />,
        asMessage: true,
        trigger: 'clientName',
      },

      {
        id: 'clientName',
        user: true,
        validator: value => {
          if (/\d/.test(value)) {
            return 'Invalid input';
          }
          return true;
        },
        trigger: 'prevValue',
      },
     
      {
        id: 'prevValue',
        message: 'Good Day, {previousValue}, How can I assist you ?',
        trigger: 'contents'
      },
    
      {
          id: 'contents',
          options:[
            { 
              value: 'Legal advice', 
              label: "I need a legal advice", 
              trigger: "legal_advice",
            },
            { 
              value: 'Legal Services', 
              label: "How much are your legal services ?", 
              trigger: "legal_services",
            },
            { 
              value: 'Reach out office', 
              label: "How can I reach out Quilaton Law Office ?", 
              trigger: "office",
            },
            { 
              value: 'Attorney', 
              label: "Do I really need an attorney ?", 
              trigger: "attorney",
            },
            { 
              value: 'About_Us', 
              label: "About Quilaton Law Office", 
              trigger: "About_Us",
            },
            { 
              value: 'end', 
              label: "End Session", 
              trigger: "End_Session",
            }
          ]
        },   
    
        {
          id: 'legal_advice',
          component: <CustomComponent message= "Yes, to better assist you, could you please provide more details about your ? This will allow us to assess the situation accurately."/>,
          asMessage: true,
          trigger: 'website_form',
       },
      
        {
          id: 'website_form',
          component: <CustomComponent message="Kindly fill out the information in this link: <a href='https://my.forms.app/form/62d64df4971e3e097d460373?formsRef=qrcode&fbclid=IwAR19gIWVdhKp2m-EIlKbLweylWVZAmOFNcH1dVlx0pvRQaozeYWNHKvTZug' target='_blank' rel='noopener noreferrer'>here</a>." />,
          asMessage: true,
          trigger:'mains'
        },
    
        {
          id: 'legal_services',
          component: <CustomComponent message= 'The Quilaton Law Office follows the standard minimum attorneys fee schedule regulated by the Integrated Bar of the Philippines (IBP) Cebu City Chapter, which is the official organization of lawyers recognized by the Supreme Court. For more details, kindly contact us and we will respond to you as soon as possible.'/>,
          asMessage: true,
          trigger: 'mains',
        },
    
        {
          id: 'attorney',
          component:<CustomComponent message='When in doubt about your legal concerns, it is highly recommended to reach out to a lawyer as soon as possible to avoid your circumstances from escalating. Either you are looking for a retainer lawyer for your business or other personal matters, you can rely on Quilaton Law Office.'/>,
          asMessage:true,
          trigger: 'mains',
        },
    
        {
          id: 'About_Us',
          component: <CustomComponent message='Embracing the globally praised Filipino professionalism, our law firm recognizes the importance of fostering empathy and reliability for both clients and employees. We will actively listen to your concerns and inquiries because your problem is our problem.'/>,
          asMessage: true,
          trigger: 'website'
        },
    
        {
          id: 'website',
          component: <CustomComponent message="You can visit our website <a href='https://www.quilatonlawoffice.com/home' target='_blank' rel='noopener noreferrer'>here</a>." />,
          asMessage: true,
          trigger:'mains'
        },
    
    
        {
          id: 'office',
          component:<CustomComponent message='You may contact our office through our Facebook page, email, LinkedIn, or by visiting our two offices within Cebu City. For in-person inquiry, we are located at the 5th Floor Park Centrale Building, IT Park'/>,
          asMessage: true,
          trigger: 'contact_info',
        },
    
        {
          id: 'contact_info',
          component: <CustomComponent message="You can visit our <a href='https://www.facebook.com/quilatonlawoffice?mibextid=ZbWKwL' target='_blank' rel='noopener noreferrer'>Facebook</a> and our <a href='https://www.linkedin.com/in/atty-abelardo-quilaton-jr-5a3b25248/' target='_blank' rel='noopener noreferrer'>Linked</a>."/>,
          asMessage: true,
          trigger:'mains'
        },
    
        {
          id: 'mains',
          component: <CustomComponent message= 'Is there anything I can help with you?'/>,
          asMessage: true,
          trigger:'option'
        },
    
        {
          id: 'option',
          options:[
           { value: 'Menu', label: "Back to Menu", trigger: "menu" },
           { value: 'Chat to Atty', label: "Chat to Attorney", trigger: "chatAtty" },
           { value: 'End', label: "End Session", trigger: "End_Session" },
          ]
        },
    
        {
          id: 'menu',
          component:<CustomComponent message='Hi, Welcome to Quilation Law Office. An all-specialization and independent law firm in Cebu City, Philippines that offers a wide range of legal services. Our law firm places a premium on competence, integrity, and professionalism to ensure maximum satisfaction among our clients. With years of service in the legal industry, we continuously and passionately expand our presence both locally and internationally.'/>,
          asMessage: true,
          trigger: 'contents'
        },
    
        {
          id: 'End_Session',
          component: <CustomComponent message='Thanks for reaching out to us! sign off now.'/>,
          asMessage: true,
          end: true
        },

        {
          id: 'chatAtty',
          component:<CustomComponent message='Hi, Welcome to Quilation Law Office. You are now connected and leave a messages to Atty. Quilaton .'/>,
          asMessage: true,
          trigger: 'response'
        },

        {
          id: 'response',
          component: <CustomComponent message='May I know your name first?' />,
          asMessage: true,
          trigger: 'Names',
        },
        {
          id: 'Names',
          user: true,
          validator: value => {
            if (/\d/.test(value)) {
              return 'Invalid input';
            }
            return true;
          },
          trigger: 'writeConcern',
        },
  
        {
          id: 'writeConcern',
          message: 'Please write your contact number and email:',
          trigger: 'contact',
        },
        
        {
          id: 'contact',
          user: true,
          trigger: 'write_Concern',
        },
  
        {
          id: 'write_Concern',
          message: 'Please write your concern or message:',
          trigger: 'concern',
        },
        
        {
          id: 'concern',
          user: true,
          trigger: '7',
        },

        {
          id: '7',
          message: 'Great! Check out your summary',
          trigger: 'review',
        },

        {
          id: 'review',
          component: <Post />,
          asMessage: true,
          trigger: 'end-message'
        },

        {
          id: 'end-message',
          message: 'Thanks! Your data was submitted successfully!',
          trigger: 'mains',
        },

      ];
      
      return chatbotSteps;
  }
}
  export default ChatbotSteps;