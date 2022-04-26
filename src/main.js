Telegram.WebApp.ready();

const adds = document.querySelectorAll('.product__button');
const deleteProduct = document.querySelectorAll('.basket__number');
const plus = document.querySelectorAll('.plus');
const minus = document.querySelectorAll('.minus');
const cartProductsList = document.querySelector('.basket__products');
const fullPrice = document.querySelector('.fullprice');
let price = 0;
/* let num = 0; */

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

const pay = document.querySelector('.basket__button');

/* const TelegramBot = require('node-telegram-bot-api');

const token = '5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo';

const bot = new TelegramBot(token, { polling: true }); */

pay.addEventListener('click', () => {

    let full = document.querySelector('.fullprice').textContent;
    /* console.log(typeof(full)); */
    Telegram.WebApp.close();
    Telegram.WebApp.sendData(full);

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
    console.log(user.id);
    console.log(typeof(user.id));

    /* bot.sendMessage(id, '${full}'); */

    var token = "5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo";
    var telegramUrl = "https://api.telegram.org/bot" + token;
    /* var res = fetch(telegramUrl + "/getUpdates");
    console.log(res); */

    /* function getBot(url) {
        return fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            });
    } */

    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user.id}&text=${full}&parse_mode=html`;

    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.send();

    console.log(url);

    /* getBot(url)
        .then((data) => {
            console.log(data);
        }); */

    let providerToken = '';

    const getInvoice = (id) => {
        const invoice = {
            chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
            provider_token: providerToken, // токен выданный через бот @SberbankPaymentBot
            start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
            title: 'Итого к оплате:', // Название продукта, 1-32 символа
            description: 'тест', // Описание продукта, 1-255 знаков
            currency: 'RUB', // Трехбуквенный код валюты ISO 4217
            prices: [{ label: 'Invoice Title', amount: 100 * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
            photo_url: '/images/icon.png', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
            photo_width: 500, // Ширина фото
            photo_height: 281, // Длина фото
            payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
                unique_id: `${id}_${Number(new Date())}`,
                provider_token: providerToken
            }
        }

        return invoice
    }

    getInvoice(user.id);

    /* function getChat_id() {
        var res = fetch(telegramUrl + "/getUpdates");
        console.log(res);
        var res = JSON.parse(res);
        console.log(res.result[0].message.chat.id.toString());
    }

    getChat_id(); */



})