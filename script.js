const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one_el = document.getElementById('amount-one');
const amount_two_el = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const button = document.getElementById('button');

//Adding currency list to the DOM from JSON//
const getCurrencyName = async () => {
  const res = await fetch('./json/Common-Currency.json');
  const data = await res.json();
  const names = Object.values(data);
  names.forEach((curr) => {
    const currency = curr;
    const option = document.createElement('option');
    const option2 = document.createElement('option');
    const value = (option.value = `${currency.code}`);
    const text = (option.textContent = `${currency.code}`);
    option.value = value;
    option.text = text;
    option2.value = value;
    option2.text = text;
    currency_one.appendChild(option);
    currency_two.appendChild(option2);
    if (option.innerText === 'USD') {
      option.selected = true;
    }
    if (option2.innerText === 'AUD') {
      option2.selected = true;
    }
  });
};
getCurrencyName();

//Calculate rates//
function calculate() {
  const first_currency = currency_one.value;
  const second_currency = currency_two.value;

  fetch(`https://open.er-api.com/v6/latest/${first_currency}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      rate.innerHTML = `1 ${first_currency} = ${data.rates[second_currency]} ${second_currency} `;
      amount_two_el.value = (
        amount_one_el.value * data.rates[second_currency]
      ).toFixed(2);
    });
}

function swap() {
  let temp_currency_one = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp_currency_one;
  calculate();
}

//Event Listeners//
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
amount_one_el.addEventListener('input', calculate);
amount_two_el.addEventListener('input', calculate);
button.addEventListener('click', swap);
