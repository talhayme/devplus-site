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
      <style>{`
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
      `}</style>

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
                Анализируем ваши процессы
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Обсудим, как ИИ решит задачи вашего бизнеса
              </p>
              <button className="bcg-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-2">
                <Zap size={20} />
                Бесплатная консультация
              </button>
              <p className="text-sm text-slate-500 mt-4">
                Отвечаем в течение часа в рабочее время
              </p>
            </div>

            {/* Right Column - Demo Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 bcg-card animate-float">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-600 mb-1">AI Assistant</div>
                  <div className="text-sm text-slate-900 font-medium">Вопрос сотрудника</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <p className="text-slate-700">
                  Какая процедура согласования договора с новым поставщиком?
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center animate-shimmer">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-600 mb-1">Ответ ИИ-ассистента</div>
                  <div className="text-xs text-slate-500">Время ответа: 2 сек</div>
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
            Знакомые проблемы?
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Компании теряют миллионы рублей ежегодно из-за неэффективных процессов
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, stat: '40%', text: 'времени уходит на поиск информации в документах' },
              { icon: Users, stat: '60%', text: 'задач можно автоматизировать с помощью ИИ' },
              { icon: TrendingUp, stat: '75%', text: 'времени квалифицированных специалистов тратится впустую' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg bcg-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-white" size={32} />
                </div>
                <div className="text-5xl font-bold text-green-600 mb-4">{item.stat}</div>
                <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
            Работаем с лидерами рынка
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Консультируем и внедряем ИИ-решения в крупнейших компаниях России
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-slate-600">Успешных проектов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">2-3</div>
              <div className="text-slate-600">месяца окупаемость</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-slate-600">точность ответов</div>
            </div>
          </div>

          <p className="text-lg text-slate-600">
            С кем работаем: <span className="font-semibold text-slate-900">Внедряем ИИ в компаниях из разных отраслей</span>
          </p>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Кейс
            </span>
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Средний срок окупаемости — 2-3 месяца
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 bcg-card">
            <div className="mb-8">
              <div className="text-sm font-semibold text-green-600 mb-2">Клиент</div>
              <div className="text-lg text-slate-900">
                Юридическая компания, 30+ сотрудников (NDA)
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm font-semibold text-red-600 mb-2">Проблема</div>
              <div className="text-slate-700">
                Юристы тратили 3-4 часа в день на поиск информации в договорах, регламентах и переписках.
                Типовые вопросы от сотрудников отвлекали ведущих специалистов.
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm font-semibold text-green-600 mb-2">Решение</div>
              <div className="text-slate-700">
                RAG-система с доступом к внутренней базе документов. ИИ-ассистент отвечает на вопросы
                по регламентам и находит нужные пункты в договорах за секунды.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 p-6 bg-green-50 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">80%</div>
                <div className="text-sm text-slate-600">экономии времени</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">90%</div>
                <div className="text-sm text-slate-600">точность ответов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">4 нед</div>
                <div className="text-sm text-slate-600">срок внедрения</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              Результат: Срок внедрения: 4 недели
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4 bcg-heading">
              Каждый бизнес уникален
            </h2>
            <p className="text-xl text-slate-600">
              Готовые решения решают общие проблемы, мы решаем ваши
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-slate-100 rounded-3xl p-10">
              <h3 className="text-2xl font-semibold text-slate-700 mb-4">Готовые решения</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500">✗</span>
                  <span>Универсальный подход без учета специфики</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">✗</span>
                  <span>Требуют адаптации под ваши процессы</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500">✗</span>
                  <span>Ограниченная гибкость</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 bcg-card">
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Наш подход</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                  <span>Глубокий анализ ваших процессов</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                  <span>Решение под конкретную задачу</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                  <span>Полная интеграция с вашими системами</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-lg text-slate-600">
            Примеры решений: <span className="font-semibold">Каждое решение проектировалось под конкретную задачу клиента</span>
          </p>
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
            {[
              { step: '01', title: 'Аудит', desc: 'Анализируем процессы и находим точки роста', icon: Target },
              { step: '02', title: 'Прототип', desc: 'Создаем MVP за 2-3 недели', icon: Zap },
              { step: '03', title: 'Тестирование', desc: 'Проверяем на реальных данных', icon: BarChart },
              { step: '04', title: 'Внедрение', desc: 'Масштабируем и обучаем команду', icon: CheckCircle }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg bcg-card h-full">
                  <div className="text-5xl font-bold text-green-200 mb-4">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
                )}
              </div>
            ))}
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
                <p className="text-slate-600 leading-relaxed">
                  Эксперт по внедрению ИИ в бизнес-процессы. Консультирует крупнейшие компании России
                  по вопросам автоматизации с помощью искусственного интеллекта. Специализируется на
                  RAG-системах, корпоративных ассистентах и автоматизации документооборота.
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
              Бесплатный аудит процессов
            </h2>
            <p className="text-xl text-slate-600">
              Покажем, где ИИ сэкономит время и деньги
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Ответим в течение часа • Без спама и навязчивых звонков
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
                Внедрение ИИ для оптимизации бизнес-процессов
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
