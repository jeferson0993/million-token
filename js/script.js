// api end point
const URL = 'https://api.coingecko.com/api/v3/simple/price?ids=million&vs_currencies=BRL&include_market_cap=true&include_24hr_vol=true&include_24hr_change=false&include_last_updated_at=true';

// variables
let valor_nacional = brl_24h_vol = brl_market_cap = 0;

// currency formatter
let formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * update fields on view
 */
function updateValue() {
    document.querySelector('#preco').innerHTML = formatter.format(valor_nacional);;
    document.querySelector('#marketcap').innerHTML = formatter.format(brl_market_cap);;
    document.querySelector('#volume').innerHTML = formatter.format(brl_24h_vol);;
}

/**
 * Convert from cripto token to fiat currency
 * @param {number} amount | cripto token amount
 * @returns | fiat value
 */
function convertCriptoBrl(amount) {
    return amount * valor_nacional;
}

/**
 * Convert from fiat currency to cripto token
 * @param {number} amount | fiat currency amount
 * @returns | crypto value
 */
function convertBrlCripto(amount) {
    return amount / valor_nacional;
}

/**
 * Fetch data from api
 */
function fetchData() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            valor_nacional = Number(data.million.brl);
            brl_24h_vol = Number(data.million.brl_24h_vol);
            brl_market_cap = Number(data.million.brl_market_cap);
            updateValue();
        });
}

// init infinit loop (call [fetchData] function every 15secs)
window.setInterval(fetchData, 15000);

/**
 * immediately invoked function expression
 */
(function () {
    fetchData();
    document.querySelector("#year")
    .innerHTML = new Date().getFullYear();
})();