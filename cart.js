const subDiv = document.querySelector('.sub');
const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
const mainTotal = document.querySelector('#mainTotal');
const dialog = document.querySelector('dialog');
const removeOne = document.querySelector('#removeOne');
const removeAll = document.querySelector('#removeAll');
const closeDialog = document.querySelector('#closeDialog');

let outerIndex;
let outerElement;
let imgsrc;

function draw() {
  subDiv.innerHTML = '';
  let total = 0;
  if (localCart.length === 0) {
    mainTotal.textContent = 'No cart';
  } else {
    localCart.forEach((element, index) => {
      if (element.number > 0) {
        outerIndex = index;
        outerElement = element;

        if (outerIndex === 0) {
          imgsrc =
            'https://t3.ftcdn.net/jpg/01/82/01/38/240_F_182013894_HME8YCWK7hsKdxGOlqI0glDv6SkMWDSe.jpg';
        } else if (outerIndex === 1) {
          imgsrc =
            'https://t4.ftcdn.net/jpg/02/24/93/93/240_F_224939369_d3J7LqpwLKNjHrEhU6zTRoWTEvi8rtTL.jpg';
        } else if (outerIndex === 2) {
          imgsrc =
            'https://t3.ftcdn.net/jpg/01/27/66/44/240_F_127664400_yrBv5qijLREbW7DjQH9UVfXIY1h9MHbB.jpg';
        } else {
          imgsrc =
            'https://t4.ftcdn.net/jpg/03/62/34/45/240_F_362344577_gYcLtKEWNbISe7K43o5xQ2hWcqJfw1ST.jpg';
        }

        //合計金額の計算
        total += element.number * element.price;
        //name, price, numberの取得
        let name = index;
        let price = element.price;
        let number = element.number;

        //div priceImfo生成
        const priceImfodiv = document.createElement('div');
        priceImfodiv.className = 'priceImfo';

        //div imgImfo生成
        const imgImfodiv = document.createElement('div');
        imgImfodiv.className = 'imgImfo';

        //p Name / img bagImg生成
        const NameP = document.createElement('p');
        NameP.id = 'Name';
        const bagImg = document.createElement('img');
        bagImg.id = 'bagImg';

        //div textImfo　生成
        const textImfodiv = document.createElement('div');
        textImfodiv.className = 'textImfo';

        //p Price / p Number 生成
        const priceP = document.createElement('p');
        priceP.id = 'price';
        const numberP = document.createElement('p');
        numberP.id = 'Number';
        const removeBtn = document.createElement('button');
        removeBtn.id = 'removebtn';
        removeBtn.textContent = 'edit';

        //html 表示
        // mainTotal.textContent = `total: ¥${total}`;
        NameP.textContent = `bag: No${name}`;
        bagImg.src = imgsrc;
        bagImg.alt = `bag: No.${name}`;
        priceP.textContent = `¥${price}`;
        numberP.textContent = `${number} item`;

        //削除ボタン
        removeBtn.addEventListener('click', () => {
          outerIndex = index;
          outerElement = element;
          remove();
        });

        //appenChild
        imgImfodiv.appendChild(NameP);
        imgImfodiv.appendChild(bagImg);

        textImfodiv.appendChild(priceP);
        textImfodiv.appendChild(numberP);
        textImfodiv.appendChild(removeBtn);

        priceImfodiv.appendChild(imgImfodiv);
        priceImfodiv.appendChild(textImfodiv);

        subDiv.appendChild(priceImfodiv);
      }
    }); //foreach
  } //else
  save();
  if (total > 0) {
    mainTotal.textContent = `¥${total}`;
  } else {
    mainTotal.textContent = 'No cart';
  }
}

//削除ボタン
function remove() {
  dialog.showModal();
}

//removeOneイベント
removeOne.addEventListener('click', () => {
  localCart[outerIndex].number -= 1;
  save();
  draw();
  dialog.close();
});

//removeAllイベント
removeAll.addEventListener('click', () => {
  localCart[outerIndex].number = 0;
  save();
  draw();
  dialog.close();
});

//closeDialogイベント
closeDialog.addEventListener('click', () => {
  dialog.close();
});

function save() {
  localStorage.setItem('localCart', JSON.stringify(localCart));
}

//初期描画呼び出し
draw();
