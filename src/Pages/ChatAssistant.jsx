// import React, { useEffect } from 'react';
// import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from 'styled-components';
// import axios from 'axios';
// import botAvatar from '../Components/Assets/chatbot.png';

// // Component to save user details
// // const SaveUserDetails = ({ steps, triggerNextStep }) => {
// //   console.log('SaveUserDetails steps:', steps);
// //   const name = steps['2'].value;
// //   const email = steps['4'].value;

// //   useEffect(() => {
// //     if (name && email) {
// //       console.log('Saving user details:', { name, email });
// //       axios.post('http://localhost:5001/api/saveUser', { name, email })
// //         .then(response => {
// //           console.log('User details saved:', response.data);
// //         })
// //         .catch(error => {
// //           console.error('Error saving user details:', error);
// //         });
// //     } else {
// //       console.error('Name or email step is missing');
// //     }

// //     // Trigger the next step in the chatbot
// //     triggerNextStep();
// //   }, [name, email, triggerNextStep]);

// //   return <div>Saving your details...</div>;
// // };

// // Define the steps for the chatbot
// const steps = [
//   {
//     id: '0',
//     message: 'Hey User!',
//     trigger: '1',
//   },
//   {
//     id: '1',
//     message: 'May I know your name',
//     trigger: '2',
    
//   },
//   {
//     id: '2',
//     user: true,
//     trigger: '3',
//   },
//   {
//     id: '3',
//     message: 'May i know your email',
//     trigger: '4',
//   },
//   {
//     id: '4',
//     user: true,
//     //trigger: '5',
//   },
// //   {
// //     id: '5',
// //     component: <SaveUserDetails />,
// //     asMessage: true,
// //     trigger: '6',
// //   },
// //   {
// //     id: '6',
// //     message: 'Thank you! How can I help you?',
// //     trigger: '7',
// //   },
// //   {
// //     id: '7',
// //     options: [
// //       { value: 1, label: 'Services', trigger: '8' },
// //       { value: 2, label: 'About Us', trigger: '9' },
// //       { value: 3, label: 'Pricing', trigger: '10' },
// //       { value: 4, label: 'Contact Us', trigger: '11' },
// //       { value: 5, label: 'Other', trigger: '12' },
// //     ],
// //   },
// //   {
// //     id: '8',
// //     message: 'We offer services like:',
// //     trigger: '8-options',
// //   },
// //   {
// //     id: '8-options',
// //     options: [
// //       { value: 'Virtual Receptionist Services', label: 'Virtual Receptionist Services', trigger: '8-1' },
// //       { value: 'Answering Services', label: 'Answering Services', trigger: '8-2' },
// //       { value: 'Call Center Services', label: 'Call Center Services', trigger: '8-3' },
// //     ],
// //   },
// //   {
// //     id: '8-1',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/virtual-receptionist-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '8-2',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/answering-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '8-3',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/call-center-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '9',
// //     message: 'Our company is:',
// //     trigger: '9-options',
// //   },
// //   {
// //     id: '9-options',
// //     options: [
// //       { value: 'Employee-Owned', label: 'Employee-Owned', trigger: '9-1' },
// //       { value: 'Charitable Causes', label: 'Charitable Causes', trigger: '9-2' },
// //       { value: 'Careers', label: 'Careers', trigger: '9-3' },
// //     ],
// //   },
// //   {
// //     id: '9-1',
// //     component: (
// //       <div>
// //         <p>We are proud to be a 100% Employee-Owned Company!</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/about-us/who-we-are/" target="_blank" rel="noopener noreferrer">this link</a> for more detailed information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '9-2',
// //     component: (
// //       <div>
// //         <p>MAP for Good – Charitable Causes</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/about-us/charitable-causes/" target="_blank" rel="noopener noreferrer">this link</a> for more detailed information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '9-3',
// //     component: (
// //       <div>
// //         <p>Here you are not just an employee, you are an employee-owner. A fun and rewarding career with an answering service industry leader!</p>
// //         <p>Click <a href="https://www.mapcommunications.com/about-us/careers/" target="_blank" rel="noopener noreferrer">here</a> for more details.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '10',
// //     component: (
// //       <div>
// //         You can view our pricing details <a href="https://www.mapcommunications.com/pricing/" target="_blank" rel="noopener noreferrer">here</a>.
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '11',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/customer-service/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '7',
// //   },
// //   {
// //     id: '12',
// //     message: 'Please specify your query.',
// //     trigger: '7',
// //   },
// ];

// // Define the theme for the chatbot
// const theme = {
//   background: 'linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)',
//   headerBgColor: 'linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)',
//   headerFontSize: '20px',
//   botBubbleColor: '#0F3789',
//   headerFontColor: 'white',
//   botFontColor: 'white',
//   userBubbleColor: '#FF5733',
//   userFontColor: 'white',
// };

// // Define the configuration for the chatbot
// const config = {
//   botAvatar: botAvatar,
//   floating: true,
  
// };

// // Define the ChatAssistant component
// function ChatAssistant() {
//   console.log('ChatAssistant rendered');
//   return (
//     <div className="ChatAssistant">
//       <ThemeProvider theme={theme}>
//         <ChatBot
//           key="unique-key"
//           headerTitle="ChatBot"
//           steps={steps}
//           {...config}
//         />
//       </ThemeProvider>
//     </div>
//   );
// }

// export default ChatAssistant;




// // import React from 'react';
// // import ChatBot from 'react-simple-chatbot';
// // import { ThemeProvider } from 'styled-components';
// // import botAvatar from '../Components/Assets/chatbot.png';

// // // Define the steps for the chatbot
// // const steps = [
// //   {
// //     id: '0',
// //     message: 'Hey User!',
// //     trigger: '1',
// //   },
// //   {
// //     id: '1',
// //     message: 'Please write your name',
// //     trigger: '2',
// //   },
// //   {
// //     id: '2',
// //     user: true,
// //     trigger: '3',
// //   },
// //   {
// //     id: '3',
// //     message: 'Hi {previousValue}, how can I help you?',
// //     trigger: '4',
// //   },
// //   {
// //     id: '4',
// //     options: [
// //       { value: 1, label: 'Services', trigger: '5' },
// //       { value: 2, label: 'About Us', trigger: '6' },
// //       { value: 3, label: 'Pricing', trigger: '7' },
// //       { value: 4, label: 'Contact Us', trigger: '8' },
// //       { value: 5, label: 'Other', trigger: '9' },
// //     ],
// //   },
// //   {
// //     id: '5',
// //     message: 'We offer services like:',
// //     trigger: '5-options',
// //   },
// //   {
// //     id: '5-options',
// //     options: [
// //       { value: 'Virtual Receptionist Services', label: 'Virtual Receptionist Services', trigger: '5-1' },
// //       { value: 'Answering Services', label: 'Answering Services', trigger: '5-2' },
// //       { value: 'Call Center Services', label: 'Call Center Services', trigger: '5-3' },
// //     ],
// //   },
// //   {
// //     id: '5-1',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/virtual-receptionist-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '5-2',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/answering-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '5-3',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/services/call-center-services/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '6',
// //     message: 'Our company is:',
// //     trigger: '6-options',
// //   },
// //   {
// //     id: '6-options',
// //     options: [
// //       { value: 'Employee-Owned', label: 'Employee-Owned', trigger: '6-1' },
// //       { value: 'Charitable Causes', label: 'Charitable Causes', trigger: '6-2' },
// //       { value: 'Careers', label: 'Careers', trigger: '6-3' },
// //     ],
// //   },
// //   {
// //     id: '6-1',
// //     component: (
// //       <div>
// //         <p>We are proud to be a 100% Employee-Owned Company!</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/about-us/who-we-are/" target="_blank" rel="noopener noreferrer">this link</a> for more detailed information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '6-2',
// //     component: (
// //       <div>
// //         <p>MAP for Good – Charitable Causes</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/about-us/charitable-causes/" target="_blank" rel="noopener noreferrer">this link</a> for more detailed information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '6-3',
// //     component: (
// //       <div>
// //         <p>Here you are not just an employee, you are an employee-owner. A fun and rewarding career with an answering service industry leader!</p>
// //         <p>Click <a href="https://www.mapcommunications.com/about-us/careers/" target="_blank" rel="noopener noreferrer">here</a> for more details.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '7',
// //     component: (
// //       <div>
// //         You can view our pricing details <a href="https://www.mapcommunications.com/pricing/" target="_blank" rel="noopener noreferrer">here</a>.
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '8',
// //     component: (
// //       <div>
// //         <p>Sales: 888-252-6555</p>
// //         <p>Customer Service: 800-627-0114</p>
// //         <p>Visit <a href="https://www.mapcommunications.com/customer-service/" target="_blank" rel="noopener noreferrer">this link</a> for more information.</p>
// //       </div>
// //     ),
// //     trigger: '10',
// //   },
// //   {
// //     id: '9',
// //     message: 'Please specify your query.',
// //     trigger: '10',
// //   },
// //   {
// //     id: '10',
// //     message: 'Is there anything else I can help you with?',
// //     trigger: '4',
// //   },
// // ];

// // // Define the theme for the chatbot
// // const theme = {
// //   background: 'linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)',
// //   headerBgColor: 'linear-gradient(90deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)',
// //   headerFontSize: '20px',
// //   botBubbleColor: '#0F3789',
// //   headerFontColor: 'white',
// //   botFontColor: 'white',
// //   userBubbleColor: '#FF5733',
// //   userFontColor: 'white',
// // };

// // // Define the configuration for the chatbot
// // const config = {
// //   botAvatar: botAvatar,
// //   floating: true,
// // };

// // // Define the ChatAssistant component
// // function ChatAssistant() {
// //   console.log('ChatAssistant rendered');
// //   return (
// //     <div className="ChatAssistant">
// //       <ThemeProvider theme={theme}>
// //         <ChatBot
// //           key="unique-key"
// //           headerTitle="ChatBot"
// //           steps={steps}
// //           {...config}
// //         />
// //       </ThemeProvider>
// //     </div>
// //   );
// // }

// // export default ChatAssistant;
