import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { mockPrompts } from '@/lib/mockData';
import { AIPromptTemplate } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Pencil, Copy } from 'lucide-react';

export const PromptsTable = () => {
  const { language } = useApp();
  const [prompts, setPrompts] = useState<AIPromptTemplate[]>(mockPrompts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = prompts.filter(prompt =>
    prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setPrompts(prompts.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('search', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('addPrompt', language)}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ru' ? 'Название' : language === 'kz' ? 'Атауы' : 'Name'}</TableHead>
              <TableHead>{language === 'ru' ? 'Описание' : language === 'kz' ? 'Сипаттама' : 'Description'}</TableHead>
              <TableHead>{language === 'ru' ? 'Категория' : language === 'kz' ? 'Санат' : 'Category'}</TableHead>
              <TableHead>{language === 'ru' ? 'Статус' : language === 'kz' ? 'Мәртебе' : 'Status'}</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">{prompt.name}</TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm text-muted-foreground line-clamp-2">{prompt.description}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{prompt.category}</Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={prompt.isActive}
                    onCheckedChange={() => toggleActive(prompt.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
