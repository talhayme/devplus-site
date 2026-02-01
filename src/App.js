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
      a: "Зависит от задачи. Чаще всего — Claude (Anthropic) и GPT-4 (OpenAI). Для персональных ассистентов — OpenClaw. Подберем оптимальный вариант под ваши задачи и бюджет."
    },
    {
      q: "Сколько стоит использование после установки?",
      a: "Сам софт бесплатный или с минимальной платой. Вы платите за API (запросы к ИИ) — обычно $10-30/мес при обычном использовании. Поможем настроить лимиты, чтобы не было сюрпризов."
    },
    {
      q: "Нужен ли свой сервер?",
      a: "Не обязательно. Можем развернуть в облаке за $10-20/мес. Если есть свой сервер или важна приватность — настроим у вас."
    },
    {
      q: "Где будут храниться наши документы?",
      a: "На вашем сервере или в защищенном облаке — вы выбираете. Данные не передаются третьим лицам. Можем подписать NDA."
    },
    {
      q: "Чем это лучше обычного ChatGPT?",
      a: "ChatGPT — универсальный чат, который забывает контекст и не знает ваших документов. Мы настраиваем ИИ под вас: он помнит контекст, ищет в ваших файлах, выполняет действия, работает в привычных инструментах."
    },
    {
      q: "Нужны ли технические знания?",
      a: "С вашей стороны — нет. Вы общаетесь с ИИ как с человеком: в Telegram, через веб-интерфейс или голосом. Всю техническую часть берем на себя."
    },
    {
      q: "Сколько времени занимает внедрение?",
      a: "Простые решения — 3-5 дней. Комплексные с документами и интеграциями — 1-2 недели. Точный срок скажем после консультации."
    }
  ];

  const services = [
    {
      icon: MessageSquare,
      title: "Персональный ассистент",
      price: "от 29 900 ₽",
      description: "ИИ-помощник в Telegram, WhatsApp или Slack. Помнит контекст, выполняет задачи, работает 24/7.",
      features: [
        "Управление календарем",
        "Напоминания и сводки",
        "Поиск информации",
        "Работа с почтой",
        "Заметки и задачи"
      ]
    },
    {
      icon: FileSearch,
      title: "Поиск по документам",
      price: "от 49 900 ₽",
      description: "Сотрудники задают вопрос — получают ответ с цитатой из ваших документов.",
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
      price: "от 39 900 ₽",
      description: "Настраиваем ИИ для конкретных задач: отчеты, обработка заявок, генерация контента.",
      features: [
        "Еженедельные отчеты",
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
    { icon: BarChart3, role: "Маркетолог", text: "Прошу собрать информацию по теме и сделать саммари. 2 часа → 10 минут" },
    { icon: Users, role: "HR-отдел", text: "Новички спрашивают бота про отпуска, больничные, правила. Не дергают коллег" },
    { icon: ShoppingCart, role: "Менеджер продаж", text: "Перед звонком — справка о клиенте. Собирает из CRM и интернета" },
    { icon: Headphones, role: "Поддержка", text: "ИИ отвечает на типовые вопросы. 60% обращений закрываются сами" }
  ];

  const pricing = [
    {
      name: "СТАРТ",
      price: "29 900",
      subtitle: "Одно решение на выбор",
      description: "Выберите: Ассистент в Telegram / Поиск по документам / Одна автоматизация",
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
      subtitle: "Все под вас",
      description: null,
      features: [
        "Все из \"Бизнес\"",
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
      "Уже пробовали ChatGPT — хотите что-то более мощное"
    ],
    notSuitable: [
      "Нужен чат-бот для сайта (это другое)",
      "Хотите \"попробовать ИИ\" без конкретной задачи",
      "Ищете самое дешевое решение",
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
    const message = `🚀 Новая заявка на внедрение ИИ!

👤 Имя: ${formData.name}
📱 Контакт: ${formData.contact}

🎯 Интересует:
  - ${interestLabels || 'Не выбрано'}

Подробности: ${formData.details || 'Не указано'}

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
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
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
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: all 0.25s ease;
        }
        .card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }

        .section-gray {
          background-color: #F8FAFC;
        }

        .pricing-card-popular {
          border: 2px solid #3B82F6;
          position: relative;
        }

        .mini-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }
        .mini-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #CBD5E1;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
          flex-shrink: 0;
        }
        .checkbox-custom.checked {
          background: #3B82F6;
          border-color: #3B82F6;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">Athena Dev</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              Услуги
            </button>
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
            Обсудить проект
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
                onClick={() => scrollToSection('services')}
                className="text-slate-600 hover:text-slate-900 text-left py-2"
              >
                Услуги
              </button>
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
                Обсудить проект
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl md:text-5xl heading leading-tight mb-6">
                Внедрим ИИ за 1-2 недели
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Персональные ассистенты, поиск по документам, автоматизация рутины — настроим под ваши задачи. Без программистов и технических знаний с вашей стороны.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Ассистент в Telegram, WhatsApp или Slack</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Поиск по вашим документам за секунды</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Автоматизация отчетов и рутинных задач</span>
                </div>
              </div>

              <button
                className="btn-primary px-8 py-4 text-base font-semibold mb-3"
                onClick={() => scrollToSection('contact')}
              >
                Обсудить внедрение
              </button>
              <p className="text-sm text-slate-400">
                Бесплатная консультация 30 минут
              </p>
            </div>

            {/* Right Column - Mini Cards */}
            <div className="space-y-4">
              {/* Card 1 - Assistant */}
              <div className="mini-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 mb-2">Ассистент в Telegram</div>
                    <div className="bg-slate-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-slate-600">"Что у меня сегодня?"</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-700">"3 встречи, 4 письма требуют ответа. Напомнить про счет до 18:00?"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Documents */}
              <div className="mini-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 mb-2">Поиск по документам</div>
                    <div className="bg-slate-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-slate-600">"Найди пункт про оплату"</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-700">"П. 4.2 Договора №127: Оплата производится в течение 5 рабочих дней..."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Automation */}
              <div className="mini-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 mb-2">Автоматический отчет</div>
                    <div className="bg-slate-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-slate-600">"Каждый понедельник 9:00"</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-sm text-amber-700">"Продажи за неделю: 2.4М, новых заявок: 23, конверсия: 12%"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 section-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading mb-4">
              Три способа внедрить ИИ в ваш бизнес
            </h2>
            <p className="text-slate-500 text-lg">
              Выберите один или комбинируйте — подберем решение под ваши задачи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="card p-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <service.icon className="text-blue-500" size={28} />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">{service.price}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="for-whom" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl heading text-center mb-12">
            Подойдет вам, если...
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Suitable */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Подойдет</h3>
              </div>
              <ul className="space-y-4">
                {forWhom.suitable.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Не подойдет</h3>
              </div>
              <ul className="space-y-4">
                {forWhom.notSuitable.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6 section-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl heading text-center mb-12">
            От заявки до работающего ИИ — 4 шага
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="card p-6 text-center">
                <div className="text-4xl font-bold text-blue-100 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.text}</p>
                <div className="inline-block px-3 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-600">
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl heading text-center mb-12">
            Как это используют
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, idx) => (
              <div key={idx} className="card p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  <example.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{example.role}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{example.text}</p>
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
              Или соберем индивидуальное решение — обсудим на консультации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`card p-8 ${plan.popular ? 'pricing-card-popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-400 mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price.includes('от') ? (
                    <span className="text-2xl font-bold text-slate-900">{plan.price} ₽</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500">₽</span>
                    </>
                  )}
                </div>
                <div className="text-sm font-medium text-slate-700 mb-2">{plan.subtitle}</div>
                {plan.description && (
                  <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                )}

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
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

          <p className="text-center text-slate-500 text-sm">
            После установки вы платите только за использование ИИ — обычно $10-30/мес. Поможем настроить лимиты.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl heading text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-3">
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


      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Обсудим ваш проект
            </h2>
            <p className="text-slate-400">
              Расскажите о задачах — предложим решение и назовем сроки
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Спасибо!</h3>
              <p className="text-slate-500">Свяжемся в течение 4 часов</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
                    Telegram, WhatsApp или Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="@username, +7... или email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Что хотите автоматизировать?
                  </label>
                  <div className="space-y-3">
                    {interestOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-start gap-3 cursor-pointer"
                        onClick={() => handleInterestChange(option.id)}
                      >
                        <div className={`checkbox-custom ${formData.interests.includes(option.id) ? 'checked' : ''}`}>
                          {formData.interests.includes(option.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm text-slate-600">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Расскажите подробнее
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                    placeholder="Опишите ваши задачи..."
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 font-semibold">
                  Отправить заявку
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            Ответим в течение 4 часов в рабочее время. Консультация бесплатная.
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
                Внедрение ИИ-решений для бизнеса
              </p>
            </div>
            <div className="text-left md:text-right">
              <a
                href="https://t.me/athenadev_support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white text-sm block"
              >
                Telegram: @athenadev_support
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
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
