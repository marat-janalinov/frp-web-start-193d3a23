import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import industrialBg1 from '@/assets/industrial-bg-1.jpg';
import industrialBg2 from '@/assets/industrial-bg-2.jpg';
import industrialBg3 from '@/assets/industrial-bg-3.jpg';
import idfLogo from '@/assets/idf-logo.svg';

const VariantSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <img src={idfLogo} alt="Фонд промышленности" className="h-16 mx-auto mb-6 drop-shadow-2xl animate-scale-in" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Выберите вариант интерфейса
          </h1>
          <p className="text-white/80 text-lg">
            Три варианта дизайна в корпоративных цветах Фонда промышленности Казахстана
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: '0.1s' }}>
            <div className="h-48 overflow-hidden">
              <img 
                src={industrialBg1} 
                alt="Вариант 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-primary">Вариант 1</CardTitle>
              <CardDescription>
                Классический дизайн с чистыми линиями и минималистичным подходом
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/login1">
                <Button className="w-full bg-accent hover:bg-accent/90 transition-all duration-300">
                  Открыть вариант
                </Button>
              </Link>
              <Link to="/variant1">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Перейти без входа
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: '0.2s' }}>
            <div className="h-48 overflow-hidden">
              <img 
                src={industrialBg2} 
                alt="Вариант 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-primary">Вариант 2</CardTitle>
              <CardDescription>
                Современный дизайн с градиентами и эффектом размытия
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/login2">
                <Button className="w-full bg-accent hover:bg-accent/90 transition-all duration-300">
                  Открыть вариант
                </Button>
              </Link>
              <Link to="/variant2">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Перейти без входа
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: '0.3s' }}>
            <div className="h-48 overflow-hidden">
              <img 
                src={industrialBg3}
                alt="Вариант 3" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-primary">Вариант 3</CardTitle>
              <CardDescription>
                Премиальный дизайн с акцентом на корпоративную идентичность
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/login3">
                <Button className="w-full bg-accent hover:bg-accent/90 transition-all duration-300">
                  Открыть вариант
                </Button>
              </Link>
              <Link to="/variant3">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Перейти без входа
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/original">
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all duration-300">
              Вернуться к оригиналу
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;
