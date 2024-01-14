

let url = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/coffee-house/products.json'
let response = await fetch(url);
let products = await response.json();
//console.log(p[0]);

// BURGER MENU

const menuBurgerButton = document.querySelector(".burger-menu-popup-button");
const popupMenu = document.querySelector(".burger-popup");

menuBurgerButton.addEventListener('click', openMenu);

document.querySelectorAll(".nav-item.burger").forEach(item => item.addEventListener('click', closeMenu));
document.querySelector(".button-a.burger").addEventListener('click', closeMenu);

function openMenu() {
    menuBurgerButton.classList.toggle("open");
    if (menuBurgerButton.classList.contains("open")) {
        popupMenu.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    else closeMenu();
}

function closeMenu() {
    menuBurgerButton.classList.remove("open");  
    popupMenu.classList.remove("open");
    document.body.style.overflow = "visible";
}








/* REFRESH BUTTON */
const refresh = document.querySelector(".refresh-btn");
const menuTabs = document.querySelector(".menu-tabs");
let menuButtonCheck = document.querySelector(".menu-button.check");
refresh.addEventListener('click', refreshPicture);


function refreshPicture() {
    refresh.style.display = "none";
    document.querySelectorAll(".tabs-item.hidden").forEach(item => item.style.display = "block");
}

// Change cards

const menuButton = document.querySelectorAll(".menu-button");
const card = document.querySelectorAll(".tabs-img.main");
const cardMenu = document.querySelectorAll(".tabs-item");
const titleCard = document.querySelectorAll(".tabs-title.main");
const descCard = document.querySelectorAll(".tabs-info");
const priceCard = document.querySelectorAll(".tabs-price");

menuButton.forEach((elem) => elem.addEventListener('click', changeMenu));

function changeMenu() {
    menuButtonCheck.classList.remove("check");
    menuButtonCheck.firstElementChild.classList.remove("check");
    menuButtonCheck = event.currentTarget;
    menuButtonCheck.classList.add("check");
    menuButtonCheck.firstElementChild.classList.add("check");

    if (menuButtonCheck.id === "menu-button-2") {
        for (let i = 4; i < 8; i++) cardMenu[i].style.display = "None";
        refresh.style.display = "none";
        changeCard(4, 'tea', 8);
    }

    else {
        cardMenu.forEach(item => item.style.display = "block");
        if (window.screen.width < 769) {
            refresh.style.display = "block";
            document.querySelectorAll(".tabs-item.hidden").forEach(item => item.style.display = "none");
        }
        menuButtonCheck.id === "menu-button-3" ? changeCard(8, 'dessert', 12) : changeCard(8, 'coffee', 0)
    }
}


function changeCard(n, name, s) {
    for (let i = 0; i < n; i++) {
        card[i].src = `img/${name}-` + (i + 1) + '.png';
        titleCard[i].innerHTML = products[s + i].name;
        descCard[i].innerHTML = products[s + i].description;
        priceCard[i].innerHTML = "$" + products[s + i].price;
    }
}

window.addEventListener("resize", () => {
    if (window.screen.width < 769) {
        refresh.style.display = "block";
        document.querySelectorAll(".tabs-item.hidden").forEach(item => item.style.display = "none");
    }
    else {
        refresh.style.display = "none";
        document.querySelectorAll(".tabs-item.hidden").forEach(item => item.style.display = "block");
        closeMenu();
    }
});


// Modal 

const addTitle = document.querySelectorAll(".tabs-info-size.add");
const modalPrice = document.querySelector(".tabs-title.modal.price");
const modalWindow = document.querySelector(".modal-popup");

let checkButtonSize = document.querySelector(".button-size.price.check");
let currentAdd = 0;

let idCard, n, currentPrice;


cardMenu.forEach(item => item.addEventListener('click', openModal));

document.addEventListener('click', (e) => {
    const b = e.composedPath().includes(modalWindow);
    const s = e.composedPath().includes(document.querySelector(".menu"));
    const c = e.composedPath().includes(document.querySelector(".modal-close"));
    const m = e.composedPath().includes(menuBurgerButton);
    if (!b && !s && !m || c) {
        modalWindow.classList.remove("open");
        document.body.style.overflow = "visible";
        document.body.classList.remove("open");
        
    }
});


function openModal() {
    const menuCategory = document.querySelector(".menu-button.check").id[12];
    checkButtonSize.classList.remove('check');
    checkButtonSize = document.querySelector(".button-size.price");
    checkButtonSize.classList.add("check");
    document.querySelectorAll(".button-size.btn-add.check").forEach(item => item.classList.remove("check"));
    currentAdd = 0;
    let name;
    idCard = Number(event.currentTarget.id[8]);

    if (Number(menuCategory) === 1) {
        name = "coffee";
        n = 0;
    }
    else if (Number(menuCategory) === 2) {
        name = "tea";
        n = 8;
    }
    else {
        name = "dessert";
        n = 12;
    }
    currentPrice = Number(products[n + idCard - 1].price);

    addAdditives(n + idCard - 1); 
    document.querySelector(".tabs-img.modal").src = `img/${name}-` + idCard + '.png';
    document.querySelector(".tabs-title.modal").innerHTML = products[n + idCard - 1].name;
    document.querySelector(".tabs-info-modal").innerHTML = products[n + idCard - 1].description;
    modalPrice.innerHTML = "$" + products[n + idCard - 1].price;
    document.body.style.overflow = "hidden";
    document.body.classList.add("open");
    modalWindow.classList.add("open");
}




function addAdditives(n) {
    addTitle[0].innerHTML = products[n].additives[0].name;
    addTitle[1].innerHTML = products[n].additives[1].name;
    addTitle[2].innerHTML = products[n].additives[2].name;
}

//Change price

const buttonSize = document.querySelectorAll(".button-size.price");
const buttonAdd = document.querySelectorAll(".button-size.btn-add");



buttonSize.forEach(item => item.addEventListener("click", changePrice));
buttonAdd.forEach(item => item.addEventListener("click", changePriceAdd));


function changePrice() {
    checkButtonSize.classList.remove("check");
    checkButtonSize = event.currentTarget;
    checkButtonSize.classList.add("check");

    let price = Number(products[n + idCard - 1].price);

    if (Number(checkButtonSize.id[9]) === 1)
        modalPrice.innerHTML = "$" + (price + currentAdd).toFixed(2);
    else if (Number(checkButtonSize.id[9]) === 2)
        modalPrice.innerHTML = "$" + (price + currentAdd + Number(products[n + idCard - 1].sizes.m["add-price"])).toFixed(2);
    else
        modalPrice.innerHTML = "$" + (price + currentAdd + Number(products[n + idCard - 1].sizes.l["add-price"])).toFixed(2);
    currentPrice = Number(modalPrice.innerHTML.slice(1)) - currentAdd;
}

function changePriceAdd() {
    const checkButtonAdd = event.currentTarget;
    let pr = Number(modalPrice.innerHTML.slice(1));
    let card = Number(checkButtonAdd.id[8]);
    if (!checkButtonAdd.classList.contains("check")) {
        checkButtonAdd.classList.add("check");
        modalPrice.innerHTML = "$" + (pr + Number(products[n + idCard - 1].additives[card - 1]["add-price"])).toFixed(2);
        currentAdd += Number(products[n + idCard - 1].additives[card - 1]["add-price"]);
    }
    else {
        checkButtonAdd.classList.remove("check");
        pr -= Number(products[n + idCard - 1].additives[card - 1]["add-price"]);
        modalPrice.innerHTML = "$" + pr.toFixed(2);
        currentAdd = 0;
    }
}