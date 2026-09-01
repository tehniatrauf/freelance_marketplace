// src/components/messaging/ChatList.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const ChatList = ({ conversations, selectedId, onSelect, searchTerm, setSearchTerm }) => {
  const filteredConversations = conversations.filter(conv =>
    conv.participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        {filteredConversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ backgroundColor: '#f8fafc' }}
            onClick={() => onSelect(conversation.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
              selectedId === conversation.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="relative">
              <img
                src={conversation.participant?.avatar}
                alt={conversation.participant?.name}
                className="w-12 h-12 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                conversation.participant?.status === 'online' ? 'bg-green-500' :
                conversation.participant?.status === 'away' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`}></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-dark-900 truncate">
                  {conversation.participant?.name}
                </span>
                <span className="text-xs text-dark-400 whitespace-nowrap ml-2">
                  {conversation.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-dark-500 truncate">
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                {conversation.unread}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;