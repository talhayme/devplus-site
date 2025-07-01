export default async function handler(req, res) {
  // Разрешаем CORS для вашего домена
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, company, email, phone, employees, message } = req.body;

  // Telegram Bot API
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

  // Форматирование сообщения
  const telegramMessage = `
🔔 <b>Новая заявка на демо!</b>

👤 <b>Имя:</b> ${name}
🏢 <b>Компания:</b> ${company}
📧 <b>Email:</b> ${email}
📱 <b>Телефон:</b> ${phone}
👥 <b>Количество юристов:</b> ${employees}
💬 <b>Сообщение:</b> ${message || 'Не указано'}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
`;

  try {
    // Отправка в Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram error:', data);
      throw new Error('Telegram API error');
    }

    res.status(200).json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    res.status(500).json({ error: 'Ошибка отправки заявки' });
  }
}