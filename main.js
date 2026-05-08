const userItems = document.querySelectorAll('.item-checkbox');
const dialog = document.querySelector('dialog');
const addCart = document.querySelector('#addCart');
const closeButton = document.querySelector('#close');
const cartP = document.querySelector('#cartP');
const humberger = document.querySelector('.humberger');
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('#closeMenu');

let cart = JSON.parse(localStorage.getItem('localCart')) || [
  { number: 0, price: 0 },
  { number: 0, price: 0 },
  { number: 0, price: 0 },
  { number: 0, price: 0 },
];

let total = 0;
let outerElement;
let outerIndex;
let outerElementPrice;

cart.forEach((item) => {
  let price = Number(item.price);
  let number = item.number;
  total += price * number;
});

if (total !== 0) {
  cartP.textContent = `total: ${total.toLocaleString()}yen`;
} else {
  cartP.textContent = `No cart`;
}

userItems.forEach((element, index) => {
  element.addEventListener('change', () => {
    outerElement = element;
    outerIndex = index;
    outerElementPrice = element.dataset.price;
    dialog.showModal();
  });
});

//-------------------------------------------------------------
//localstorageの更新、保存
function save() {
  localStorage.setItem('localCart', JSON.stringify(cart));
}

//ダイアログ add cart
addCart.addEventListener('click', () => {
  //商品数を更新
  cart[outerIndex].number += 1;
  cart[outerIndex].price = outerElementPrice;
  //値段を取得
  let price = parseInt(cart[outerIndex].price);

  //合計金額を更新
  total += price;
  //表示
  cartP.textContent = `total: ${total.toLocaleString()}yen`;
  //ローカルストレージに金額、個数を保存
  save();
  dialog.close();
});

//ダイアログ close
closeButton.addEventListener('click', () => {
  dialog.close();
});

//--------------------------------------------------------------------------

//humberger

humberger.addEventListener('click', () => {
  menu.classList.toggle('active');
  humberger.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
  humberger.classList.toggle('active');
});

/*--------------------------------------------------*/

const target = document.querySelectorAll('img,p');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.4,
  },
);

target.forEach((item) => {
  observer.observe(item);
});
