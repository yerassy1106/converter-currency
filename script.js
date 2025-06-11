const api = 'https://api.exchangerate.host/latest';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const button = document.getElementById('convert');

// Список популярных валют
const currencies = ['USD', 'EUR', 'KZT', 'GBP', 'JPY', 'RUB', 'CNY'];

function populateSelects() {
  currencies.forEach((currency) => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'KZT';
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt)) {
    result.textContent = 'Введите корректную сумму';
    return;
  }

  try {
    const res = await fetch(`${api}?base=${from}&symbols=${to}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amt * rate).toFixed(2);
    result.textContent = `${amt} ${from} = ${converted} ${to}`;
  } catch (err) {
    result.textContent = 'Ошибка при получении данных.';
  }
}

populateSelects();
button.addEventListener('click', convertCurrency);
