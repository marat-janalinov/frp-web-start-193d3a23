import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreVertical, Lock, Unlock, Trash2, Key } from 'lucide-react';
import { toast } from 'sonner';

export const UsersTable = () => {
  const { language } = useApp();
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, user: User) => {
    toast.success(`${action} для ${user.email}`, {
      description: 'Действие выполнено успешно'
    });
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
          {t('createAccount', language)}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>{language === 'ru' ? 'Роль' : language === 'kz' ? 'Рөл' : 'Role'}</TableHead>
              <TableHead>{language === 'ru' ? 'Статус' : language === 'kz' ? 'Мәртебе' : 'Status'}</TableHead>
              <TableHead>{language === 'ru' ? 'Теги' : language === 'kz' ? 'Тегтер' : 'Tags'}</TableHead>
              <TableHead>{language === 'ru' ? 'Создан' : language === 'kz' ? 'Құрылды' : 'Created'}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {user.role === 'executive' ? t('executive', language) :
                     user.role === 'admin' ? t('admin', language) :
                     t('security', language)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status === 'active' ? 
                      (language === 'ru' ? 'Активен' : language === 'kz' ? 'Белсенді' : 'Active') :
                      (language === 'ru' ? 'Заблокирован' : language === 'kz' ? 'Бұғатталған' : 'Blocked')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.tags?.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('Сброс пароля', user)}>
                        <Key className="mr-2 h-4 w-4" />
                        {language === 'ru' ? 'Сброс пароля' : 'Reset Password'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(
                        user.status === 'active' ? 'Блокировка' : 'Разблокировка', user
                      )}>
                        {user.status === 'active' ? 
                          <Lock className="mr-2 h-4 w-4" /> : 
                          <Unlock className="mr-2 h-4 w-4" />
                        }
                        {user.status === 'active' ?
                          (language === 'ru' ? 'Заблокировать' : 'Block') :
                          (language === 'ru' ? 'Разблокировать' : 'Unblock')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleAction('Удаление', user)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('delete', language)}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
