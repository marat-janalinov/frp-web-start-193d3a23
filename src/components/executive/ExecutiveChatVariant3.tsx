import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { ChatArea } from './ChatArea';
import { ExplainabilityPanelVariant3 } from './ExplainabilityPanelVariant3';
import { Chat, ChatMessage } from '@/types';
import { mockChats, mockMessages } from '@/lib/mockData';
import { HeaderVariant3 } from '@/components/layout/HeaderVariant3';

export const ExecutiveChatVariant3 = () => {
  const { language } = useApp();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [openNonce, setOpenNonce] = useState(0);

  const handleMessageSelect = (id: string) => {
    setSelectedMessageId(id);
    setOpenNonce((n) => n + 1);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `c_${Date.now()}`,
      title: t('newChat', language),
      userId: 'u_001',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      hasFiles: false,
      messageCount: 0
    };
    setSelectedChat(newChat);
    setMessages([]);
    setSelectedMessageId(null);
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages.filter(m => m.chatId === chat.id));
    setSelectedMessageId(null);
  };

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  return (
    <>
      <HeaderVariant3 
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      
      <div className="flex flex-col h-screen">
        <ChatArea
          chat={selectedChat}
          messages={messages}
          onMessageSelect={handleMessageSelect}
        />
        
        <ExplainabilityPanelVariant3 key={`${selectedMessageId}-${openNonce}`} message={selectedMessage} />
      </div>
    </>
  );
};
