import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { ChatMessage } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Quote, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ExplainabilityPanelProps {
  message: ChatMessage | undefined;
  open: boolean;
  onToggleOpen: () => void;
}

export const ExplainabilityPanel = ({ message, open, onToggleOpen }: ExplainabilityPanelProps) => {
  const { language } = useApp();

  if (!message || message.role !== 'assistant') {
    return null;
  }

  return (
    <Collapsible open={open} onOpenChange={onToggleOpen}>
      <div className="border-t bg-card">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full h-12 flex items-center justify-between px-6 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="font-semibold">
                {language === 'ru' ? 'Источники и основания' : 
                 language === 'kz' ? 'Көздер мен негіздер' :
                 'Sources and Rationale'}
              </span>
            </div>
            {open ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-accordion-down">
          <div className="border-t">
            <Tabs defaultValue="sources" className="w-full">
              <TabsList className="mx-4 mt-4 mb-2">
                <TabsTrigger value="sources" className="flex-1">
                  <FileText className="h-3 w-3 mr-1" />
                  {t('sources', language)}
                </TabsTrigger>
                <TabsTrigger value="rationale" className="flex-1">
                  <Quote className="h-3 w-3 mr-1" />
                  {t('rationale', language)}
                </TabsTrigger>
                <TabsTrigger value="metadata" className="flex-1">
                  <Info className="h-3 w-3 mr-1" />
                  {t('metadata', language)}
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-64 px-4 py-2">
                <TabsContent value="sources" className="m-0 space-y-3">
            {message.sources && message.sources.length > 0 ? (
              message.sources.map(source => (
                <div key={source.id} className="p-3 bg-secondary rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{source.title}</h4>
                    {source.page && (
                      <Badge variant="outline" className="text-xs">
                        {language === 'ru' ? 'Стр.' : 'Page'} {source.page}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{source.excerpt}"</p>
                  <Badge variant="secondary" className="text-xs">
                    {source.type === 'document' ? 'Документ' : 
                     source.type === 'table' ? 'Таблица' : 'Глоссарий'}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Источники не указаны' : 'No sources available'}
              </p>
            )}
          </TabsContent>

          <TabsContent value="rationale" className="m-0 space-y-3">
            {message.sources && message.sources.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm">
                  {language === 'ru' 
                    ? 'Ответ основан на анализе следующих выдержек из документов:'
                    : 'The response is based on analysis of the following excerpts:'}
                </p>
                {message.sources.map(source => (
                  <div key={source.id} className="p-3 border-l-2 border-accent space-y-1">
                    <p className="text-xs font-medium">{source.title}</p>
                    <p className="text-sm text-muted-foreground italic">"{source.excerpt}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Основания не указаны' : 'No rationale available'}
              </p>
            )}
          </TabsContent>

          <TabsContent value="metadata" className="m-0 space-y-3">
            {message.metadata ? (
              <div className="space-y-3">
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'ru' ? 'Версия данных' : 'Data Version'}
                  </p>
                  <p className="text-sm font-medium">{message.metadata.dataVersion}</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'ru' ? 'Время обработки' : 'Processing Time'}
                  </p>
                  <p className="text-sm font-medium">{message.metadata.processingTime}s</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'ru' ? 'Уверенность' : 'Confidence'}
                  </p>
                  <p className="text-sm font-medium">{(message.metadata.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Метаданные недоступны' : 'No metadata available'}
              </p>
            )}
          </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
