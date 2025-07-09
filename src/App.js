import React, { useState, useEffect, useRef, memo } from 'react';
import { ChevronRight, Search, Upload, GitCompare, BarChart3, Check, ArrowRight, Zap, Shield, Clock, TrendingUp, Menu, X, PlayCircle, Sparkles, MessageSquare } from 'lucide-react';

// Вынесем модальное окно в отдельный мемоизированный компонент
const DemoFormModal = memo(({ showDemoForm, setShowDemoForm }) => {
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

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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

  // Обработчик изменения поля формы
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!showDemoForm) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowDemoForm(false);
      }}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" />

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
            Покажем, как Athena решит ваши задачи. Ответим в течение 24 часов.
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  onChange={(e) => handleInputChange('company', e.target.value)}
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Количество юристов в компании
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
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
                  onChange={(e) => handleInputChange('message', e.target.value)}
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

const DevPlusWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDemo, setActiveDemo] = useState('search');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showDemoForm, setShowDemoForm] = useState(false);
  
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
    color: "from-blue-500 to-purple-600",
    gif: "/demos/search.gif"
  },
  upload: {
    icon: <Upload className="w-6 h-6" />,
    title: "Загрузка документов",
    description: "Перетащите файлы или целые папки. Система автоматически распознает и структурирует информацию",
    features: ["Поддержка всех форматов", "Автоматическое OCR", "Сохранение структуры"],
    color: "from-green-500 to-teal-600",
    gif: "/demos/upload.gif"
  },
  compare: {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "ИИ Ассистент",
    description: "Получайте экспертные ответы на юридические вопросы с указанием источников",
    features: ["Ответы на основе вашей базы документов", "Ссылки на конкретные статьи и документы", "Контекстное понимание вопросов"],
    color: "from-orange-500 to-red-600",
    gif: "/demos/assistant.gif"
  },
  analytics: {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Аналитика",
    description: "Отслеживайте эффективность команды и экономию времени в режиме реального времени",
    features: ["Статистика по пользователей", "Частые темы запросов", "Расчет экономии"],
    color: "from-purple-500 to-pink-600",
    gif: "/demos/analytics.gif"
  }
};

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
                Athena
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Возможности</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Тарифы</a>
              <a href="#demo" className="text-gray-700 hover:text-blue-600 transition-colors">Демо</a>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => setShowDemoForm(true)}>
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
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI-юрист
                  </span>
                  <br />
                  <span className="text-gray-900">нового поколения</span>
                </h1>
              </div>
              
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '200ms' }}>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Находите нужные документы за секунды, а не часы. 
                  Революционная система поиска по юридической базе знаний с AI.
                </p>
              </div>

              <div className="animate-fade-up opacity-0" style={{ animationDelay: '400ms' }}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center" onClick={() => setShowDemoForm(true)}>
                    Попробовать бесплатно
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

              
                </div>
              </div>

         <div className="animate-fade-up opacity-0" style={{ animationDelay: '600ms' }}>
  <p className="text-sm text-gray-600">
    Начните 14-дневный бесплатный период прямо сейчас
  </p>
</div>
            </div>

            <div className="animate-fade-up opacity-0 relative" style={{ animationDelay: '800ms' }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Компании-клиенты */}
      <section id="clients" className="py-20 bg-white">
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
  {[
    '/logos/company1.png',
    '/logos/company2.png', 
    '/logos/company3.png',
    '/logos/company4.png',
    '/logos/company5.png',
    '/logos/company6.png'

  ].map((logo, i) => (
    <div key={i} className="animate-scale opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
<div className="h-24 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
  <img 
    src={logo} 
    alt={`Клиент ${i + 1}`}
    className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
  />
</div>
    </div>
  ))}
</div>
      </section>

      {/* Проблемы */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-center mb-12">Знакомые проблемы?</h2>
          </div>

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
              <div key={i} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 200}ms` }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Демонстрация функций */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-center mb-12">Посмотрите, как это работает</h2>
          </div>

          <div className="animate-fade-up opacity-0" style={{ animationDelay: '200ms' }}>
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
          </div>

          <div className="animate-fade-up opacity-0" style={{ animationDelay: '400ms' }}>
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
           
              </div>
              
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
  {demos[activeDemo].gif ? (
    <img 
      src={demos[activeDemo].gif} 
      alt={`Демо: ${demos[activeDemo].title}`}
      className="w-full h-auto object-cover"
    />
  ) : (
    <div className={`aspect-video flex items-center justify-center text-white bg-gradient-to-br ${demos[activeDemo].color}`}>
      <div className="text-center">
        <PlayCircle className="w-20 h-20 mx-auto mb-4" />
        <p className="text-xl">[Демо: {demos[activeDemo].title}]</p>
      </div>
    </div>
  )}
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-center mb-12">Преимущества для вашего бизнеса</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💰", value: "ROI 300%", label: "Возврат инвестиций за 6 месяцев" },
              { icon: "⏱️", value: "3 часа/день", label: "Экономия времени каждого юриста" },
              { icon: "📈", value: "+40%", label: "Рост продуктивности отдела" },
              { icon: "🔒", value: "100%", label: "Безопасность ваших данных" }
            ].map((benefit, i) => (
              <div key={i} className="animate-scale opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <div className="text-3xl font-bold mb-2">{benefit.value}</div>
                  <p className="text-white/80">{benefit.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
 <section id="pricing" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
      <h2 className="text-4xl font-bold text-center mb-4">Выберите подходящий тариф</h2>
      <p className="text-xl text-gray-600 text-center mb-12">Начните с бесплатного пробного периода на 14 дней</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Стартовый",
          //price: "Цена по запросу",
          features: ["До 5 пользователей", "100 документов", "Базовый поиск", "Email поддержка", "Обновления законодательства"],
          popular: false,
          buttonText: "Начать бесплатно"
        },
        {
          name: "Профессиональный",
          //price: "Цена по запросу",
          features: ["До 20 пользователей", "1000 документов", "Расширенный AI-поиск", "API для интеграций", "Приоритетная поддержка 24/7", "Обучение сотрудников"],
          popular: true,
          buttonText: "Попробовать 14 дней"
        },
        {
          name: "Корпоративный",
          //price: "Цена по запросу",
          features: ["Неограниченно пользователей", "Неограниченно документов", "Выделенный сервер", "Кастомизация", "Персональный менеджер", "SLA гарантии"],
          popular: false,
          buttonText: "Получить расчет"
        }
      ].map((plan, i) => (
        <div key={i} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 200}ms` }}>
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
            <button 
              onClick={() => setShowDemoForm(true)}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA секция */}
      <section id="demo" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ускорьте работу юридического отдела в 3 раза
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Начните экономить до 3 часов в день на поиске документов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setShowDemoForm(true)}>
                Начать бесплатный период
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 font-semibold transition-all duration-300"
                      onClick={() => setShowDemoForm(true)}>
                Запросить демо
              </button>
            </div>
          </div>
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
                <span className="text-2xl font-bold text-white">Athena</span>
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
            <p>&copy; 2024 Athena. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Рендерим модальное окно */}
      <DemoFormModal showDemoForm={showDemoForm} setShowDemoForm={setShowDemoForm} />

      <style jsx global>{`
        @keyframes fade-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-up {
          transform: translateY(30px);
          animation: fade-up 1s ease-out forwards;
        }
        
        .animate-scale {
          transform: scale(0.9);
          animation: scale 1s ease-out forwards;
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