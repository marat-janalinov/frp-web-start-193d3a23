import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Chat } from '@/types';
import { mockChats } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ExecutiveChat = () => {
  const { language } = useApp();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('executive', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Добро пожаловать в панель руководителя
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedChat(mockChats[0])}>
                {t('newChat', language)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
