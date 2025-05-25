const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { data } = JSON.parse(event.body);
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Telegram credentials' }),
    };
  }

  const message = `New order:\n${Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}`;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order sent to Telegram successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to send message: ${error.message}` }),
    };
  }
};