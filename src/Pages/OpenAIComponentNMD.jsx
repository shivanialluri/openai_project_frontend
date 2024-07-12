import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OpenAIComponent.css';
    import MapPage from './MapPage';
import NotifyMDPage from './NotifyMDPage';

const OpenAIComponentNMD = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setChatOpen] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [ isTyping,setIsTyping ] = useState(false);
    const scrollDemoRef = useRef(null);
    const messagesEndRef = useRef(null)

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('brand');

    console.log("queryparams",myParam);

    useEffect(() => {
        if (isChatOpen && !sessionId) {
            // Generate a unique session ID
            const id = Date.now().toString();
            setSessionId(id);
            
            // setMessages([{ role: 'ai', content: 'Welcome to Map Communications! How can I assist you today?' }]);
        }
    }, [isChatOpen]);

    useEffect(()=>{
        if(sessionId && sessionId !=""){
            initialMessage();
        }
        
    },[sessionId])

    const initialMessage = async() => {
        try {
            const res = await axios.post('http://localhost:5001/api/openai?brand=notifymd', {
                sessionId,
                userResponse: { role: 'user', content: 'Hello' }
            });
            const aiMessage = { role: 'ai', content: res.data.prompt };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            setMessages(prevMessages => [...prevMessages, { role: 'ai', content: 'Error fetching response from OpenAI' }]);
        }
    }

    const handleSubmit = async (e) => {
        setIsTyping(true);
        e.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');

        try {
            const res = await axios.post('http://localhost:5001/api/openai?brand=notifymd', {
                sessionId,
                userResponse: userMessage
            });
            const aiMessage = { role: 'ai', content: res.data.prompt };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            setMessages(prevMessages => [...prevMessages, { role: 'ai', content: 'Error fetching response from OpenAI' }]);
        }
        setIsTyping(false);
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


            <NotifyMDPage/>







            <button className="floating-button" onClick={toggleChat}>
                <span>💬</span>
            </button>
            {isChatOpen && (
                <div className="chat-container" style={{zIndex:1000}}>
                    <div className="chat-header">
                        <span>NotifyMD Team</span>
                        <button className="close-button" onClick={toggleChat}></button>
                    </div>
                    <div className="chat-body" ref={messagesEndRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.role}`}>
                                <div className="chat-message-role">{msg.role === 'user' ? 'You' : 'NotifyMD Team'}</div>
                                <div className="chat-message-content">{msg.content}</div>
                            </div>
                        ))}
                        {isTyping && <div className="typing">
                            <div className="typing__dot"></div>
                            <div className="typing__dot"></div>
                            <div className="typing__dot"></div>
                        </div>}
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

export default OpenAIComponentNMD;



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
