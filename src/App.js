import React, { useState, useEffect } from 'react';
import { Zap, Users, FileText, Clock, TrendingUp, Target, CheckCircle, BarChart } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    size: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('problems');
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: "Сколько стоит внедрение?",
      a: "Зависит от сложности. Ориентиры: простая интеграция или ИИ-ассистент — от 150 000 руб., комплексный проект с несколькими системами — от 400 000 руб. Точную стоимость называем после бесплатного аудита, до начала работ."
    },
    {
      q: "Как долго длится внедрение?",
      a: "От 2 до 6 недель. Простые интеграции — 2 недели. ИИ-ассистент с обучением на ваших документах — 4-6 недель."
    },
    {
      q: "Что если решение не подойдёт?",
      a: "Перед началом работы делаем аудит и честно говорим, если автоматизация не даст эффекта. Не берёмся за проекты, в которых не уверены."
    },
    {
      q: "Нужен ли IT-отдел на нашей стороне?",
      a: "Нет. Мы берём на себя всю техническую часть. От вас нужен только один человек, который ответит на вопросы о процессах и даст доступ к системам."
    },
    {
      q: "Какие системы вы интегрируете?",
      a: "1С (все версии), Битрикс24, amoCRM, Мегаплан, Google Workspace, Telegram, почтовые сервисы, и практически любые системы с API."
    },
    {
      q: "Есть ли поддержка после запуска?",
      a: "Да, 3 месяца поддержки включены в стоимость. Дальше — по желанию, от 30 000 руб./мес."
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
    const message = `🔔 Новая заявка на консультацию!

👤 Имя: ${formData.name}
🏢 Компания: ${formData.company}
📧 Email: ${formData.email}
📱 Телефон: ${formData.phone}
👥 Размер: ${formData.size}
💬 Задача: ${formData.message || 'Не указано'}

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
        setTimeout(() => {
          setIsSubmitted(false);
          // Очищаем форму после успешной отправки
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            size: '',
            message: ''
          });
        }, 3000);
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
      window.history.pushState(null, '', '#' + sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

        .bcg-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1A1A1A;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 10px) scale(1.05); }
        }
        .animate-blob { animation: blob 15s ease-in-out infinite; }
        .animate-blob-delay { animation: blob 15s ease-in-out infinite; animation-delay: 5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(10, 135, 84, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .bcg-button {
          background: #0A8754;
          color: white;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bcg-button:hover {
          background: #086943;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(10, 135, 84, 0.3);
        }
        .bcg-button:active {
          transform: translateY(0);
        }

        .bcg-card {
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bcg-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        }

        .bcg-link {
          position: relative;
        }
        .bcg-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #0A8754;
          transition: width 0.3s ease;
        }
        .bcg-link:hover::after {
          width: 100%;
        }

        .section-gray {
          background-color: #F8F9FA;
        }

        .section-white {
          background-color: white;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">Athena Dev</div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Услуги
            </a>
            <a
              href="#cases"
              onClick={(e) => { e.preventDefault(); scrollToSection('cases'); }}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Кейсы
            </a>
            <a
              href="#process"
              onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Процесс
            </a>
            <a
              href="#founder"
              onClick={(e) => { e.preventDefault(); scrollToSection('founder'); }}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              О нас
            </a>
            <a
              href="#faq"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              FAQ
            </a>
          </nav>
          <button
            className="bcg-button px-6 py-3 font-semibold"
            onClick={() => scrollToSection('contact')}
          >
            Консультация
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-14 px-6 overflow-hidden section-white">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animate-blob-delay"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 bcg-heading leading-tight">
                Цифровизация и AI для бизнеса за 2-6 недель
              </h1>
              <p className="text-xl text-[#4A4A4A] mb-8">
                Автоматизируем процессы, интегрируем системы, внедряем ИИ-ассистентов — и вы перестаёте терять деньги на рутине
              </p>
              <button
                className="bcg-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <Zap size={20} />
                Узнать, что можно автоматизировать
              </button>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F5EE] rounded-full text-sm text-[#0A8754] font-medium">
                  <CheckCircle size={16} />
                  30+ проектов
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F5EE] rounded-full text-sm text-[#0A8754] font-medium">
                  <TrendingUp size={16} />
                  Окупаемость за 2-3 месяца
                </span>
              </div>
            </div>

            {/* Right Column - Demo Card */}
            <div className="bg-white rounded-3xl p-8 bcg-card animate-float" style={{ boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0A8754] mb-1">Вопрос руководителя</div>
                  <div className="text-sm text-slate-900 font-medium">Директор по продажам</div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-2xl p-4 mb-4">
                <p className="text-[#4A4A4A]">
                  Сколько заявок в работе у отдела продаж?
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center animate-shimmer">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0A8754] mb-2">Ответ из дашборда (2 сек)</div>
                  <div className="bg-[#E8F5EE] rounded-xl p-3 text-sm text-[#4A4A4A]">
                    Сейчас 23 заявки в работе. 8 — на этапе КП, 12 — ждут решения клиента, 3 — готовы к закрытию. Общая сумма воронки: 4.2 млн руб.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-14 px-6 section-gray">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
            Узнаёте свою компанию?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Clock,
                title: 'Данные копируют вручную',
                text: 'Менеджеры переносят информацию из 1С в Excel, из Excel в CRM, из CRM в отчёты. Каждый день.'
              },
              {
                icon: Target,
                title: 'Системы не связаны между собой',
                text: 'Склад не видит продажи, бухгалтерия не видит отгрузки, руководитель собирает данные по кускам из разных источников.'
              },
              {
                icon: FileText,
                title: 'Информацию ищут часами',
                text: 'Договоры в папках, регламенты в почте, ответы на вопросы — в головах сотрудников, которые уже уволились.'
              },
              {
                icon: BarChart,
                title: 'Решения принимают вслепую',
                text: 'Нет единого дашборда. Чтобы понять, что происходит в бизнесе, нужно обзвонить три отдела.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 bcg-card text-left">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-6">
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-[#4A4A4A]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-14 px-6 section-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#0A8754] mb-2">30+</div>
              <div className="text-[#4A4A4A]">проектов</div>
              <div className="text-sm text-slate-500 mt-1">Автоматизация, интеграции, ИИ-ассистенты</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#0A8754] mb-2">2-6</div>
              <div className="text-[#4A4A4A]">недель</div>
              <div className="text-sm text-slate-500 mt-1">От аудита до работающего решения</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#0A8754] mb-2">2-3</div>
              <div className="text-[#4A4A4A]">месяца</div>
              <div className="text-sm text-slate-500 mt-1">Средний срок окупаемости</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-14 px-6 section-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#E8F5EE] text-[#0A8754] rounded-full text-sm font-semibold mb-4">
              Кейсы
            </span>
            <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
              Реальные результаты наших клиентов
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case 1 - AI */}
            <div className="bg-white rounded-3xl p-10 bcg-card">
              <span className="inline-block px-3 py-1 bg-[#0A8754] text-white rounded-full text-xs font-semibold mb-4">
                ИИ-АССИСТЕНТ
              </span>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Юристы экономят 3 часа в день</h3>
                <div className="text-sm text-[#4A4A4A]">Клиент: Юридическая компания, 30+ сотрудников</div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-red-600 mb-2">Было:</div>
                <div className="text-[#4A4A4A]">
                  "Юристы тратили 3-4 часа в день на поиск информации в договорах, регламентах и переписках. Типовые вопросы отвлекали ведущих специалистов."
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-[#0A8754] mb-2">Сделали:</div>
                <div className="text-[#4A4A4A]">
                  "RAG-система с доступом к внутренней базе документов. ИИ-ассистент отвечает на вопросы по регламентам и находит нужные пункты в договорах за секунды."
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-[#F8F9FA] rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">3 ч/день</div>
                  <div className="text-xs text-[#4A4A4A]">экономия времени</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">90%</div>
                  <div className="text-xs text-[#4A4A4A]">точность ответов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">4 нед</div>
                  <div className="text-xs text-[#4A4A4A]">срок внедрения</div>
                </div>
              </div>
            </div>

            {/* Case 2 - Automation */}
            <div className="bg-white rounded-3xl p-10 bcg-card">
              <span className="inline-block px-3 py-1 bg-[#0A8754] text-white rounded-full text-xs font-semibold mb-4">
                АВТОМАТИЗАЦИЯ
              </span>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Отчёты собираются сами</h3>
                <div className="text-sm text-[#4A4A4A]">Клиент: Дистрибьютор, 50+ человек</div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-red-600 mb-2">Было:</div>
                <div className="text-[#4A4A4A]">
                  "Каждый понедельник менеджеры 2 часа собирали отчёт по продажам: выгружали из 1С, сводили в Excel, отправляли руководству. Данные устаревали к моменту отправки."
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-[#0A8754] mb-2">Сделали:</div>
                <div className="text-[#4A4A4A]">
                  "Настроили автоматическую выгрузку из 1С в дашборд. Данные обновляются каждый час. Руководитель видит продажи, остатки, дебиторку в реальном времени."
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-[#F8F9FA] rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">8 ч/нед</div>
                  <div className="text-xs text-[#4A4A4A]">экономия времени</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">0</div>
                  <div className="text-xs text-[#4A4A4A]">ошибок в данных</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A8754] mb-1">3 нед</div>
                  <div className="text-xs text-[#4A4A4A]">срок внедрения</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="py-14 px-6 section-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
              Что мы делаем
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Автоматизация процессов</h3>
              <p className="text-[#4A4A4A]">
                Убираем ручной ввод данных и копирование между системами. Автоматические отчёты, уведомления, согласования.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Интеграция систем</h3>
              <p className="text-[#4A4A4A]">
                Связываем 1С, CRM, склад, сайт, телефонию в единую экосистему. Данные синхронизируются автоматически.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">ИИ-ассистенты</h3>
              <p className="text-[#4A4A4A]">
                Отвечают на вопросы сотрудников по внутренним документам. Ищут информацию в базе знаний за секунды.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-6">
                <BarChart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Дашборды и аналитика</h3>
              <p className="text-[#4A4A4A]">
                Вся информация о бизнесе на одном экране. Обновляется в реальном времени.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-14 px-6 section-gray">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
            Интегрируемся с вашими системами
          </h2>
          <p className="text-xl text-[#4A4A4A] mb-12">
            Не заставляем менять то, что работает — связываем в единую экосистему
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['1С', 'Битрикс24', 'amoCRM', 'Мегаплан', 'Google', 'Telegram', 'Excel'].map((name) => (
              <div key={name} className="text-2xl font-semibold text-slate-400 hover:text-[#0A8754] transition-colors">
                {name}
              </div>
            ))}
          </div>
          <p className="text-slate-500 mt-8">И ещё 50+ систем с открытым API</p>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-14 px-6 section-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
              Как мы работаем
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Прозрачный процесс от анализа до результата
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 bcg-card h-full">
                <div className="text-5xl font-bold text-[#C8E6D8] mb-4">01</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-4">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Аудит (3-5 дней)</h3>
                <p className="text-[#4A4A4A]">
                  Разбираемся, как устроены ваши процессы сейчас. Интервью с ключевыми сотрудниками, анализ систем, поиск узких мест. Результат: отчёт с приоритетами — что автоматизировать в первую очередь.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#0A8754]"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 bcg-card h-full">
                <div className="text-5xl font-bold text-[#C8E6D8] mb-4">02</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-4">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Проектирование (1 неделя)</h3>
                <p className="text-[#4A4A4A]">
                  Рисуем архитектуру решения: какие системы связываем, что автоматизируем, где нужен ИИ. Согласуем с вами до начала разработки.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#0A8754]"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 bcg-card h-full">
                <div className="text-5xl font-bold text-[#C8E6D8] mb-4">03</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-4">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Разработка (2-4 недели)</h3>
                <p className="text-[#4A4A4A]">
                  Делаем MVP — минимальный работающий продукт. Интеграции, автоматизации, ИИ-ассистент — зависит от задачи. Тестируем на реальных данных.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#0A8754]"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 bcg-card h-full">
                <div className="text-5xl font-bold text-[#C8E6D8] mb-4">04</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A8754] to-[#086943] flex items-center justify-center mb-4">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Запуск и поддержка</h3>
                <p className="text-[#4A4A4A]">
                  Обучаем сотрудников, запускаем в работу. Поддержка и доработки — 3 месяца после запуска включены.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-14 px-6 section-gray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
              Кто стоит за Athena Dev
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-10 bcg-card" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 shadow-xl">
                <img src="/founder.jpg" alt="Виталий Богачев" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-[#0A8754] font-medium mb-4">Основатель Athena Dev</div>
                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                  Занимаюсь цифровизацией бизнеса и внедрением ИИ с 2022 года. 30+ проектов: автоматизация процессов, интеграция систем, корпоративные ИИ-ассистенты.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  Работал с юридическими компаниями, производством, дистрибуцией. Знаю, как устроены реальные бизнес-процессы и где технологии действительно помогают, а где — пустая трата денег.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 px-6 section-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-12 bcg-heading text-center">
            Частые вопросы
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-5 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-semibold text-[#1A1A1A]">{item.q}</span>
                  <span className="text-2xl text-[#0A8754]">{openFaq === idx ? '\u2212' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="pb-5 text-[#4A4A4A] leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-14 px-6 section-gray">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bcg-heading">
              Узнайте, что можно автоматизировать в вашей компании
            </h2>
            <p className="text-xl text-[#4A4A4A] mb-4">
              Аудит процессов — покажем, где вы теряете время и деньги
            </p>

            <div className="bg-white rounded-2xl p-6 mb-6 text-left" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
              <div className="text-sm font-semibold text-[#0A8754] mb-3">Что вы получите:</div>
              <ul className="space-y-2 text-[#4A4A4A]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[#0A8754] flex-shrink-0 mt-0.5" size={18} />
                  <span>Список процессов, которые можно автоматизировать</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[#0A8754] flex-shrink-0 mt-0.5" size={18} />
                  <span>Приоритеты: что даст максимальный эффект при минимальных затратах</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[#0A8754] flex-shrink-0 mt-0.5" size={18} />
                  <span>Оценку сроков и стоимости</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[#0A8754] flex-shrink-0 mt-0.5" size={18} />
                  <span>Пример похожего проекта из вашей отрасли</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-slate-500">
              Ответим в течение часа в рабочее время. Без спама и навязчивых звонков — обещаем.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-3xl p-12 text-center animate-float" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}>
              <CheckCircle className="w-16 h-16 text-[#0A8754] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Заявка принята!</h3>
              <p className="text-[#4A4A4A]">Свяжемся в течение часа</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 bcg-card">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Компания</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Размер компании</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                  >
                    <option value="">Выберите...</option>
                    <option value="1-10">1-10 сотрудников</option>
                    <option value="11-50">11-50 сотрудников</option>
                    <option value="51-200">51-200 сотрудников</option>
                    <option value="200+">200+ сотрудников</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Опишите задачу</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all resize-none"
                  />
                </div>

                <button type="submit" className="w-full bcg-button py-4 text-lg font-semibold">
                  Начать с бесплатного аудита
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-[#1A1A1A] bcg-heading">Узнать, что можно автоматизировать</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-[#0A8754] mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Заявка принята!</h3>
                <p className="text-[#4A4A4A]">Свяжемся в течение часа</p>
              </div>
            ) : (
              <form onSubmit={(e) => { handleSubmit(e); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Компания</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Опишите задачу</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A8754] focus:ring-2 focus:ring-[#C8E6D8] transition-all resize-none"
                  />
                </div>

                <button type="submit" className="w-full bcg-button py-4 text-lg font-semibold">
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">Athena Dev</div>
              <p className="text-slate-400">
                ИП Богачев Виталий Геннадьевич
              </p>
              <p className="text-slate-400 text-sm mt-2">
                ИНН: 772789185062 | ОГРНИП: 324774600732715
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">О компании</h4>
              <p className="text-slate-400 text-sm">
                Цифровизация бизнеса и внедрение ИИ-решений
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © 2026 Athena Dev. Все права защищены
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
