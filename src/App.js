import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Search, Upload, GitCompare, BarChart3, Check, ArrowRight, Zap, Shield, Clock, TrendingUp, Menu, X, PlayCircle, Sparkles } from 'lucide-react';

const DevPlusWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDemo, setActiveDemo] = useState('search');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    employees: '1-5',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    transform: scrollY > 100 ? 'translateY(0)' : 'translateY(0)',
    backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(0px)',
    background: scrollY > 50 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)',
    boxShadow: scrollY > 50 ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
  };

  const demos = {
    search: {
      icon: <Search className="w-6 h-6" />,
      title: "Умный поиск",
      description: "AI понимает контекст вашего вопроса и находит релевантную информацию во всех документах",
      features: ["Поиск на естественном языке", "Учет синонимов и юридической терминологии", "Ранжирование по релевантности"],
      color: "from-blue-500 to-purple-600"
    },
    upload: {
      icon: <Upload className="w-6 h-6" />,
      title: "Загрузка документов",
      description: "Перетащите файлы или целые папки. Система автоматически распознает и структурирует информацию",
      features: ["Поддержка всех форматов", "Автоматическое OCR", "Сохранение структуры"],
      color: "from-green-500 to-teal-600"
    },
    compare: {
      icon: <GitCompare className="w-6 h-6" />,
      title: "Сравнение версий",
      description: "Мгновенно находите различия между версиями договоров с AI-анализом важности изменений",
      features: ["Визуальное выделение", "AI-анализ критичности", "История версий"],
      color: "from-orange-500 to-red-600"
    },
    analytics: {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Аналитика",
      description: "Отслеживайте эффективность команды и экономию времени в режиме реального времени",
      features: ["Статистика по пользователям", "Частые темы запросов", "Расчет экономии"],
      color: "from-purple-500 to-pink-600"
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Временное решение - отправка напрямую в Telegram
    const TELEGRAM_BOT_TOKEN = '7981860487:AAEWXPGYxUPm-_kakYLABZtnHuVW3wUaI0Y';
    const TELEGRAM_CHAT_ID = '111748497';
    
    const message = `
🔔 Новая заявка на демо!

👤 Имя: ${formData.name}
🏢 Компания: ${formData.company}
📧 Email: ${formData.email}
📱 Телефон: ${formData.phone}
👥 Количество юристов: ${formData.employees}
💬 Сообщение: ${formData.message || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          employees: '1-5',
          message: ''
        });
        setTimeout(() => {
          setShowDemoForm(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Модальное окно с формой
  const DemoFormModal = React.memo(() => {
    if (!showDemoForm) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" onClick={(e) => {
        if (e.target === e.currentTarget) setShowDemoForm(false);
      }}>
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Фон */}
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" />

          {/* Модальное окно */}
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowDemoForm(false)}
                className="text-gray-400 hover:text-gray-500"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Запросить демонстрацию
            </h3>
            <p className="text-gray-600 mb-6">
              Покажем, как DEV Plus решит ваши задачи. Ответим в течение 24 часов.
            </p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Заявка отправлена!</h4>
                <p className="text-gray-600">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Компания *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Количество юристов в компании
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.employees}
                    onChange={(e) => setFormData(prev => ({...prev, employees: e.target.value}))}
                  >
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">Более 50</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Комментарий
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                    placeholder="Расскажите о ваших задачах..."
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm">
                    Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  });

  // Простейший компонент анимации - только появление, без исчезновения
// Исправленный компонент анимации - замените существующий AnimatedCard на этот
  const AnimatedCard = React.memo(({ children, delay = 0, className = "", animation = "fade-up" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [delay, hasAnimated]);

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-5',
    'fade-in': 'opacity-0',
    'scale': 'opacity-0 scale-95',
    'slide-right': 'opacity-0 -translate-x-5'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
          : animationClasses[animation] || animationClasses['fade-up']
      } ${className}`}
    >
      {children}
    </div>
  );
});

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Навбар */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={navbarStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DEV Plus
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Возможности</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Тарифы</a>
              <a href="#demo" className="text-gray-700 hover:text-blue-600 transition-colors">Демо</a>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Начать бесплатно
              </button>
              <button 
                onClick={() => setShowDemoForm(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Запросить демо
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Анимированный фон */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
            style={{ transform: `translate(-${scrollY * 0.1}px, -${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.15}px)` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedCard>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI-юрист
                  </span>
                  <br />
                  <span className="text-gray-900">нового поколения</span>
                </h1>
              </AnimatedCard>
              
              <AnimatedCard delay={200}>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Находите нужные документы за секунды, а не часы. 
                  Революционная система поиска по юридической базе знаний с AI.
                </p>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                    Попробовать бесплатно
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors flex items-center justify-center">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    Смотреть демо
                  </button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="flex items-center space-x-8">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">500+ компаний</span> уже используют DEV Plus
                  </p>
                </div>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={800} className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="bg-gray-100 p-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="p-8">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-600 mb-2">Поиск:</p>
                      <p className="text-lg">Срок исковой давности по трудовым спорам?</p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="font-semibold text-blue-900">Найдено в 3 источниках:</p>
                        <p className="text-sm mt-2">• 1 месяц - для обжалования увольнения</p>
                        <p className="text-sm">• 3 месяца - для взыскания зарплаты</p>
                        <p className="text-sm">• 1 год - по индивидуальным трудовым спорам</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded px-3 py-1 text-sm">📄 ТК РФ ст. 392</div>
                        <div className="bg-gray-100 rounded px-3 py-1 text-sm">📄 Пост. Пленума ВС №2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Компании-клиенты */}
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-4">Нам доверяют лидеры рынка</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Более 500 компаний оптимизировали юридические процессы с DEV Plus
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[...Array(6)].map((_, i) => (
              <AnimatedCard key={i} delay={i * 100} animation="scale">
                <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer group">
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">Логотип {i + 1}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Проблемы */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-12">Знакомые проблемы?</h2>
          </AnimatedCard>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Часами ищете нужную статью",
                description: "Тратите время на поиск в многотомных кодексах и постоянно обновляющемся законодательстве",
                icon: <Clock className="w-8 h-8" />
              },
              {
                title: "Пропускаете важные изменения",
                description: "Сложно отследить все поправки в законах и новые судебные прецеденты",
                icon: <TrendingUp className="w-8 h-8" />
              },
              {
                title: "Рутинный поиск информации",
                description: "Одни и те же запросы приходится искать снова и снова в разных источниках",
                icon: <Search className="w-8 h-8" />
              }
            ].map((problem, i) => (
              <AnimatedCard key={i} delay={i * 200}>
                <div 
                  className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === i ? 'bg-red-500 scale-110' : 'bg-red-100'
                  }`}>
                    <X className={`w-8 h-8 ${hoveredCard === i ? 'text-white' : 'text-red-500'}`} />
                  </div>
                  <div className="text-gray-400 mb-4">{problem.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                  <p className="text-gray-600">{problem.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Демонстрация функций */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-12">Посмотрите, как это работает</h2>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    activeDemo === key
                      ? 'bg-gradient-to-r ' + demo.color + ' text-white shadow-lg transform scale-105'
                      : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {demo.icon}
                  <span>{demo.title}</span>
                </button>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">{demos[activeDemo].title}</h3>
                <p className="text-xl text-gray-600">{demos[activeDemo].description}</p>
                <ul className="space-y-3">
                  {demos[activeDemo].features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Попробовать эту функцию
                </button>
              </div>
              
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${demos[activeDemo].color}`}>
                <div className="aspect-video flex items-center justify-center text-white">
                  <div className="text-center">
                    <PlayCircle className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-xl">[Демо: {demos[activeDemo].title}]</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-12">Преимущества для вашего бизнеса</h2>
          </AnimatedCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💰", value: "ROI 300%", label: "Возврат инвестиций за 6 месяцев" },
              { icon: "⏱️", value: "3 часа/день", label: "Экономия времени каждого юриста" },
              { icon: "📈", value: "+40%", label: "Рост продуктивности отдела" },
              { icon: "🔒", value: "100%", label: "Безопасность ваших данных" }
            ].map((benefit, i) => (
              <AnimatedCard key={i} delay={i * 100} animation="scale">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <div className="text-3xl font-bold mb-2">{benefit.value}</div>
                  <p className="text-white/80">{benefit.label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-4">Выберите подходящий тариф</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Начните с бесплатного пробного периода на 14 дней</p>
          </AnimatedCard>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Стартовый",
                price: "29 900",
                features: ["До 5 пользователей", "100 документов", "Базовый поиск", "Email поддержка", "Обновления законодательства"],
                popular: false
              },
              {
                name: "Профессиональный",
                price: "79 900",
                features: ["До 20 пользователей", "1000 документов", "Расширенный AI-поиск", "API для интеграций", "Приоритетная поддержка 24/7", "Обучение сотрудников"],
                popular: true
              },
              {
                name: "Корпоративный",
                price: "Индивидуально",
                features: ["Неограниченно пользователей", "Неограниченно документов", "Выделенный сервер", "Кастомизация", "Персональный менеджер", "SLA гарантии"],
                popular: false
              }
            ].map((plan, i) => (
              <AnimatedCard key={i} delay={i * 200}>
                <div className={`relative rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Популярный
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Индивидуально" && <span className="text-lg"> ₽/мес</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start space-x-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                        <span className={plan.popular ? 'text-white' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  }`}>
                    {plan.price === "Индивидуально" ? "Получить расчет" : "Выбрать тариф"}
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section id="demo" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-white mb-6">
              Готовы революционизировать вашу юридическую работу?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Присоединяйтесь к 500+ компаниям, которые уже экономят время и повышают эффективность с DEV Plus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:-translate-y-1">
                Начать бесплатный период
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 font-semibold transition-all duration-300"
                      onClick={() => setShowDemoForm(true)}>
                Запросить демо
              </button>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">DEV Plus</span>
              </div>
              <p className="text-sm">Революционная AI-платформа для юридических отделов</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Интеграции</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус системы</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 DEV Plus. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <DemoFormModal />

      <style jsx global>{`
        .animated-element.animated-visible {
          opacity: 1 !important;
          transform: none !important;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default DevPlusWebsite;