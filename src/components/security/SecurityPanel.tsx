import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditLogsTable } from './AuditLogsTable';
import { AccessReports } from './AccessReports';
import { FileText, BarChart3 } from 'lucide-react';

export const SecurityPanel = () => {
  const { language } = useApp();

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="logs" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t('auditLogs', language)}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('accessReports', language)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <AuditLogsTable />
          </TabsContent>

          <TabsContent value="reports">
            <AccessReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
