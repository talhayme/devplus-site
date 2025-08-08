import React, { useState, useEffect, useRef, memo } from 'react';
import { ChevronRight, Search, Upload, GitCompare, BarChart3, Check, ArrowRight, Zap, Shield, Clock, TrendingUp, Menu, X, PlayCircle, Sparkles, MessageSquare, FileText, Brain, Target, Users, Lock, Server, CheckCircle } from 'lucide-react';

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
    title: "Интеллектуальный поиск",
    description: "Система понимает смысл запроса и находит документы, даже если точные слова не совпадают",
    features: [
      "Понимает, что 'расторжение' = 'прекращение договора' = 'разрыв соглашения'",
      "Находит синонимы: 'неустойка' = 'штраф' = 'пени'",
      "Поиск за 1-3 секунды вместо часов"
    ],
    color: "from-blue-500 to-purple-600",
    gif: "/demos/search.gif",
    example: "Запрос: 'договоры с просрочкой платежа' → Найдет все документы с упоминанием штрафов, пеней, неустоек, санкций"
  },
  generate: {
    icon: <FileText className="w-6 h-6" />,
    title: "Генерация документов",
    description: "Создание договоров, исков и заявлений на основе вашей практики и шаблонов",
    features: [
      "Использует только ваши проверенные формулировки",
      "Учитывает актуальное законодательство",
      "Автозаполнение реквизитов и дат"
    ],
    color: "from-green-500 to-teal-600",
    gif: "/demos/upload.gif",  // Или другая подходящая GIF
    example: "Команда: 'Составь иск о взыскании долга' → Готовый документ на основе ваших шаблонов"
  },
  assistant: {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI-ассистент юриста",
    description: "Отвечает на вопросы на основе вашей базы документов с указанием источников",
    features: [
      "Анализирует судебную практику вашей компании",
      "Дает пошаговые инструкции",
      "Всегда указывает источники информации"
    ],
    color: "from-orange-500 to-red-600",
    gif: "/demos/assistant.gif",
    example: "Вопрос: 'Как уволить за прогул?' → Пошаговая инструкция со ссылками на ваши документы"
  },
  analytics: {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Аналитика и отчетность",
    description: "Отслеживайте эффективность команды и экономию времени",
    features: [
      "Статистика по каждому сотруднику",
      "Популярные темы запросов",
      "ROI калькулятор в реальном времени"
    ],
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
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Преимущества</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Тарифы</a>
              <a href="#security" className="text-gray-700 hover:text-blue-600 transition-colors">Безопасность</a>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => setShowDemoForm(true)}>
                Попробовать 14 дней бесплатно
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
                  <span className="text-gray-900">Найдите любой документ</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    за секунды
                  </span>
                </h1>
              </div>
              
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '200ms' }}>
                <p className="text-xl text-gray-600 leading-relaxed">
                  RAG-система для юристов с интеллектуальным поиском. <strong>80% экономия времени</strong> на поиске документов подтверждена исследованием Harvard Law School.
                </p>
              </div>

              <div className="animate-fade-up opacity-0" style={{ animationDelay: '400ms' }}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center" onClick={() => setShowDemoForm(true)}>
                    Попробовать 14 дней бесплатно
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="animate-fade-up opacity-0" style={{ animationDelay: '600ms' }}>
                <div className="flex items-center space-x-8">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">26 сек</p>
                    <p className="text-sm text-gray-600">вместо 92 минут на анализ договора*</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">ROI меньше 2 мес</p>
                    <p className="text-sm text-gray-600">окупаемость инвестиций</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *По данным исследования LawGeex <a href="https://www.virtasant.com/ai-today/ai-contract-mangement-legal" className="underline" target="_blank" rel="noopener noreferrer">[источник]</a>
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
                      <p className="text-gray-600 mb-2">Запрос:</p>
                      <p className="text-lg font-medium">увольнение беременной</p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="font-semibold text-blue-900">Найдено по ст. 261 ТК РФ:</p>
                        <p className="text-sm mt-2">• Увольнение запрещено (кроме ликвидации)</p>
                        <p className="text-sm">• Срочный договор продлевается до окончания беременности</p>
                        <p className="text-sm">• Перевод на легкий труд обязателен</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded px-3 py-1 text-sm">📄 ТК РФ ст. 261</div>
                        <div className="bg-gray-100 rounded px-3 py-1 text-sm">📄 Ваша практика: 12 дел</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция "Как это работает" */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Как работает интеллектуальный поиск</h2>
            <p className="text-xl text-gray-600">В отличие от обычного поиска, который ищет только точные слова</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-red-800">❌ Обычный поиск</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• "договор аренды" ≠ "арендное соглашение"</li>
                  <li>• Пропускает синонимы и связанные понятия</li>
                  <li>• Работает как Ctrl+F в Word</li>
                  <li>• Нужно помнить точные формулировки</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-800">✅ RAG-система Athena</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• "договор аренды" = "арендное соглашение" = "договор найма"</li>
                  <li>• Понимает: "расторжение" = "прекращение" = "разрыв"</li>
                  <li>• Работает как опытный юрист</li>
                  <li>• Понимает контекст и смысл запроса</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Живые примеры поиска:</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900">Запрос: "договоры с просрочкой платежа"</p>
                <p className="text-sm mt-2">→ Найдет ВСЕ документы с упоминанием: штрафов, пеней, неустоек, санкций, ответственности за неисполнение</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900">Запрос: "ответственность директора"</p>
                <p className="text-sm mt-2">→ Найдет: субсидиарную ответственность, привлечение к ответственности, банкротство, административную ответственность</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <p className="font-semibold text-green-900">Запрос: "можно ли уволить за прогул?"</p>
                <p className="text-sm mt-2">→ Не только найдет документы, но и даст пошаговую инструкцию с учетом вашей практики</p>
              </div>
            </div>
          </div>
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
                title: "16 часов на анализ документов",
                description: "По данным Harvard Law School, юристы тратят до 16 часов на рутинные задачи, которые AI выполняет за минуты",
                icon: <Clock className="w-8 h-8" />
              },
              {
                title: "22% времени можно автоматизировать",
                description: "McKinsey: примерно 22% работы юриста может быть автоматизировано с помощью AI",
                icon: <TrendingUp className="w-8 h-8" />
              },
              {
                title: "Поиск занимает часы",
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
    <div className="animate-fade-up opacity-0" style={{ animationDelay: '400ms' }}>
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-6">
      <h3 className="text-3xl font-bold">{demos[activeDemo].title}</h3>
      <p className="text-xl text-gray-600">{demos[activeDemo].description}</p>
      
      {demos[activeDemo].example && (
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-sm font-medium">{demos[activeDemo].example}</p>
        </div>
      )}
      
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
          <div className="text-center p-8">
            <div className="text-6xl mb-4">{demos[activeDemo].icon}</div>
            <p className="text-xl">Демонстрация: {demos[activeDemo].title}</p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
      </section>

      {/* Преимущества с цифрами и источниками */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-center mb-4">Доказанная эффективность</h2>
            <p className="text-xl text-center mb-12 text-white/90">Подтверждено исследованиями ведущих организаций</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "⏱️", 
                value: "80%", 
                label: "Экономия времени на поиске",
                source: "Harvard Law School",
                link: "https://clp.law.harvard.edu/knowledge-hub/insights/the-impact-of-artificial-intelligence-on-law-law-firms-business-models/"
              },
              { 
                icon: "📈", 
                value: "16ч → 4мин", 
                label: "Сокращение времени на анализ",
                source: "Harvard Law School",
                link: "https://clp.law.harvard.edu/knowledge-hub/insights/the-impact-of-artificial-intelligence-on-law-law-firms-business-models/"
              },
              { 
                icon: "🚀", 
                value: "94%", 
                label: "Точность AI анализа",
                source: "LawGeex Study",
                link: "https://www.virtasant.com/ai-today/ai-contract-mangement-legal"
              },
              { 
                icon: "💰", 
                value: "< 2 мес", 
                label: "Окупаемость инвестиций",
                source: "Расчет ROI"
              }
            ].map((benefit, i) => (
              <div key={i} className="animate-scale opacity-0" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <div className="text-3xl font-bold mb-2">{benefit.value}</div>
                  <p className="text-white/80 mb-2">{benefit.label}</p>
                  {benefit.link ? (
                    <a href={benefit.link} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white underline">
                      {benefit.source} ↗
                    </a>
                  ) : (
                    <p className="text-xs text-white/60">{benefit.source}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-white/80">
              Дополнительно: Использование AI юристами выросло с 19% до 79% за один год
              <a href="https://www.lawnext.com/2024/10/ai-adoption-by-legal-professionals-jumps-from-19-to-79-in-one-year-clio-study-finds.html" 
                 className="underline ml-1" target="_blank" rel="noopener noreferrer">
                (Clio Study 2024)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Безопасность */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Безопасность корпоративного уровня</h2>
            <p className="text-xl text-gray-600">Критично важно для работы с конфиденциальными документами</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Шифрование данных",
                description: "Все документы хранятся в зашифрованном виде с использованием AES-256"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Изоляция данных",
                description: "Полная изоляция между организациями, мульти-тенантная архитектура"
              },
              {
                icon: <Server className="w-8 h-8" />,
                title: "On-premise опция",
                description: "Возможность развертывания на ваших серверах для полного контроля"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Соответствие 152-ФЗ",
                description: "Полное соответствие требованиям по защите персональных данных"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Разграничение доступа",
                description: "Гибкие роли и права доступа вплоть до отдельных документов"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Аудит действий",
                description: "Полное логирование всех действий пользователей в системе"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-center mb-4">Прозрачные тарифы</h2>
            <p className="text-xl text-gray-600 text-center mb-12">14 дней бесплатно для всех тарифов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Старт",
                //price: "25 000",
                //priceNote: "₽/мес",
                features: [
                  "До 5 юристов",
                  "До 1000 документов", 
                  "500 запросов в день",
                  "Базовая поддержка",
                  "Обновления законодательства"
                ],
                popular: false,
                buttonText: "Начать бесплатно"
              },
              {
                name: "Команда",
                //price: "75 000",
                //priceNote: "₽/мес",
                features: [
                  "До 20 юристов",
                  "До 10 000 документов",
                  "Неограниченные запросы",
                  "API для интеграций",
                  "Приоритетная поддержка",
                  "Обучение сотрудников"
                ],
                popular: true,
                buttonText: "Попробовать 14 дней"
              },
              {
                name: "Корпоративный",
                //price: "От 150 000",
                //priceNote: "₽/мес",
                features: [
                  "Неограниченно пользователей",
                  "Неограниченно документов",
                  "On-premise опция",
                  "Кастомизация под процессы",
                  "Персональный менеджер",
                  "SLA 99.9%"
                ],
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
                      Популярный выбор
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg ml-2">{plan.priceNote}</span>
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

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              
            </p>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section id="demo" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0ms' }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Готовы сэкономить 80% времени на рутине?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Присоединяйтесь к юристам, которые уже используют AI для повышения эффективности
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setShowDemoForm(true)}>
                Начать 14 дней бесплатно
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
              <p className="text-sm">Legal RAG System — интеллектуальная система поиска по юридическим документам с AI-ассистентом</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API документация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">База знаний</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вебинары</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кейсы клиентов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Исследования</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">support@athenalegal.tech</a></li>
                <li><a href="#" className="hover:text-white transition-colors">+7 (499) 123-45-67</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram поддержка</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Athena Legal Tech. Все права защищены. ИП Фамилия И.О.</p>
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