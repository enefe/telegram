Telegram.WebApp.ready();

let data = decodeURI(Telegram.WebApp.initData);
let d = data;
let dd = d.replaceAll("%3A", ":");
let ddd = dd.replaceAll("%2C", ",");

function strToObj(str) {
    var obj = {};
    if (str && typeof str === 'string') {
        var objStr = str.match(/\{(.)+\}/g);
        eval("obj =" + objStr);
    }
    return obj
}

let user = strToObj(ddd);
let token = "5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo";

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Start Test');
})

const pay = document.querySelector('.basket__button');
const adds = document.querySelectorAll('.product__button');
const deleteProduct = document.querySelectorAll('.basket__number');
const plus = document.querySelectorAll('.plus');
const minus = document.querySelectorAll('.minus');
const cartProductsList = document.querySelector('.basket__products');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)&nbsp;(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

const printFullPrice = () => {
    fullPrice.textContent = `Итого: ${normalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id) => {
    return `
        <div class="basket__product" data-id="${id}">
            
                <img class="basket__product-image" src="${img}" alt="${title}">
                <p class="basket__product-title">${title}</p>
                <p class="basket__product-price">${normalPrice(price)}</p>
            
            <div class="basket__number">Удалить</div>
        </div>
	`;
};

const deleteProducts = (productParent) => {
    let id = productParent.dataset.id;
    document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__number').textContent = (document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__number').textContent) - 1;
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.basket__product-price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
}

adds.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId());

    el.addEventListener('click', (e) => {
        pay.classList.remove('hide');

        let self = e.currentTarget;
        let parent = self.closest('.product');
        let id = parent.dataset.id;
        let img = parent.querySelector('.product__image').getAttribute('src');
        let title = parent.querySelector('.product__name').textContent;
        let number = parent.querySelector('.product__number');
        number.textContent = Number(number.textContent) + 1;
        let priceString = priceWithoutSpaces(parent.querySelector('.product__call').textContent);
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__call').textContent));
        plusFullPrice(priceNumber);

        printFullPrice();

        cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));

        self.disabled = true;
    });
});

cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('basket__number')) {
        deleteProducts(e.target.closest('.basket__product'));
    }
})

const openPopup = document.querySelector('.catalog__button');
const closePopup = document.querySelector('.basket__edit');
const popup = document.querySelector('.basket');

openPopup.addEventListener('click', (e) => {
    popup.classList.add('active');
    document.querySelector('.catalog__items').classList.add('hide');
    window.scrollTo(0, 0);
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    document.querySelector('.catalog__items').classList.remove('hide');
})

pay.addEventListener('click', () => {
    let full = document.querySelector('.fullprice').textContent;
    Telegram.WebApp.close();

    let providerToken = '284685063:TEST:MTkzYzAzZTlhOTRh';

    let fullNum = +full.replace(/[^0-9]/g, "");

    let objPrices = JSON.stringify([{ label: 'Invoice Test Title', amount: 100 * fullNum }]);

    let imagePayUrl = 'https://i.pinimg.com/originals/3d/f5/c2/3df5c211772a65b7dede560b8859be6e.png';

    let payUrl = `https://api.telegram.org/bot${token}/sendInvoice?chat_id=${user.id}&title=${full}&description=Оплатите ваш заказ на сумму ${fullNum} рублей.&payload=${full}&provider_token=${providerToken}&currency=RUB&prices=${objPrices}&photo_url=${imagePayUrl}&photo_width=500px&photo_height=500px&need_shipping_address=true&parse_mode=html`;

    console.log(payUrl);

    var payReq = new XMLHttpRequest();
    payReq.open("GET", payUrl, true);
    payReq.send();
})