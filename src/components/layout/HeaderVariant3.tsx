import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Plus, MessageSquare, Pin, FileText, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import idfLogo from '@/assets/idf-logo.svg';
import { mockChats } from '@/lib/mockData';
import { useState } from 'react';
import { Chat } from '@/types';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeaderVariant3Props {
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export const HeaderVariant3 = ({ selectedChat, onSelectChat, onNewChat }: HeaderVariant3Props) => {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter(c => c.isPinned);
  const regularChats = filteredChats.filter(c => !c.isPinned);
  const chatsWithFiles = filteredChats.filter(c => c.hasFiles);

  return (
    <div className="fixed left-0 top-0 bottom-0 z-50 group w-6" >
      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize" aria-hidden="true" />
      <header className="absolute left-0 top-0 bottom-0 w-80 -translate-x-full group-hover:translate-x-0 bg-gradient-to-b from-background via-background/98 to-background/95 backdrop-blur-xl border-r border-border/50 shadow-2xl transition-all duration-500 ease-out overflow-hidden">
        <div className="h-full flex flex-col py-6">
        {/* Logo section with glow effect */}
        <div className="px-4 mb-4 flex items-center gap-3">
          <div className="relative bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-2.5 shadow-xl shrink-0 animate-pulse" style={{ animationDuration: '3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-md opacity-50" />
            <img src={idfLogo} alt="ФРП" className="h-9 brightness-0 invert relative z-10" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden whitespace-nowrap">
            <h1 className="text-sm font-bold text-foreground leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              История чатов
            </h1>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="px-3 mb-3">
          <Button
            onClick={onNewChat}
            size="sm"
            className="w-full justify-start rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg h-12 bg-gradient-to-r from-primary to-accent"
          >
            <Plus className="h-5 w-5 shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden whitespace-nowrap">
              {t('newChat', language)}
            </span>
          </Button>
        </div>

        {/* Search */}
        <div className="px-3 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder={t('search', language)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Tabs and Chat History */}
        <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-3 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <TabsTrigger value="all" className="flex-1 text-xs">{t('allChats', language)}</TabsTrigger>
            <TabsTrigger value="files" className="flex-1 text-xs">{t('withFiles', language)}</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-3">
            <TabsContent value="all" className="m-0">
              {pinnedChats.length > 0 && (
                <div className="mb-3">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-wider">
                    {t('pinned', language)}
                  </p>
                  <div className="space-y-1.5">
                    {pinnedChats.map((chat, index) => (
                      <ChatItemButton 
                        key={chat.id}
                        chat={chat}
                        isSelected={selectedChat?.id === chat.id}
                        onSelect={onSelectChat}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-1.5">
                {regularChats.map((chat, index) => (
                  <ChatItemButton 
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChat?.id === chat.id}
                    onSelect={onSelectChat}
                    index={pinnedChats.length + index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="m-0">
              <div className="space-y-1.5">
                {chatsWithFiles.map((chat, index) => (
                  <ChatItemButton 
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChat?.id === chat.id}
                    onSelect={onSelectChat}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        {/* Controls at bottom with glass effect */}
        <div className="px-3 space-y-2 border-t border-border/50 pt-4 mt-4 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="w-full justify-start rounded-2xl h-10 font-bold text-xs border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Globe className="h-4 w-4 shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden whitespace-nowrap">
              {language.toUpperCase()}
            </span>
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start rounded-2xl h-10 border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {theme === 'light' ? <Moon className="h-4 w-4 shrink-0" /> : <Sun className="h-4 w-4 shrink-0" />}
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden whitespace-nowrap">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  </div>
  );
};

interface ChatItemButtonProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chat: Chat) => void;
  index: number;
}

const ChatItemButton = ({ chat, isSelected, onSelect, index }: ChatItemButtonProps) => {
  return (
    <button
      onClick={() => onSelect(chat)}
      className={cn(
        "w-full text-left rounded-2xl p-3 transition-all duration-300 hover:scale-105 group/item relative overflow-hidden",
        isSelected 
          ? "bg-gradient-to-r from-primary/20 to-accent/20 shadow-lg border border-primary/30" 
          : "hover:bg-muted/50 border border-transparent"
      )}
      style={{
        animation: `fade-in 0.4s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative z-10 flex items-start gap-2">
        <MessageSquare className={cn(
          "h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300",
          isSelected ? "text-primary" : "text-muted-foreground"
        )} />
        
        <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-xs font-medium text-foreground truncate leading-tight">
              {chat.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              {chat.isPinned && <Pin className="h-3 w-3 text-primary" />}
              {chat.hasFiles && <FileText className="h-3 w-3 text-muted-foreground" />}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{chat.messageCount} сообщ.</span>
          </div>
        </div>
      </div>
    </button>
  );
};
