// frontend/src/components/messaging/Messages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaCheck,
  FaCheckDouble,
  FaUser,
  FaCircle
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axiosConfig';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

const Messages = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize Socket.IO
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
    });
    setSocket(newSocket);

    // Join with user ID
    if (user?.id) {
      newSocket.emit('user-joined', user.id);
    }

    // Listen for online users
    newSocket.on('user-online', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('user-offline', (userId) => {
      setOnlineUsers(prev => prev.filter(id => id !== userId));
    });

    // Listen for new messages
    newSocket.on('new-message', (data) => {
      if (data.conversationId === selectedConversation) {
        setMessages(prev => [...prev, data.message]);
      }
      // Update conversation list
      fetchConversations();
    });

    // Listen for typing
    newSocket.on('user-typing', (data) => {
      if (data.conversationId === selectedConversation) {
        setTypingUser(data.userId);
        setTyping(true);
      }
    });

    newSocket.on('user-stopped-typing', (data) => {
      if (data.conversationId === selectedConversation) {
        setTyping(false);
        setTypingUser(null);
      }
    });

    // Listen for read receipts
    newSocket.on('messages-read', (data) => {
      if (data.conversationId === selectedConversation) {
        setMessages(prev => 
          prev.map(msg => 
            msg.sender_id === data.userId ? { ...msg, is_read: 'Y' } : msg
          )
        );
      }
    });

    return () => {
      newSocket.close();
    };
  }, [user?.id, selectedConversation]);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/conversations');
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for selected conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await api.get(`/messages/${conversationId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  // Send message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const selected = conversations.find(c => c.conversation_id === selectedConversation);
    if (!selected) return;

    const messageData = {
      conversationId: selectedConversation,
      receiverId: selected.participant_id,
      text: messageInput.trim(),
      attachments: []
    };

    // Emit via socket
    if (socket) {
      socket.emit('send-message', messageData);
    }

    // Optimistically add message
    const newMessage = {
      id: Date.now(),
      text: messageInput.trim(),
      sender_id: user.id,
      sender_name: user.name,
      is_read: 'N',
      created_at: new Date().toISOString(),
      optimistic: true
    };
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
    setTyping(false);
  };

  // Handle typing
  const handleTyping = () => {
    if (!selectedConversation) return;
    
    const selected = conversations.find(c => c.conversation_id === selectedConversation);
    if (!selected) return;

    if (!typing && socket) {
      socket.emit('typing', {
        receiverId: selected.participant_id,
        conversationId: selectedConversation
      });
      setTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (socket) {
        socket.emit('stop-typing', {
          receiverId: selected.participant_id,
          conversationId: selectedConversation
        });
      }
      setTyping(false);
    }, 1000);
  };

  // Select conversation
  const handleSelectConversation = async (conversationId) => {
    setSelectedConversation(conversationId);
    await fetchMessages(conversationId);
    
    // Mark as read
    if (socket) {
      const selected = conversations.find(c => c.conversation_id === conversationId);
      if (selected) {
        socket.emit('mark-read', {
          conversationId,
          senderId: selected.participant_id
        });
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  const selectedConv = conversations.find(c => c.conversation_id === selectedConversation);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-primary pl-12"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations
            .filter(conv => 
              conv.participant_name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((conversation) => (
              <motion.div
                key={conversation.conversation_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ backgroundColor: '#f8fafc' }}
                onClick={() => handleSelectConversation(conversation.conversation_id)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                  selectedConversation === conversation.conversation_id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conversation.participant_avatar || `https://ui-avatars.com/api/?name=${conversation.participant_name}`}
                    alt={conversation.participant_name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    isUserOnline(conversation.participant_id) ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-dark-900 truncate">
                      {conversation.participant_name}
                    </span>
                    <span className="text-xs text-dark-400 whitespace-nowrap ml-2">
                      {formatTime(conversation.last_message_time)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-500 truncate">
                    {conversation.last_message_text}
                  </p>
                </div>
                {conversation.unread_count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                    {conversation.unread_count}
                  </span>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation && selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedConv.participant_avatar || `https://ui-avatars.com/api/?name=${selectedConv.participant_name}`}
                alt={selectedConv.participant_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold text-dark-900">
                  {selectedConv.participant_name}
                </div>
                <div className="text-sm text-dark-500 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isUserOnline(selectedConv.participant_id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {isUserOnline(selectedConv.participant_id) ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaPhone className="text-dark-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaVideo className="text-dark-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaEllipsisV className="text-dark-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isOwn = message.sender_id === user.id;
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl p-3 ${
                      isOwn 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-dark-700'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.optimistic && (
                        <span className="text-xs opacity-70 ml-2">Sending...</span>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-xs text-dark-400 ${
                      isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{formatTime(message.created_at)}</span>
                      {isOwn && !message.optimistic && (
                        <span>
                          {message.is_read === 'Y' ? 
                            <FaCheckDouble className="text-blue-500" /> : 
                            <FaCheck className="text-dark-400" />
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {typing && typingUser && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaPaperclip className="text-dark-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaSmile className="text-dark-400" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  handleTyping();
                }}
                placeholder="Type a message..."
                className="flex-1 input-primary py-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`btn-primary p-3 rounded-xl ${
                  !messageInput.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FaUser className="text-3xl text-dark-400" />
          </div>
          <h3 className="text-xl font-semibold text-dark-900 mb-2">No conversation selected</h3>
          <p className="text-dark-500 max-w-sm">
            Choose a conversation from the list to start messaging.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;