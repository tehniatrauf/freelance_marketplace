// frontend/src/components/agent/AgentChat.jsx
import React, { useState } from 'react';
import api from '../../api/axiosConfig';

const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/agent/chat', { message: input });
      const assistantMessage = { role: 'assistant', content: response.data.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I am having trouble connecting right now.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col">
          <div className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">WorkConnect Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">✕</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-4">
                Hi! How can I help you with WorkConnect today?
              </p>
            )}
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`p-2 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-100 ml-auto max-w-[80%]' 
                    : 'bg-gray-100 max-w-[80%]'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg text-sm max-w-[80%]">
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask me anything..."
            />
            <button 
              onClick={handleSend} 
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default AgentChat;