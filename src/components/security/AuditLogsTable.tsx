import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { mockAuditLogs } from '@/lib/mockData';
import { AuditLog } from '@/types';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const AuditLogsTable = () => {
  const { language } = useApp();
  const [logs] = useState<AuditLog[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleExport = () => {
    toast.success('Экспорт запущен', {
      description: 'CSV файл будет загружен через несколько секунд'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('search', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === 'ru' ? 'Все действия' : 'All Actions'}
            </SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="file_upload">File Upload</SelectItem>
            <SelectItem value="prompt_use">Prompt Use</SelectItem>
            <SelectItem value="user_create">User Create</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          {t('exportCSV', language)}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ru' ? 'Время' : 'Time'}</TableHead>
              <TableHead>{language === 'ru' ? 'Пользователь' : 'User'}</TableHead>
              <TableHead>{language === 'ru' ? 'Действие' : 'Action'}</TableHead>
              <TableHead>{language === 'ru' ? 'Ресурс' : 'Resource'}</TableHead>
              <TableHead>{language === 'ru' ? 'Результат' : 'Result'}</TableHead>
              <TableHead>Trace ID</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}
                </TableCell>
                <TableCell className="font-medium">{log.userEmail}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{log.resource}</TableCell>
                <TableCell>
                  <Badge variant={
                    log.result === 'success' ? 'default' :
                    log.result === 'error' ? 'destructive' : 'secondary'
                  }>
                    {log.result}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.traceId}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{t('eventDetails', language)}</DialogTitle>
                        <DialogDescription>
                          {language === 'ru' ? 'Подробная информация о событии' : 'Detailed event information'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Timestamp</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">User</p>
                            <p className="text-sm text-muted-foreground">{log.userEmail}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Action</p>
                            <p className="text-sm text-muted-foreground">{log.action}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Result</p>
                            <Badge variant={log.result === 'success' ? 'default' : 'destructive'}>
                              {log.result}
                            </Badge>
                          </div>
                        </div>
                        {log.details && (
                          <div>
                            <p className="text-sm font-medium mb-2">Details</p>
                            <pre className="bg-secondary p-3 rounded text-xs overflow-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
