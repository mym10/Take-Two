import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";

const ChatDrawer = ({ open, toggleDrawer }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { type: 'user', text: input },
        { type: 'bot', text: 'Processing...' }
      ]);
      setInput("");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      hideBackdrop
      sx={{
        '& .MuiDrawer-paper': {
          width: '350px',
          height: '450px',
          position: 'absolute',
          top: 'auto',
          bottom: '40px',
          right: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '16px',
          overflow: 'hidden',
        },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/*Header*/}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
            marginBottom: '10px',
          }}
        >
          <h2 style={{ margin: 0 }}>Chatbot</h2>
          <IoClose
            onClick={toggleDrawer(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/*Chat*/}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#f1f1f1',
            padding: '8px',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        >
          <p style={{ marginBottom: '12px', backgroundColor: '#E5f0DA', padding: '8px 12px', borderRadius: '8px', maxWidth: '80%', }}>
            Welcome! How can I assist you today?
          </p>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.type === 'user' ? 'right' : 'left',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: msg.type === 'user' ? '#E3F2FD' : '#E5f0DA',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  maxWidth: '80%',
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/*Input*/}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '8px',
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: '#374151',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ChatDrawer;
