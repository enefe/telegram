/* console.log(Telegram.WebApp.initData.user.id); */


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
}

let url = 'https://api.telegram.org/bot5359355956:AAEAMReleozRWWkMhGSA81MfiGS0ghEBPFo/getMe';

getBot(url)
    .then((data) => {
        console.log(data);
        data.sendMessage(Telegram.WebApp.initData.user.id, '${full}');
    }); */




/* const getInvoice = (id) => {
    const invoice = {
        chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
        title: 'Итого к оплате:', // Название продукта, 1-32 символа
        description: 'тест', // Описание продукта, 1-255 знаков
        payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: providerToken
        },
        provider_token: providerToken, // токен выданный через бот @SberbankPaymentBot
        currency: 'RUB', // Трехбуквенный код валюты ISO 4217
        prices: [{ label: 'Invoice Title', amount: 100 * full }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
        start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
        photo_url: '/images/icon.png', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
        photo_width: 500, // Ширина фото
        photo_height: 281, // Длина фото

    }

    return invoice
}

let pay = getInvoice(user.id); */