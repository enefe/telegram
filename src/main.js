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
    Telegram.WebApp.close();
    Telegram.WebApp.sendData(full);
    /* console.log(Telegram.WebApp.WebAppInfo); */

    /* bot.sendMessage(Telegram.WebApp.initData.user.id, '${full}'); */

    function getBot(url) {
        return fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            });
    }

    let url = 'https://api.telegram.org/bot5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo/getMe';

    getBot(url)
        .then((data) => {
            console.log(data);
            data.sendMessage(Telegram.WebApp.initData.user.id, '${full}');
        });


})