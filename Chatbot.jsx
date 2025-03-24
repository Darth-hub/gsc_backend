import React, { useState, useEffect } from 'react';
import '../Chatbot.css';
import robot from '../../Components/images/robot.png'

const ChatFlow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello, how are you doing?',
      sender: 'user',
      time: '08:15 AM'
    },
    {
      id: 2,
      text: 'I\'m doing well, thank you! How can I help you today?',
      sender: 'assistant',
      time: '08:16 AM'
    },
    {
      id: 3,
      text: 'I have a question about the return policy for a product I purchased.',
      sender: 'user',
      time: 'Just Now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility

  // Simulate assistant typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: 'Just Now'
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate assistant typing
    setIsTyping(true);
    setTimeout(() => {
      const assistantReply = {
        id: messages.length + 2,
        text: 'I understand you have a question about our return policy. Products can be returned within 30 days of purchase with a valid receipt.',
        sender: 'assistant',
        time: 'Just Now'
      };
      setMessages(prev => [...prev, assistantReply]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Bot Icon */}
      <div className="floating-bot-icon" onClick={() => setShowChat(!showChat)}>
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="Chatbot Icon" />
      </div>

      {/* Chatbot UI */}
      {showChat && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-content">
              <div className="logo-container">
                <div className="logo">C</div>
              </div>
              <div className="title-container">
                <h1>ECLYRA</h1>
                <p>A live chat interface that allows for seamless, natural communication and connection.</p>
              </div>
            </div>
            <button className="close-button" onClick={() => setShowChat(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === 'assistant' && (
                  <div className="avatar">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-20%20at%2010.00.07%E2%80%AFAM-KWk2rBfZvTEF1FPRyzxPxhLVeKdaDM.png" alt="Assistant" />
                  </div>
                )}
                <div className="message-content">
                  {message.sender === 'assistant' && <div className="sender">Assistant</div>}
                  <div className="bubble">{message.text}</div>
                  <div className="timestamp">{message.time}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message assistant">
                <div className="avatar">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-20%20at%2010.00.07%E2%80%AFAM-KWk2rBfZvTEF1FPRyzxPxhLVeKdaDM.png" alt="Assistant" />
                </div>
                <div className="message-content">
                  <div className="sender">Assistant</div>
                  <div className="bubble typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input">
            <button className="emoji-button">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </button>
            <input 
              type="text" 
              placeholder="Reply..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="attachment-button">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
            <button className="send-button" onClick={handleSendMessage}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatFlow;