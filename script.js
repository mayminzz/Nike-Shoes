//goods
const selected = document.querySelector("select");
const options = document.querySelectorAll("option");

selected.addEventListener("change", (e) => {
  const selectedCategory = selected.value;
  console.log(selectedCategory);

  const products = document.querySelectorAll("#goods .item");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : Array.from(products).filter(
          (product) => product.dataset.alt === selectedCategory
        );

  // 필터링된 제품 목록 출력
  const productList = document.querySelector(".goods_items");
  products.forEach((product) => {
    product.style.display = "none";
  });
  console.log(filteredProducts);
  filteredProducts.forEach((product) => {
    product.style.display = "block";
    productList.appendChild(product);
  });
});

// 클릭할 카트 버튼은에 대한 정의
const cartBtns = document.querySelectorAll(".cart");

// 장바구니 상품을 출력할 위치에 대한 정의
const cartResult = document.querySelector(".cart_container");
const total = document.querySelector(".total");
const totalSumPlace = document.querySelector(".total_price");
const allPrice = document.querySelectorAll(".price");
const pay = document.querySelector(".pay");

let cartLists = [];

const totalSum = () => {
  const totalPrice = document.querySelectorAll(".countPrice");
  const totalPriceArray = Array.from(totalPrice).map((node) =>
    parseInt(node.innerText)
  );

  if (cartLists.length === 0) {
    total.classList.remove("active");
    pay.classList.remove("active");
    cartResult.innerHTML = `<h4>카트가 비었습니다.</h4>`;
  } else {
    let result = totalPriceArray.reduce((total, current) => total + current);
    totalSumPlace.innerText = `${result.toLocaleString()},000`;
  }
};
const products = document.querySelectorAll(".item");

const delCart = (e) => {
  const target = e.currentTarget.parentNode.parentNode.parentNode;
  cartLists = cartLists.filter((cartList) => cartList.id != target.id);
  target.remove();
  totalSum();
};

const plus = (e) => {
  let count = e.currentTarget.parentNode.querySelector(".count");
  let plusCount = parseInt(count.innerText);

  const price =
    e.currentTarget.parentNode.parentNode.querySelector(".countPrice");
  const initPrice =
    e.currentTarget.parentNode.parentNode.parentNode.querySelector(
      "span"
    ).innerText;

  if (plusCount < 5) {
    plusCount++;
    count.innerText = plusCount;
  } else {
    alert("상품별 구매하실 수 있는 수량은 최대 5개입니다.");
  }

  const plusTotal = parseInt(initPrice) * plusCount;
  price.innerText = `${plusTotal},000`;
  totalSum();
};

const minus = (e) => {
  let count = e.currentTarget.parentNode.querySelector(".count");
  let minusCount = parseInt(count.innerText);

  const price =
    e.currentTarget.parentNode.parentNode.querySelector(".countPrice");
  const initPrice =
    e.currentTarget.parentNode.parentNode.parentNode.querySelector(
      "span"
    ).innerText;

  if (minusCount === 1) {
    return;
  } else {
    minusCount--;
    count.innerText = minusCount;
  }

  const minusTotal = parseInt(initPrice) * minusCount;
  price.innerText = `${minusTotal},000`;
  totalSum();
};

const addCart = () => {
  let cartOutput = "";
  cartLists.forEach((cartList) => {
    cartOutput += `
      <li class="cart_goods" id="${cartList.id}">
        <div class="goods_thumb">
          <img src="${cartList.img}"/>
        </div>
        <div class="goods_info_box">
          <div class="item_info">
            <h1>${cartList.name}</h1>
            <span>${cartList.price}</span>
            <button class="cartDel">Remove</button>
          </div>
          <div class="item_control">
            <div class="count_sec">
              <span class="minus">
                <i class="fas fa-minus"></i>
              </span>
              <h2 class="count">1</h2>
              <span class="plus">
                <i class="fas fa-plus"></i>
              </span>
            </div>
              <span class="countPrice">${cartList.price}</span>
          </div>
        </div>
      </li>
      `;
  });
  cartResult.innerHTML = cartOutput;
  total.classList.add("active");
  pay.classList.add("active");

  const cartDelBtns = document.querySelectorAll(".cartDel");
  cartDelBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", delCart);
  });
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");

  plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener("click", plus);
  });

  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener("click", minus);
  });
  totalSum();
};

const cartHandler = (e) => {
  e.preventDefault();
  const cartList = e.currentTarget.parentNode.parentNode.parentNode;
  const itemId = cartList.id;
  const itemImg = cartList.querySelector("img");
  const itemName = cartList.querySelector(".item_title > h1");
  const itemPrice = cartList.querySelector(".price");
  const cartListData = {
    id: itemId,
    img: itemImg.getAttribute("src"),
    name: itemName.innerText,
    price: itemPrice.innerText,
  };

  const isMatching = cartLists.find((item) => item.id === cartListData.id);
  if (!isMatching) {
    alert("장바구니에 담았습니다.");
    cartLists.push(cartListData);
    addCart();
  } else {
    alert("같은 제품이 장바구니에 있습니다.");
  }
};

cartBtns.forEach((wishBtn) => {
  wishBtn.addEventListener("click", cartHandler);
});

//widh
const hearts = document.querySelectorAll(".wish");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("addWish");
  });
});
