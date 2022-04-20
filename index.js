const adds = document.querySelectorAll('.product__button');
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
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
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

/* const printQuantity = () => {
	let productsListLength = cartProductsList.querySelector('.basket__product').children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
}; */

const generateCartProduct = (img, title, price, id) => {
	return `
        <div class="basket__product" data-id="${id}">
            <div class="basket__product-left">
                <img class="basket__product-image" src="${img}" alt="${title}">
                <p class="basket__product-title">${title}</p>
                <div class="basket__number">1</div>
            </div>

            <p class="basket__product-price">${normalPrice(price)}</p>
        </div>
	`;
};

const generateButtons = () => {
    return `
        <div class="product__plus-minus">
            <button class="product__button plus">+</button>
            <button class="product__button minus">-</button>
        </div>
	`;
}

adds.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product__image').getAttribute('src');
		let title = parent.querySelector('.product__name').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product__call').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__call').textContent));
        /* console.log(priceNumber); */
		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));

		/* printQuantity(); */
		
		self.disabled = true;
        /* self.classList.remove('product__button');
        self.textContent = '';
        self.insertAdjacentHTML('afterbegin', generateButtons()); */
	});
});

/* minus.forEach(el => {
    el.addEventListener('click', (e) => {
        el.closest('.product__plus-minus').remove();
    })
}) */

const openPopup = document.querySelector('.catalog__button');
const closePopup = document.querySelector('.basket__edit');
const popup = document.querySelector('.basket');

openPopup.addEventListener('click', (e) => {
    popup.classList.add('active');
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
})

/* let plusMin = `
    <div class="product__plus-minus">
        <button class="product__button plus">+</button>
        <button class="product__button minus">-</button>
    </div>
`; */

/* const plusMin = () => {
	return `
        <div class="product__plus-minus">
            <button class="product__button plus">+</button>
            <button class="product__button minus">-</button>
        </div>
    `;
}; */

/* adds.forEach((el) => {
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        self.classList.add('hide');
        console.log(self);
        self = plusMin();
    })
}) */

/* function clicked(slide_button) {
    let buttons = document.getElementsByClassName('product__button');
    const minPlus = document.querySelectorAll('.product__plus-minus');
    for(var i = 0; i < buttons.length; i++) {
        
    }
    slide_button.style.disabled;
    console.log(buttons);

} */