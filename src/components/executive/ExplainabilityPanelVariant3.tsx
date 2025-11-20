import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { ChatMessage } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Quote, Info, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExplainabilityPanelVariant3Props {
  message: ChatMessage | undefined;
}

export const ExplainabilityPanelVariant3 = ({ message }: ExplainabilityPanelVariant3Props) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'sources' | 'rationale' | 'metadata'>('sources');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [message?.id]);

  if (!message || message.role !== 'assistant' || !isVisible) {
    return null;
  }

  const tabs = [
    { id: 'sources' as const, icon: FileText, label: t('sources', language) },
    { id: 'rationale' as const, icon: Quote, label: t('rationale', language) },
    { id: 'metadata' as const, icon: Info, label: t('metadata', language) },
  ];

  return (
    <div className="fixed right-6 top-24 bottom-6 w-96 z-40 animate-slide-in-right">
      <div className="h-full bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with glow effect */}
        <div className="relative px-6 py-5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-50" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {language === 'ru' ? 'Источники ответа' : 
                   language === 'kz' ? 'Жауап көздері' :
                   'Response Sources'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {language === 'ru' ? 'Прозрачность AI' : 'AI Transparency'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation with floating style */}
        <div className="px-4 py-4">
          <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content with custom scrollbar */}
        <ScrollArea className="flex-1 px-4 pb-4">
          <div className="space-y-3 pr-2">
            {activeTab === 'sources' && (
              <>
                {message.sources && message.sources.length > 0 ? (
                  message.sources.map((source, index) => (
                    <div
                      key={source.id}
                      className="group p-4 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      style={{
                        animation: `fade-in 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm flex-1 leading-tight">{source.title}</h4>
                        {source.page && (
                          <Badge variant="outline" className="text-xs shrink-0 ml-2 bg-background/50">
                            {language === 'ru' ? 'Стр.' : 'Page'} {source.page}
                          </Badge>
                        )}
                      </div>
                      <div className="relative pl-4 border-l-2 border-primary/30 mb-3">
                        <p className="text-xs text-muted-foreground italic leading-relaxed">"{source.excerpt}"</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                      >
                        {source.type === 'document' ? 'Документ' : 
                         source.type === 'table' ? 'Таблица' : 'Глоссарий'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'ru' ? 'Источники не указаны' : 'No sources available'}
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'rationale' && (
              <>
                {message.sources && message.sources.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
                      <Quote className="h-8 w-8 text-primary/50 mb-3" />
                      <p className="text-sm leading-relaxed">
                        {language === 'ru' 
                          ? 'Ответ основан на анализе следующих выдержек из документов:'
                          : 'The response is based on analysis of the following excerpts:'}
                      </p>
                    </div>
                    {message.sources.map((source, index) => (
                      <div 
                        key={source.id}
                        className="p-4 bg-secondary/30 rounded-2xl border-l-4 border-accent space-y-2 hover:bg-secondary/50 transition-all duration-300"
                        style={{
                          animation: `fade-in 0.3s ease-out ${index * 0.1}s both`
                        }}
                      >
                        <p className="text-xs font-semibold text-primary">{source.title}</p>
                        <p className="text-sm text-muted-foreground italic leading-relaxed">"{source.excerpt}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Quote className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'ru' ? 'Основания не указаны' : 'No rationale available'}
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'metadata' && (
              <>
                {message.metadata ? (
                  <div className="space-y-3">
                    <div className="p-5 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {language === 'ru' ? 'Версия данных' : 'Data Version'}
                        </p>
                      </div>
                      <p className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {message.metadata.dataVersion}
                      </p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {language === 'ru' ? 'Время обработки' : 'Processing Time'}
                        </p>
                      </div>
                      <p className="text-lg font-bold">{message.metadata.processingTime}s</p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {language === 'ru' ? 'Уверенность' : 'Confidence'}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold">{(message.metadata.confidence * 100).toFixed(0)}%</p>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                            style={{ width: `${message.metadata.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Info className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'ru' ? 'Метаданные недоступны' : 'No metadata available'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
