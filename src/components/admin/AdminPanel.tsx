import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminPanel = () => {
  const { language } = useApp();

  return (
    <div className="flex-1 bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Панель администратора системы
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
