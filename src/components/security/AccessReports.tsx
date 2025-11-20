import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const AccessReports = () => {
  const { language } = useApp();

  const handleGenerateReport = () => {
    toast.success('Отчёт формируется', {
      description: 'Файл будет готов через несколько секунд'
    });
  };

  // Mock data for visualization
  const roleStats = [
    { role: 'Руководитель', operations: 145, percentage: 48 },
    { role: 'Администратор', operations: 89, percentage: 30 },
    { role: 'Оператор ИБ', operations: 66, percentage: 22 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {language === 'ru' ? 'Статистика доступа' :
             language === 'kz' ? 'Қолжетімділік статистикасы' :
             'Access Statistics'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'ru' ? 'Анализ активности по ролям за последний месяц' :
             'Role activity analysis for the last month'}
          </p>
        </div>
        <Button onClick={handleGenerateReport}>
          <Download className="mr-2 h-4 w-4" />
          {t('generateReport', language)}
        </Button>
      </div>

      <div className="grid gap-4">
        {roleStats.map((stat) => (
          <Card key={stat.role}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{stat.role}</CardTitle>
                  <CardDescription>
                    {stat.operations} {language === 'ru' ? 'операций' : 'operations'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-2xl font-bold">{stat.percentage}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ru' ? 'Распределение операций' : 'Operations Distribution'}
          </CardTitle>
          <CardDescription>
            {language === 'ru' ? 'Типы выполненных операций' : 'Types of executed operations'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'file_upload', count: 142, color: 'bg-accent' },
              { type: 'prompt_use', count: 98, color: 'bg-primary' },
              { type: 'user_create', count: 34, color: 'bg-secondary' },
              { type: 'login', count: 26, color: 'bg-muted' }
            ].map((op) => (
              <div key={op.type} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${op.color}`} />
                <span className="flex-1 text-sm font-medium">{op.type}</span>
                <span className="text-sm text-muted-foreground">{op.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
