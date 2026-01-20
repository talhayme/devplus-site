import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Custom Styles */}
      <style>{\`
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
          background: linear-gradient(90deg, transparent, rgba(126, 244, 115, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .bcg-heading {
          font-weight: 300;
          letter-spacing: -0.02em;
        }

        .bcg-button {
          background: #7EF473;
          color: #0E3E1B;
          border-radius: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bcg-button:hover {
          background: #71DC68;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(126, 244, 115, 0.4);
        }
        .bcg-button:active {
          transform: translateY(0);
        }

        .bcg-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bcg-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
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
          background: #7EF473;
          transition: width 0.3s ease;
        }
        .bcg-link:hover::after {
          width: 100%;
        }
      \`}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">Athena Dev</div>
          <button className="bcg-button px-6 py-3 font-semibold">
            Консультация
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animate-blob-delay"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 bcg-heading">
                Цифровизация и ИИ для бизнеса за 2-6 недель
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Автоматизируем процессы, интегрируем системы, внедряем ИИ-ассистентов — и вы перестаёте терять деньги на рутине
              </p>
              <button className="bcg-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-2">
                <Zap size={20} />
                Узнать, что можно автоматизировать
              </button>
              <p className="text-sm text-slate-500 mt-4">
                30+ проектов • Окупаемость за 2-3 месяца
              </p>
            </div>

            {/* Right Column - Demo Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 bcg-card animate-float">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-600 mb-1">Вопрос сотрудника</div>
                  <div className="text-sm text-slate-900 font-medium">Менеджер отдела продаж</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <p className="text-slate-700">
                  Какой статус заказа №4521 и когда оплата?
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center animate-shimmer">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-600 mb-2">Ответ ИИ (2 сек)</div>
                  <div className="bg-green-50 rounded-xl p-3 text-sm text-slate-700">
                    Заказ №4521 отгружен 18.01.2025 (ТК СДЭК, трек: 1234567890). Счёт на 847 000 ₽ оплачен 19.01.2025. Акт сверки сформирован, ждёт подписи клиента.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
            Узнаёте свою компанию?
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Эти проблемы стоят бизнесу миллионы рублей ежегодно
          </p>

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
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg bcg-card text-left">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-6">
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-slate-600">проектов</div>
              <div className="text-sm text-slate-500 mt-1">Автоматизация, интеграции, ИИ-ассистенты</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">2-6</div>
              <div className="text-slate-600">недель</div>
              <div className="text-sm text-slate-500 mt-1">От аудита до работающего решения</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">2-3</div>
              <div className="text-slate-600">месяца</div>
              <div className="text-sm text-slate-500 mt-1">Средний срок окупаемости</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Кейсы
            </span>
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Реальные результаты наших клиентов
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case 1 - AI */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 bcg-card">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Юристы экономят 3 часа в день</h3>
                <div className="text-sm text-slate-600">Клиент: Юридическая компания, 30+ сотрудников</div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-red-600 mb-2">Было:</div>
                <div className="text-slate-700">
                  "Юристы тратили 3-4 часа в день на поиск информации в договорах, регламентах и переписках. Типовые вопросы отвлекали ведущих специалистов."
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-green-600 mb-2">Сделали:</div>
                <div className="text-slate-700">
                  "RAG-система с доступом к внутренней базе документов. ИИ-ассистент отвечает на вопросы по регламентам и находит нужные пункты в договорах за секунды."
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">3 ч/день</div>
                  <div className="text-xs text-slate-600">экономия времени</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
                  <div className="text-xs text-slate-600">точность ответов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">4 нед</div>
                  <div className="text-xs text-slate-600">срок внедрения</div>
                </div>
              </div>
            </div>

            {/* Case 2 - Automation */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 bcg-card">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Отчёты собираются сами</h3>
                <div className="text-sm text-slate-600">Клиент: Дистрибьютор, 50+ человек</div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-red-600 mb-2">Было:</div>
                <div className="text-slate-700">
                  "Каждый понедельник менеджеры 2 часа собирали отчёт по продажам: выгружали из 1С, сводили в Excel, отправляли руководству. Данные устаревали к моменту отправки."
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-green-600 mb-2">Сделали:</div>
                <div className="text-slate-700">
                  "Настроили автоматическую выгрузку из 1С в дашборд. Данные обновляются каждый час. Руководитель видит продажи, остатки, дебиторку в реальном времени."
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">8 ч/нед</div>
                  <div className="text-xs text-slate-600">экономия времени</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">0</div>
                  <div className="text-xs text-slate-600">ошибок в данных</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">3 нед</div>
                  <div className="text-xs text-slate-600">срок внедрения</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Что мы делаем
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Автоматизация процессов</h3>
              <p className="text-slate-700">
                Убираем ручной ввод данных и копирование между системами. Автоматические отчёты, уведомления, согласования.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Интеграция систем</h3>
              <p className="text-slate-700">
                Связываем 1С, CRM, склад, сайт, телефонию в единую экосистему. Данные синхронизируются автоматически.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">ИИ-ассистенты</h3>
              <p className="text-slate-700">
                Отвечают на вопросы сотрудников по внутренним документам. Ищут информацию в базе знаний за секунды.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 bcg-card">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
                <BarChart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Дашборды и аналитика</h3>
              <p className="text-slate-700">
                Вся информация о бизнесе на одном экране. Обновляется в реальном времени.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Как мы работаем
            </h2>
            <p className="text-xl text-slate-600">
              Прозрачный процесс от анализа до результата
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg bcg-card h-full">
                <div className="text-5xl font-bold text-green-200 mb-4">01</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Аудит (бесплатно, 3-5 дней)</h3>
                <p className="text-slate-600">
                  Разбираемся, как устроены ваши процессы сейчас. Интервью с ключевыми сотрудниками, анализ систем, поиск узких мест. Результат: отчёт с приоритетами — что автоматизировать в первую очередь.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg bcg-card h-full">
                <div className="text-5xl font-bold text-green-200 mb-4">02</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Проектирование (1 неделя)</h3>
                <p className="text-slate-600">
                  Рисуем архитектуру решения: какие системы связываем, что автоматизируем, где нужен ИИ. Согласуем с вами до начала разработки.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg bcg-card h-full">
                <div className="text-5xl font-bold text-green-200 mb-4">03</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Разработка (2-4 недели)</h3>
                <p className="text-slate-600">
                  Делаем MVP — минимальный работающий продукт. Интеграции, автоматизации, ИИ-ассистент — зависит от задачи. Тестируем на реальных данных.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg bcg-card h-full">
                <div className="text-5xl font-bold text-green-200 mb-4">04</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Запуск и поддержка</h3>
                <p className="text-slate-600">
                  Обучаем сотрудников, запускаем в работу. Поддержка и доработки — 3 месяца после запуска включены.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Кто стоит за Athena Dev
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl p-10 bcg-card">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                <Users className="text-white" size={64} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Виталий Богачев</h3>
                <div className="text-green-600 font-medium mb-4">Основатель Athena Dev</div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Занимаюсь цифровизацией бизнеса и внедрением ИИ с 2022 года. 30+ проектов: автоматизация процессов, интеграция систем, корпоративные ИИ-ассистенты.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Работал с юридическими компаниями, производством, дистрибуцией. Знаю, как устроены реальные бизнес-процессы и где технологии действительно помогают, а где — пустая трата денег.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Узнайте, что можно автоматизировать в вашей компании
            </h2>
            <p className="text-xl text-slate-600 mb-4">
              Бесплатный аудит процессов — покажем, где вы теряете время и деньги
            </p>

            <div className="bg-white rounded-2xl p-6 mb-6 text-left">
              <div className="text-sm font-semibold text-green-700 mb-3">Что вы получите:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>Список процессов, которые можно автоматизировать</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>Приоритеты: что даст максимальный эффект при минимальных затратах</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>Оценку сроков и стоимости</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>Пример похожего проекта из вашей отрасли</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-slate-500">
              Ответим в течение часа в рабочее время. Без спама и навязчивых звонков — обещаем.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center animate-float">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Заявка принята!</h3>
              <p className="text-slate-600">Свяжемся в течение часа</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 bcg-card">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Компания</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Размер компании</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="">Выберите...</option>
                    <option value="1-10">1-10 сотрудников</option>
                    <option value="11-50">11-50 сотрудников</option>
                    <option value="51-200">51-200 сотрудников</option>
                    <option value="200+">200+ сотрудников</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Опишите задачу</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="w-full bcg-button py-4 text-lg font-semibold">
                  Получить консультацию
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

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
              <h4 className="font-semibold mb-3">Контакты</h4>
              <p className="text-slate-400 text-sm">Email: hello@athenadev.ru</p>
              <p className="text-slate-400 text-sm mt-1">Telegram: @athenadev</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">О компании</h4>
              <p className="text-slate-400 text-sm">
                Цифровизация бизнеса и внедрение ИИ-решений
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © 2025 Athena Dev. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
