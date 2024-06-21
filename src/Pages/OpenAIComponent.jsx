import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OpenAIComponent.css';
    import MapPage from './MapPage';

const OpenAIComponent = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setChatOpen] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const scrollDemoRef = useRef(null);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (isChatOpen && !sessionId) {
            // Generate a unique session ID
            setSessionId(Date.now().toString());
            setMessages([{ role: 'ai', content: 'Welcome to Map Communications! How can I assist you today?' }]);
        }
    }, [isChatOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');

        try {
            const res = await axios.post('http://localhost:5001/api/openai', {
                sessionId,
                userResponse: userMessage
            });
            const aiMessage = { role: 'ai', content: res.data.prompt };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            setMessages(prevMessages => [...prevMessages, { role: 'ai', content: 'Error fetching response from OpenAI' }]);
        }
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(()=>{
        messagesEndRef.current?.lastElementChild?.scrollIntoView()
    },[messages])

    const toggleChat = () => {
        setChatOpen(!isChatOpen);
    };

    return (
        <div>


            <MapPage/>







            <button className="floating-button" onClick={toggleChat}>
                <span>💬</span>
            </button>
            {isChatOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        <span>MAP Team</span>
                        <button className="close-button" onClick={toggleChat}></button>
                    </div>
                    <div className="chat-body" ref={messagesEndRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.role}`}>
                                <div className="chat-message-role">{msg.role === 'user' ? 'You' : 'MAP Team'}</div>
                                <div className="chat-message-content">{msg.content}</div>
                            </div>
                        ))}
                    </div>
                    <form className="chat-input-container" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message"
                            className="chat-input"
                        />
                        <button type="submit" className="chat-submit-button">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OpenAIComponent;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './OpenAIComponent.css';

// const OpenAIComponent = () => {
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [isChatOpen, setChatOpen] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const userMessage = { role: 'user', content: input };
//         setMessages(prevMessages => [...prevMessages, userMessage]);
//         setInput('');

//         try {
//             const res = await axios.post('http://localhost:5001/api/openai', { prompt: input });
//             const aiMessage = { role: 'ai', content: res.data };
//             setMessages(prevMessages => [...prevMessages, aiMessage]);
//         } catch (error) {
//             console.error('Error fetching response from OpenAI:', error);
//             setMessages(prevMessages => [...prevMessages, { role: 'ai', content: 'Error fetching response from OpenAI' }]);
//         }
//     };

//     const toggleChat = () => {
//         setChatOpen(!isChatOpen);
//     };

//     return (
//         <div>
//             <button className="floating-button" onClick={toggleChat}>
//                 <span>💬</span>
//             </button>
//             {isChatOpen && (
//                 <div className="chat-container">
//                     <div className="chat-header">
//                         <span>MAP Team</span>
//                         <button className="close-button" onClick={toggleChat}>×</button>
//                     </div>
//                     <div className="chat-body">
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`chat-message ${msg.role}`}>
//                                 <div className="chat-message-role">{msg.role === 'user' ? 'You' : 'MAP Team'}</div>
//                                 <div className="chat-message-content">{msg.content}</div>
//                             </div>
//                         ))}
//                     </div>
//                     <form className="chat-input-container" onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Type your message"
//                             className="chat-input"
//                         />
//                         <button type="submit" className="chat-submit-button">Send</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OpenAIComponent;
