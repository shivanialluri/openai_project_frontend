// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const StorefrontDialog = ({ open, onClose }) => {
//   const [storeName, setStoreName] = useState('');
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
// //   const email = user ? user.email : '';

//   const handleNameChange = (e) => {
//     setStoreName(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/storefront', {
//         storename: storeName,
//         // email: email, // Send email to identify the user
//       });
//       console.log('Storefront created:', response.data);
//       onClose();
//       navigate('/storefront', { state: { storeName: storeName } }); // Pass storeName to StoreFront component
//     } catch (error) {
//       console.error('Error creating storefront', error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         <Typography style={{color:'#FD6585'}} variant="h5" component="div" gutterBottom>
//           Open Your Storefront
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <Box mb={2}>
//           <Typography variant="body1" gutterBottom>
//             Enter the name of your new storefront:
//           </Typography>
//         </Box>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Storefront Name"
//           type="text"
//           fullWidth
//           value={storeName}
//           onChange={handleNameChange}
//           variant="outlined"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button style={{background:'#FD6585'}} onClick={onClose} color="primary" variant="outlined">
//           Cancel
//         </Button>
//         <Button style={{background:'#FD6585'}} onClick={handleSubmit} color="primary" variant="contained">
//           Next
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default StorefrontDialog;

// let conversationState = {};

// app.post('/api/openai', async (req, res) => {
//     const { sessionId, userResponse } = req.body;

//     if (!sessionId) {
//         return res.status(400).json({ error: 'Session ID is required' });
//     }

//     // Initialize the conversation state for the session if not already present
//     if (!conversationState[sessionId]) {
//         conversationState[sessionId] = { step: 0, name: '', email: '', contact: '' };
//     }

//     const state = conversationState[sessionId];

//     try {
//         let prompt;
//         switch (state.step) {
//             case 0:
//                 prompt = 'Hello! Can I have your name, please?';
//                 state.step++;
//                 break;
//             case 1:
//                 state.name = userResponse;
//                 prompt = `Thank you, ${state.name}. Can I have your email address, please?`;
//                 state.step++;
//                 break;
//             case 2:
//                 state.email = userResponse;
//                 prompt = 'Thanks! Can I have your contact number, please?';
//                 state.step++;
//                 break;
//             case 3:
//                 state.contact = userResponse;
//                 prompt = `Thanks for providing your details, ${state.name}. How can I assist you today?`;
//                 state.step++;
//                 break;
//             case 4:
//                 const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//                     model: 'gpt-3.5-turbo',
//                     messages: [
//                         { role: 'system', content: 'It all began over 30 years ago in New York when a small, but scrappy group of individuals came together to improve the way businesses and their customers communicated. Driven by an innovative spirit and dedication to customer service, MAP Communications began earning the trust of more and more companies and organizations. A lot has changed for us since the early 1990s, but that commitment to excellent service has remained and will continue to drive the way we do business. How did we create a leading answering service to help support businesses with sales, customer support, and more? How did we create multiple call centers that seamlessly integrate with your systems and processes to provide more detailed, thoughtful and even more compassionate responses to your caller’s questions? By becoming very good listeners. Whether we are having a conversation with a potential client who is telling us about the challenges they face or an existing partner who wants to do more with our services, we listen. Each organization we work with is unique in some (or many) way(s), so we enjoy hearing about what you’d like to accomplish and discussing great solutions. Please answer any question matching from the above context, if not answer saying I am not able to assist for your question Do you want me to create a support ticket.' },
//                         { role: 'user', content: userResponse }
//                     ],
//                     max_tokens: 100,
//                 }, {
//                     headers: {
//                         'Authorization': `Bearer ${apiKey}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 prompt = response.data.choices[0].message.content;
//                 break;
//             default:
//                 prompt = 'I am unable to assist with your query at this moment.';
//                 break;
//         }

//         res.json({ prompt });
//     } catch (error) {
//         console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Reset conversation state periodically to avoid indefinite state retention
// setInterval(() => {
//     conversationState = {};
// }, 3600000);

// let conversationState = {};

// app.post('/api/openai', async (req, res) => {
//     const { sessionId, userResponse } = req.body;

//     if (!sessionId) {
//         return res.status(400).json({ error: 'Session ID is required' });
//     }

//     // Initialize the conversation state for the session if not already present
//     if (!conversationState[sessionId]) {
//         conversationState[sessionId] = { step: 0, name: '', email: '', contact: '', userId: null };
//     }

//     const state = conversationState[sessionId];

//     try {
//         let prompt;
//         switch (state.step) {
//             case 0:
//                 prompt = 'Hello! Can I have your name, please?';
//                 state.step++;
//                 break;
//             case 1:
//                 state.name = userResponse;
//                 prompt = `Thank you, ${state.name}. Can I have your email address, please?`;
//                 state.step++;
//                 break;
//             case 2:
//                 state.email = userResponse;
//                 prompt = 'Thanks! Can I have your contact number, please?';
//                 state.step++;
//                 break;
//             case 3:
//                 state.contact = userResponse;

//                 // Insert user information into chatusers table
//                 const userQuery = `
//                     INSERT INTO chatusers (name, email, contact, conversation_start) 
//                     VALUES ($1, $2, $3, NOW()) RETURNING id
//                 `;
//                 const userValues = [state.name, state.email, state.contact];
//                 const userResult = await pool.query(userQuery, userValues);
//                 state.userId = userResult.rows[0].id;
//                 console.log('Inserted into chatusers, ID:', state.userId);

//                 prompt = `Thanks for providing your details, ${state.name}. How can I assist you today?`;
//                 state.step++;
//                 break;
//             case 4:
//                 // Context message
//                 const systemMessage = {
//                     role: 'system',
//                     content: 'It all began over 30 years ago in New York when a small, but scrappy group of individuals came together to improve the way businesses and their customers communicated. Driven by an innovative spirit and dedication to customer service, MAP Communications began earning the trust of more and more companies and organizations. A lot has changed for us since the early 1990s, but that commitment to excellent service has remained and will continue to drive the way we do business. How did we create a leading answering service to help support businesses with sales, customer support, and more? How did we create multiple call centers that seamlessly integrate with your systems and processes to provide more detailed, thoughtful and even more compassionate responses to your caller’s questions? By becoming very good listeners. Whether we are having a conversation with a potential client who is telling us about the challenges they face or an existing partner who wants to do more with our services, we listen. Each organization we work with is unique in some (or many) way(s), so we enjoy hearing about what you’d like to accomplish and discussing great solutions. Please answer any question matching from the above context, if not answer saying I am not able to assist for your question. Do you want me to create a support ticket?'
//                 };

//                 // Send context message and user's response to OpenAI
//                 const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//                     model: 'gpt-3.5-turbo',
//                     messages: [
//                         systemMessage,
//                         { role: 'user', content: userResponse }
//                     ],
//                     max_tokens: 100,
//                 }, {
//                     headers: {
//                         'Authorization': `Bearer ${apiKey}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 prompt = response.data.choices[0].message.content;

//                 // Set conversation end time
//                 const updateEndTimeQuery = `
//                     UPDATE chatusers
//                     SET conversation_end = NOW()
//                     WHERE id = $1
//                 `;
//                 await pool.query(updateEndTimeQuery, [state.userId]);
//                 console.log('Updated conversation end time for user ID:', state.userId);

//                 state.step++;
//                 break;
//             default:
//                 prompt = 'I am unable to assist with your query at this moment.';

//                 // Set conversation end time if not already set
//                 if (!state.conversationEndSet) {
//                     const updateEndTimeQuery = `
//                         UPDATE chatusers
//                         SET conversation_end = NOW()
//                         WHERE id = $1
//                     `;
//                     await pool.query(updateEndTimeQuery, [state.userId]);
//                     console.log('Updated conversation end time for user ID:', state.userId);
//                     state.conversationEndSet = true;
//                 }
//                 break;
//         }

//         res.json({ prompt });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Reset conversation state periodically to avoid indefinite state retention
// setInterval(() => {
//     conversationState = {};
// }, 3600000);