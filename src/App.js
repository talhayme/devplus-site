import React, { useState, useEffect } from 'react';
import { MessageSquare, Brain, Zap, Search, Clock, Shield, ChevronDown, Menu, X } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    tasks: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const faqItems = [
    {
      q: "Сколько стоит использование после установки?",
      a: "Сам ассистент бесплатный (опенсорс). Вы платите за API -- обычно $5-15/мес при легком использовании. Поможем настроить лимиты."
    },
    {
      q: "Нужен ли мне свой сервер?",
      a: "Не обязательно. Можем настроить облачный сервер за $5-10/мес. Если есть свой -- используем его."
    },
    {
      q: "Чем это лучше ChatGPT?",
      a: "ChatGPT забывает контекст и только советует. OpenClaw помнит все, работает в Telegram и выполняет действия: письма, календарь, файлы."
    },
    {
      q: "Это безопасно?",
      a: "Ассистент работает на вашем сервере -- данные не уходят третьим лицам. Настраиваем разумные ограничения доступа."
    },
    {
      q: "Нужны ли технические знания?",
      a: "Нет. Общаетесь с ассистентом в Telegram -- как с человеком. Всю техническую часть берем на себя."
    },
    {
      q: "Что если не подойдет?",
      a: "Вернем деньги в течение 7 дней, если поймете, что это не для вас."
    }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Живет в мессенджере",
      text: "Пишете в Telegram или WhatsApp -- как обычному человеку. Доступен 24/7 с телефона."
    },
    {
      icon: Brain,
      title: "Помнит все",
      text: "Не забывает контекст после разговора. Знает ваши проекты, предпочтения, привычки."
    },
    {
      icon: Zap,
      title: "Делает, а не советует",
      text: "Отправляет письма, создает события в календаре, ищет файлы, заполняет формы."
    },
    {
      icon: Search,
      title: "Ищет в документах",
      text: "Загружаем вашу базу знаний -- ассистент находит нужное за секунды."
    },
    {
      icon: Clock,
      title: "Работает по расписанию",
      text: "Утренние сводки, еженедельные отчеты, напоминания -- автоматически."
    },
    {
      icon: Shield,
      title: "Данные у вас",
      text: "Работает на вашем сервере. Никто кроме вас не видит переписку."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Созвон",
      text: "30 минут обсуждаем ваши задачи. Что хотите автоматизировать? Какие инструменты используете?"
    },
    {
      num: "02",
      title: "Установка",
      text: "За 1-3 дня разворачиваем ассистента, подключаем к Telegram, настраиваем под ваши задачи."
    },
    {
      num: "03",
      title: "Обучение",
      text: "Показываем, как пользоваться. Даем инструкцию и поддержку на старте."
    }
  ];

  const pricing = [
    {
      name: "СТАРТ",
      price: "29 900",
      subtitle: "Базовый ассистент",
      features: [
        "Установка OpenClaw",
        "Telegram-подключение",
        "5 базовых навыков",
        "Обучение 1 час",
        "Поддержка 2 недели"
      ],
      timeline: "1-2 дня",
      popular: false,
      buttonText: "Выбрать"
    },
    {
      name: "БИЗНЕС",
      price: "79 900",
      subtitle: "Ассистент + документы",
      features: [
        "Все из \"Старт\"",
        "Загрузка документов",
        "Поиск по вашим файлам",
        "15 навыков",
        "Календарь и почта",
        "Поддержка 1 месяц"
      ],
      timeline: "3-5 дней",
      popular: true,
      buttonText: "Выбрать"
    },
    {
      name: "КОРПОРАТИВНЫЙ",
      price: "от 150 000",
      subtitle: "Полная кастомизация",
      features: [
        "Все из \"Бизнес\"",
        "Несколько ассистентов",
        "Интеграция с CRM/1С",
        "Кастомные навыки",
        "Обучение команды",
        "Поддержка 3 месяца"
      ],
      timeline: "2-4 недели",
      popular: false,
      buttonText: "Обсудить"
    }
  ];

  const examples = [
    {
      emoji: "suit",
      role: "Руководитель",
      text: "Каждое утро получаю сводку в Telegram: задачи, важные письма, напоминания. Экономлю 30 минут в день."
    },
    {
      emoji: "chart",
      role: "Маркетолог",
      text: "Прошу найти статьи по теме и сделать саммари. Раньше 2 часа -- теперь 10 минут."
    },
    {
      emoji: "balance",
      role: "Юрист",
      text: "Ищу нужные пункты в договорах через Telegram. Ассистент знает всю базу документов."
    },
    {
      emoji: "briefcase",
      role: "Менеджер по продажам",
      text: "Перед звонком прошу справку о клиенте. Ассистент собирает все из CRM и интернета."
    }
  ];

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

    // Формируем сообщение для Telegram
    const message = `🤖 Новая заявка на ИИ-ассистента!

👤 Имя: ${formData.name}
📱 Контакт: ${formData.contact}
💬 Задачи: ${formData.tasks || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

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
          tasks: ''
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const getEmoji = (type) => {
    switch(type) {
      case 'suit': return <span className="text-2xl">👔</span>;
      case 'chart': return <span className="text-2xl">📊</span>;
      case 'balance': return <span className="text-2xl">⚖️</span>;
      case 'briefcase': return <span className="text-2xl">💼</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .heading {
          font-weight: 700;
          color: #0F172A;
        }

        .btn-primary {
          background: #3B82F6;
          color: white;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: #2563EB;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-outline {
          background: white;
          color: #0F172A;
          border: 2px solid #E2E8F0;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          border-color: #3B82F6;
          color: #3B82F6;
        }

        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }
        .card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .section-gray {
          background-color: #F8FAFC;
        }

        .pricing-card-popular {
          border: 2px solid #3B82F6;
          position: relative;
        }

        .chat-demo {
          background: #1E293B;
          border-radius: 16px;
          overflow: hidden;
        }

        .chat-header {
          background: #334155;
          padding: 12px 16px;
        }

        .chat-bubble-user {
          background: #3B82F6;
          color: white;
          border-radius: 16px 16px 4px 16px;
        }

        .chat-bubble-assistant {
          background: #F1F5F9;
          color: #1E293B;
          border-radius: 16px 16px 16px 4px;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">Athena Dev</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('how')}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              Как работает
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              Тарифы
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              FAQ
            </button>
          </nav>

          <button
            className="hidden md:block btn-primary px-5 py-2.5 text-sm font-semibold"
            onClick={() => scrollToSection('contact')}
          >
            Получить ассистента
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('how')}
                className="text-slate-600 hover:text-slate-900 text-left py-2"
              >
                Как работает
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-slate-600 hover:text-slate-900 text-left py-2"
              >
                Тарифы
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-slate-600 hover:text-slate-900 text-left py-2"
              >
                FAQ
              </button>
              <button
                className="btn-primary px-5 py-2.5 text-sm font-semibold mt-2"
                onClick={() => scrollToSection('contact')}
              >
                Получить ассистента
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl heading leading-tight mb-6">
                ИИ-ассистент в вашем Telegram за 3 дня
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Установим и настроим персонального помощника на базе OpenClaw. Он помнит контекст, ищет в документах, выполняет задачи — пока вы спите.
              </p>
              <button
                className="btn-primary px-8 py-4 text-base font-semibold mb-4"
                onClick={() => scrollToSection('contact')}
              >
                Получить своего ассистента
              </button>
              <p className="text-sm text-slate-400">
                Бесплатный созвон 30 минут • Без технических знаний
              </p>
            </div>

            {/* Right Column - Chat Demo */}
            <div className="chat-demo shadow-2xl">
              <div className="chat-header flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">OpenClaw Assistant</div>
                  <div className="text-slate-400 text-xs">онлайн</div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="chat-bubble-user px-4 py-2.5 max-w-xs">
                    <p className="text-sm">Что у меня сегодня?</p>
                  </div>
                </div>

                {/* Assistant message */}
                <div className="flex justify-start">
                  <div className="chat-bubble-assistant px-4 py-3 max-w-sm">
                    <p className="text-sm leading-relaxed">
                      📅 Сегодня 3 встречи:<br/>
                      • 10:00 — Созвон с дизайнером<br/>
                      • 14:00 — Планерка команды<br/>
                      • 17:30 — Звонок клиенту<br/><br/>
                      📬 4 письма требуют ответа<br/>
                      💰 Напомнить про счет до 18:00?
                    </p>
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div className="chat-bubble-user px-4 py-2.5 max-w-xs">
                    <p className="text-sm">Да, напомни в 17:00</p>
                  </div>
                </div>

                {/* Assistant message */}
                <div className="flex justify-start">
                  <div className="chat-bubble-assistant px-4 py-2.5">
                    <p className="text-sm">✓ Напоминание установлено</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 section-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading mb-4">
              Один помощник — десятки задач
            </h2>
            <p className="text-slate-500 text-lg">
              OpenClaw — это не просто чат-бот. Это агент, который действует.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading mb-4">
              От заявки до ассистента — 3 шага
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="card p-8 text-center">
                <div className="text-5xl font-bold text-blue-100 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 section-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading mb-4">
              Тарифы
            </h2>
            <p className="text-slate-500 text-lg">
              Выберите подходящий вариант или обсудим на созвоне
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`card p-8 ${plan.popular ? 'pricing-card-popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-400 mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  {!plan.price.includes('от') && <span className="text-slate-500">₽</span>}
                </div>
                <div className="text-sm text-slate-500 mb-6">{plan.subtitle}</div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-sm text-slate-400 mb-6">
                  Срок: {plan.timeline}
                </div>

                <button
                  className={`w-full py-3 font-semibold text-sm ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => scrollToSection('contact')}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading mb-4">
              Как используют ассистента
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, idx) => (
              <div key={idx} className="card p-6">
                <div className="mb-4">{getEmoji(example.emoji)}</div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{example.role}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{example.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 section-gray">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl heading text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, idx) => (
              <div key={idx} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 flex justify-between items-center text-left"
                >
                  <span className="font-medium text-slate-900 pr-4">{item.q}</span>
                  <ChevronDown
                    className={`text-slate-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
              <img
                src="/founder.jpg"
                alt="Виталий Богачев"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400 text-4xl">👤</div>';
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Виталий Богачев</h3>
              <div className="text-blue-500 text-sm font-medium mb-4">Основатель Athena Dev</div>
              <p className="text-slate-500 leading-relaxed mb-4">
                Помогаю предпринимателям внедрять ИИ в работу — без необходимости разбираться в коде. 30+ установок ассистентов для руководителей, маркетологов, юристов.
              </p>
              <a
                href="https://t.me/athenadev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                Telegram: @athenadev
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Получите своего ИИ-ассистента
            </h2>
            <p className="text-slate-400">
              Оставьте заявку — созвонимся и обсудим, как ассистент поможет вам
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Спасибо!</h3>
              <p className="text-slate-500">Свяжемся в течение часа</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Telegram или WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="@username или +7..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Какие задачи хотите автоматизировать?
                  </label>
                  <textarea
                    name="tasks"
                    value={formData.tasks}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                    placeholder="Опишите ваши задачи..."
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 font-semibold">
                  Записаться на созвон
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            Созвон 30 минут, бесплатно. Объясним все простым языком.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-2">Athena Dev</div>
              <p className="text-slate-400 text-sm">
                Установка ИИ-ассистентов для бизнеса
              </p>
            </div>
            <div className="text-left md:text-right">
              <a
                href="https://t.me/athenadev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white text-sm block mb-1"
              >
                Telegram: @athenadev
              </a>
              <a
                href="mailto:hello@athenadev.tech"
                className="text-slate-400 hover:text-white text-sm block"
              >
                Email: hello@athenadev.tech
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © 2026 Athena Dev
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
