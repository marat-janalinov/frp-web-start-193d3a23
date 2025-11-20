import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import industrialBg from '@/assets/industrial-bg-1.jpg';
import { IDFLogo } from '@/components/layout/IDFLogo';

const LoginVariant1 = () => {
  const [language, setLanguage] = useState('ru');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/variant1');
  };

  const translations = {
    kk: {
      title: 'Жүйеге кіру',
      description: 'Жалғастыру үшін тіркелгі деректерін енгізіңіз',
      login: 'Логин',
      password: 'Құпия сөз',
      loginButton: 'Кіру',
      language: 'Тіл'
    },
    ru: {
      title: 'Вход в систему',
      description: 'Введите учетные данные для продолжения',
      login: 'Логин',
      password: 'Пароль',
      loginButton: 'Войти',
      language: 'Язык'
    },
    en: {
      title: 'System Login',
      description: 'Enter your credentials to continue',
      login: 'Login',
      password: 'Password',
      loginButton: 'Sign In',
      language: 'Language'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-background">
      <div 
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${industrialBg})` }}
      />
      
      <Card className="w-full max-w-md relative z-10 animate-scale-in border-primary/20" style={{ boxShadow: 'var(--shadow-elevated)' }}>
        <CardHeader className="space-y-4">
          <div className="flex justify-center py-3 text-foreground">
            <IDFLogo className="h-20 sm:h-24" language={language as 'ru' | 'kk' | 'en'} />
          </div>
          <div className="flex justify-end">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kk">Қазақша</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardTitle className="text-2xl text-center text-primary font-bold">{t.title}</CardTitle>
          <CardDescription className="text-center text-muted-foreground">{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login">{t.login}</Label>
            <Input id="login" type="text" placeholder={t.login} className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <Input id="password" type="password" placeholder={t.password} className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
          </div>
          <Button 
            onClick={handleLogin}
            className="w-full" 
            size="lg"
          >
            {t.loginButton}
          </Button>
          <div className="text-center pt-4">
            <Link to="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary transition-colors">
                ← Вернуться к выбору вариантов
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginVariant1;
