import React, { useState, useEffect } from 'react';
import { MessageSquare, FileSearch, Zap, ChevronDown, Menu, X, Check, Briefcase, Scale, BarChart3, Users, ShoppingCart, Headphones, Calendar, FileText, Clock, User } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interests: [],
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const interestOptions = [
    { id: 'assistant', label: 'Персональный ассистент (календарь, почта, задачи)' },
    { id: 'documents', label: 'Поиск по документам компании' },
    { id: 'automation', label: 'Автоматизация отчетов и рутины' },
    { id: 'other', label: 'Другое / не уверен' }
  ];

  const faqItems = [
    {
      q: "Какой ИИ вы используете?",
      a: "Зависит от задачи. Чаще всего - Claude (Anthropic) и GPT-4 (OpenAI). Для персональных ассистентов - OpenClaw. Подберём оптимальный вариант под ваши задачи и бюджет."
    },
    {
      q: "Сколько стоит использование после установки?",
      a: "Сам софт бесплатный или с минимальной платой. Вы платите за API - обычно $10-30/мес. Поможем настроить лимиты."
    },
    {
      q: "Нужен ли свой сервер?",
      a: "Не обязательно. Можем развернуть в облаке за $10-20/мес. Если есть свой сервер - настроим у вас."
    },
    {
      q: "Где будут храниться наши документы?",
      a: "На вашем сервере или в защищённом облаке - вы выбираете. Данные не передаются третьим лицам. Можем подписать NDA."
    },
    {
      q: "Чем это лучше обычного ChatGPT?",
      a: "ChatGPT забывает контекст и не знает ваших документов. Мы настраиваем ИИ под вас: он помнит контекст, ищет в ваших файлах, выполняет действия."
    },
    {
      q: "Нужны ли технические знания?",
      a: "С вашей стороны - нет. Вы общаетесь с ИИ как с человеком. Всю техническую часть берём на себя."
    },
    {
      q: "Сколько времени занимает внедрение?",
      a: "Простые решения - 3-5 дней. Комплексные - 1-2 недели. Точный срок скажем после консультации."
    }
  ];

  const services = [
    {
      icon: MessageSquare,
      title: "Персональный ассистент",
      price: "от 29 900 руб.",
      description: "ИИ-помощник в Telegram, WhatsApp или Slack. Помнит контекст, выполняет задачи, работает 24/7.",
      features: [
        "Управление календарём",
        "Напоминания и сводки",
        "Поиск информации",
        "Работа с почтой",
        "Заметки и задачи"
      ]
    },
    {
      icon: FileSearch,
      title: "Поиск по документам",
      price: "от 49 900 руб.",
      description: "Сотрудники задают вопрос - получают ответ с цитатой из ваших документов.",
      features: [
        "Договоры и регламенты",
        "Инструкции и базы знаний",
        "Ответы за 2-3 секунды",
        "Ссылка на источник",
        "Работает в Telegram/Web"
      ]
    },
    {
      icon: Zap,
      title: "ИИ-автоматизации",
      price: "от 39 900 руб.",
      description: "Настраиваем ИИ для конкретных задач: отчёты, обработка заявок, генерация контента.",
      features: [
        "Еженедельные отчёты",
        "Обработка почты",
        "Ответы клиентам",
        "Анализ данных"
      ]
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Консультация",
      text: "Обсуждаем задачи. Что автоматизировать? Где болит?",
      time: "30 минут"
    },
    {
      num: "02",
      title: "Настройка",
      text: "Разворачиваем ИИ, загружаем документы, настраиваем под вас.",
      time: "3-7 дней"
    },
    {
      num: "03",
      title: "Тестирование",
      text: "Проверяем на реальных задачах. Дорабатываем.",
      time: "2-3 дня"
    },
    {
      num: "04",
      title: "Запуск",
      text: "Обучаем команду, запускаем в работу. Поддержка 2-4 недели.",
      time: "1-2 часа"
    }
  ];

  const examples = [
    { icon: Briefcase, role: "Руководитель", text: "Утренняя сводка в Telegram: встречи, письма, задачи. Экономлю 30 мин/день" },
    { icon: Scale, role: "Юрист", text: "Ищу пункты в договорах через бота. Ответ за секунды с цитатой" },
    { icon: BarChart3, role: "Маркетолог", text: "Прошу собрать информацию по теме и сделать саммари. 2 часа - 10 минут" },
    { icon: Users, role: "HR-отдел", text: "Новички спрашивают бота про отпуска, больничные, правила. Не дёргают коллег" },
    { icon: ShoppingCart, role: "Менеджер продаж", text: "Перед звонком - справка о клиенте. Собирает из CRM и интернета" },
    { icon: Headphones, role: "Поддержка", text: "ИИ отвечает на типовые вопросы. 60% обращений закрываются сами" }
  ];

  const pricing = [
    {
      name: "СТАРТ",
      price: "29 900",
      subtitle: "Одно решение на выбор",
      description: "Ассистент в Telegram / Поиск по документам / Одна автоматизация",
      features: [
        "Базовая настройка",
        "Обучение 1 час",
        "Поддержка 2 недели"
      ],
      timeline: "3-5 дней",
      popular: false,
      buttonText: "Выбрать"
    },
    {
      name: "БИЗНЕС",
      price: "79 900",
      subtitle: "Комплексное внедрение",
      description: null,
      features: [
        "Персональный ассистент",
        "Поиск по документам",
        "До 1000 документов",
        "2-3 автоматизации",
        "Telegram + Web-интерфейс",
        "Обучение",
        "Поддержка 1 месяц"
      ],
      timeline: "1-2 недели",
      popular: true,
      buttonText: "Выбрать"
    },
    {
      name: "ПОД КЛЮЧ",
      price: "от 150 000",
      subtitle: "Всё под вас",
      description: null,
      features: [
        "Всё из \"Бизнес\"",
        "Кастомные сценарии",
        "Интеграции с вашими системами",
        "Обучение команды",
        "Поддержка 3 месяца"
      ],
      timeline: "2-4 недели",
      popular: false,
      buttonText: "Обсудить"
    }
  ];

  const forWhom = {
    suitable: [
      "Руководитель, который тонет в рутине",
      "Команда, которая тратит часы на поиск в документах",
      "Бизнес, где одни и те же вопросы задают снова и снова",
      "Вы хотите использовать ИИ, но не хотите разбираться в технике",
      "Уже пробовали ChatGPT - хотите что-то более мощное"
    ],
    notSuitable: [
      "Нужен чат-бот для сайта (это другое)",
      "Хотите \"попробовать ИИ\" без конкретной задачи",
      "Ищете самое дешёвое решение",
      "Компания меньше 5 человек"
    ]
  };

  // Yandex.Metrika
  useEffect(() => {
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106184385', 'ym');

    window.ym(106184385, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const interestLabels = formData.interests.map(id => {
      const option = interestOptions.find(o => o.id === id);
      return option ? option.label : id;
    }).join('\n  - ');

    // Формируем сообщение для Telegram
    const message = `Новая заявка на внедрение ИИ!

Имя: ${formData.name}
Контакт: ${formData.contact}

Интересует:
  - ${interestLabels || 'Не выбрано'}

Подробности: ${formData.details || 'Не указано'}

Время: ${new Date().toLocaleString('ru-RU')}`;

    try {
      // Отправляем в Telegram
      const response = await fetch('https://api.telegram.org/bot7981860487:AAEWXPGYxUPm-_kakYLABZtnHuVW3wUaI0Y/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '111748497',
          text: message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          contact: '',
          interests: [],
          details: ''
        });
      } else {
        alert('Ошибка отправки. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка отправки. Попробуйте позже.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestChange = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Custom Styles - Dark Premium AI Design */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --bg-primary: #09090B;
          --bg-secondary: #111113;
          --bg-elevated: #18181B;
          --surface: rgba(255, 255, 255, 0.03);
          --surface-hover: rgba(255, 255, 255, 0.06);
          --surface-border: rgba(255, 255, 255, 0.08);
          --text-primary: #FAFAFA;
          --text-secondary: #A1A1AA;
          --text-muted: #71717A;
          --accent-violet: #8B5CF6;
          --accent-purple: #A855F7;
          --accent-blue: #6366F1;
        }

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .bg-dark-primary {
          background-color: var(--bg-primary);
        }

        .bg-dark-secondary {
          background-color: var(--bg-secondary);
        }

        .gradient-text {
          background: linear-gradient(135deg, #FAFAFA 0%, #A1A1AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-accent {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          color: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
        }

        .btn-outline-dark {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--surface-border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .btn-outline-dark:hover {
          border-color: var(--accent-violet);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .glass-card {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: var(--surface-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }

        .glass-card-featured {
          background: var(--surface);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          position: relative;
          transition: all 0.3s ease;
        }
        .glass-card-featured::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .glass-card-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
        }

        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .icon-gradient {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          border-radius: 12px;
        }

        .number-gradient {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-item {
          border-bottom: 1px solid var(--surface-border);
          transition: all 0.2s ease;
        }
        .faq-item:hover .faq-question {
          color: var(--accent-purple);
        }

        .form-input {
          background: var(--bg-elevated);
          border: 1px solid var(--surface-border);
          color: var(--text-primary);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: var(--accent-violet);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          outline: none;
        }
        .form-input::placeholder {
          color: var(--text-muted);
        }

        .checkbox-dark {
          width: 20px;
          height: 20px;
          border: 1px solid var(--surface-border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
          flex-shrink: 0;
          background: var(--bg-elevated);
        }
        .checkbox-dark.checked {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          border-color: transparent;
        }

        .mini-card-dark {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .mini-card-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .popular-badge {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(9, 9, 11, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Athena Dev</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection('how')}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              Как работает
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              Тарифы
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              FAQ
            </button>
          </nav>

          <button
            className="hidden md:block btn-gradient px-5 py-2.5 text-sm font-semibold"
            onClick={() => scrollToSection('contact')}
          >
            Обсудить проект
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4" style={{ background: 'var(--bg-primary)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="text-left py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Как работает
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Тарифы
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                FAQ
              </button>
              <button
                className="btn-gradient px-5 py-2.5 text-sm font-semibold mt-2"
                onClick={() => scrollToSection('contact')}
              >
                Обсудить проект
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="hero-glow"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 gradient-text" style={{ letterSpacing: '-0.02em' }}>
                Внедрим ИИ за 1-2 недели
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Персональные ассистенты, поиск по документам, автоматизация рутины - настроим под ваши задачи. Без программистов и технических знаний с вашей стороны.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full icon-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>Ассистент в Telegram, WhatsApp или Slack</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full icon-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>Поиск по вашим документам за секунды</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full icon-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>Автоматизация отчётов и рутинных задач</span>
                </div>
              </div>

              <button
                className="btn-gradient px-8 py-4 text-base font-semibold mb-3"
                onClick={() => scrollToSection('contact')}
              >
                Обсудить внедрение
              </button>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Бесплатная консультация 30 минут
              </p>
            </div>

            {/* Right Column - Mini Cards */}
            <div className="space-y-4">
              {/* Card 1 - Assistant */}
              <div className="mini-card-dark p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl icon-gradient flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Ассистент в Telegram</div>
                    <div className="rounded-lg p-3 mb-2" style={{ background: 'var(--bg-elevated)' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>"Что у меня сегодня?"</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                      <p className="text-sm" style={{ color: 'var(--accent-violet)' }}>"3 встречи, 4 письма требуют ответа. Напомнить про счёт до 18:00?"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Documents */}
              <div className="mini-card-dark p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl icon-gradient flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Поиск по документам</div>
                    <div className="rounded-lg p-3 mb-2" style={{ background: 'var(--bg-elevated)' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>"Найди пункт про оплату"</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                      <p className="text-sm" style={{ color: 'var(--accent-violet)' }}>"П. 4.2 Договора N127: Оплата производится в течение 5 рабочих дней..."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Automation */}
              <div className="mini-card-dark p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl icon-gradient flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Автоматический отчёт</div>
                    <div className="rounded-lg p-3 mb-2" style={{ background: 'var(--bg-elevated)' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>"Каждый понедельник 9:00"</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                      <p className="text-sm" style={{ color: 'var(--accent-violet)' }}>"Продажи за неделю: 2.4М, новых заявок: 23, конверсия: 12%"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Три способа внедрить ИИ в ваш бизнес
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
              Выберите один или комбинируйте - подберём решение под ваши задачи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl icon-gradient flex items-center justify-center mb-5">
                  <service.icon className="text-white" size={28} />
                </div>
                <div className="text-sm font-semibold mb-2 gradient-text-accent">{service.price}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-violet)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://t.me/athenadev_support?text=${encodeURIComponent(`Здравствуйте! Интересует услуга "${service.title}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-violet) 50%, var(--accent-purple) 100%)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  Заказать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="for-whom" className="py-20 px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Подойдёт вам, если...
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Suitable */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
                  <Check className="w-5 h-5" style={{ color: '#22c55e' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Подойдёт</h3>
              </div>
              <ul className="space-y-4">
                {forWhom.suitable.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
                  <X className="w-5 h-5" style={{ color: '#ef4444' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Не подойдёт</h3>
              </div>
              <ul className="space-y-4">
                {forWhom.notSuitable.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#ef4444' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            От заявки до работающего ИИ - 4 шага
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card p-6 text-center">
                <div className="text-4xl font-bold mb-4 number-gradient">{step.num}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{step.text}</p>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-violet)' }}>
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Как это используют
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg icon-gradient flex items-center justify-center mb-3">
                  <example.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{example.role}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{example.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Тарифы
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
              Или соберём индивидуальное решение - обсудим на консультации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={plan.popular ? 'glass-card-featured p-8' : 'glass-card p-8'}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 popular-badge text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price.includes('от') ? (
                    <span className="text-2xl font-bold gradient-text-accent">{plan.price} руб.</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold gradient-text-accent">{plan.price}</span>
                      <span style={{ color: 'var(--text-muted)' }}>руб.</span>
                    </>
                  )}
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{plan.subtitle}</div>
                {plan.description && (
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{plan.description}</p>
                )}

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-violet)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Срок: {plan.timeline}
                </div>

                <button
                  className={`w-full py-3 font-semibold text-sm ${plan.popular ? 'btn-gradient' : 'btn-outline-dark'}`}
                  onClick={() => scrollToSection('contact')}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            После установки вы платите только за использование ИИ - обычно $10-30/мес. Поможем настроить лимиты.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Частые вопросы
          </h2>
          <div className="space-y-0">
            {faqItems.map((item, idx) => (
              <div key={idx} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-5 flex justify-between items-center text-left"
                >
                  <span className="font-medium pr-4 faq-question transition-colors" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
                  <ChevronDown
                    className={`flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--text-muted)' }}
                    size={20}
                  />
                </button>
                {openFaq === idx && (
                  <div className="pb-5 pt-0">
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Обсудим ваш проект
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Расскажите о задачах - предложим решение и назовём сроки
            </p>
          </div>

          {isSubmitted ? (
            <div className="glass-card-featured p-10 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
                <Check className="w-8 h-8" style={{ color: '#22c55e' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Спасибо!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Свяжемся в течение 4 часов</p>
            </div>
          ) : (
            <div className="glass-card-featured p-8" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Имя <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Telegram, WhatsApp или Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="@username, +7... или email"
                      className="w-full px-4 py-3 form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                      Что хотите автоматизировать?
                    </label>
                    <div className="space-y-3">
                      {interestOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-start gap-3 cursor-pointer"
                          onClick={() => handleInterestChange(option.id)}
                        >
                          <div className={`checkbox-dark ${formData.interests.includes(option.id) ? 'checked' : ''}`}>
                            {formData.interests.includes(option.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Расскажите подробнее
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 form-input resize-none"
                      placeholder="Опишите ваши задачи..."
                    />
                  </div>

                  <button type="submit" className="w-full btn-gradient py-4 font-semibold">
                    Отправить заявку
                  </button>
                </div>
              </form>
            </div>
          )}

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            Ответим в течение 4 часов в рабочее время. Консультация бесплатная.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ background: 'var(--bg-primary)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Athena Dev</div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Внедрение ИИ-решений для бизнеса
              </p>
            </div>
            <div className="text-left md:text-right">
              <a
                href="https://t.me/athenadev_support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm block transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-violet)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                Telegram: @athenadev_support
              </a>
            </div>
          </div>
          <div className="text-center text-sm pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
            &copy; 2026 Athena Dev
          </div>
        </div>
      </footer>

      {/* Yandex.Metrika noscript fallback */}
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/106184385" style={{position: 'absolute', left: '-9999px'}} alt="" />
        </div>
      </noscript>
    </div>
  );
}

export default App;
