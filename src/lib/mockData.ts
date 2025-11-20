import { User, Chat, ChatMessage } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u_001',
    email: 'director@apx.kz',
    role: 'executive',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['руководитель', 'аналитика']
  },
  {
    id: 'u_002',
    email: 'admin@apx.kz',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['администратор']
  },
  {
    id: 'u_003',
    email: 'ib@apx.kz',
    role: 'security',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['информационная безопасность']
  }
];

export const mockChats: Chat[] = [
  {
    id: 'c_001',
    title: 'Анализ бизнес-плана Q3',
    userId: 'u_001',
    createdAt: '2025-10-01T14:30:00Z',
    updatedAt: '2025-10-01T15:45:00Z',
    isPinned: true,
    hasFiles: true,
    messageCount: 5
  },
  {
    id: 'c_002',
    title: 'Финансовая устойчивость компании',
    userId: 'u_001',
    createdAt: '2025-09-28T09:15:00Z',
    updatedAt: '2025-09-28T10:30:00Z',
    isPinned: false,
    hasFiles: false,
    messageCount: 3
  }
];

export const mockMessages: ChatMessage[] = [
  {
    id: 'm_001',
    chatId: 'c_001',
    role: 'user',
    content: 'Подготовь краткий анализ бизнес-плана',
    timestamp: '2025-10-01T14:30:00Z',
    attachments: [
      {
        id: 'a_001',
        name: 'bizplan_Q3.pdf',
        type: 'application/pdf',
        size: 2458624,
        status: 'done',
        progress: 100
      }
    ]
  },
  {
    id: 'm_002',
    chatId: 'c_001',
    role: 'assistant',
    content: '**Краткое резюме:** Бизнес-план на Q3 предусматривает увеличение выручки на 15%.',
    timestamp: '2025-10-01T14:31:30Z',
    sources: [
      {
        id: 's_001',
        title: 'bizplan_Q3.pdf',
        type: 'document',
        excerpt: 'Целевой показатель роста выручки составляет 15%...',
        page: 3
      }
    ],
    metadata: {
      dataVersion: 'КХД v1.4, 01.10.2025',
      processingTime: 1.5,
      confidence: 0.92
    }
  }
];
