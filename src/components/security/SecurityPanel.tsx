import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SecurityPanel = () => {
  const { language } = useApp();

  return (
    <div className="flex-1 bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('security', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Панель оператора информационной безопасности
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
