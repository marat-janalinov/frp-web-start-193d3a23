import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import { IDFLogo } from '@/components/layout/IDFLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const HeaderVariant2 = () => {
  const { language, setLanguage, theme, toggleTheme } = useApp();

  return (
    <header className="backdrop-blur-xl bg-background/10 border-b border-primary/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="animate-scale-in">
            <IDFLogo className="h-16" language={language as 'ru' | 'en'} />
          </div>

          {/* Controls with modern hover effects */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown with glassmorphism */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="
                    backdrop-blur-xl bg-background/20 border-primary/30 
                    hover:bg-primary/20 hover:scale-105 hover:shadow-lg
                    transition-all duration-300 gap-2 rounded-xl
                  "
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-semibold">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="backdrop-blur-xl bg-background/95 border-primary/30 shadow-2xl"
              >
                <DropdownMenuItem 
                  onClick={() => setLanguage('ru')}
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  Русский
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className="hover:bg-primary/20 cursor-pointer"
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle with animation */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              className="
                backdrop-blur-xl bg-background/20 border-primary/30
                hover:bg-primary/20 hover:scale-105 hover:shadow-lg hover:rotate-180
                transition-all duration-500 rounded-xl
              "
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
