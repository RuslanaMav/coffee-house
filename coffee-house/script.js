// BURGER MENU
const menuBurgerButton = document.querySelector(".burger-menu-popup-button");
const popupMenu = document.querySelector(".burger-popup");

menuBurgerButton.addEventListener('click', openMenu);
document.querySelectorAll(".nav-item.burger").forEach(item => item.addEventListener('click', closeMenu));

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

window.addEventListener("resize", () => {
    if (window.screen.width >= 769) {
        closeMenu();
    }
});



// CAROUSEL HOME


const rightButton = document.querySelector(".slider-arrow.right");
const leftButton = document.querySelector(".slider-arrow.left");
const cardCarousel = document.querySelector(".fav-carousel-cont");
const sliderInd = document.querySelectorAll('.slider-btn-control');
let flagCarousel = 0;
let timerSlider = setInterval(sliderTimerFunc, 4000);

rightButton.addEventListener('click', sliderIndFunc);
leftButton.addEventListener('click', sliderIndFunc);

document.querySelector(".fav-cont").addEventListener('touchend', () => {
    if (window.screen.width < 768) sliderIndFunc();
});

function sliderTimerFunc() {
    sliderInd[flagCarousel].classList.remove("checked");
    flagCarousel === 2 ? flagCarousel = 0 : flagCarousel++;
    sliderInd[flagCarousel].classList.add("checked");
    sliderMove();
}

function sliderMove() {
    let widScr;
    window.screen.width >= 768 ? widScr = 530 : widScr = 398
    cardCarousel.animate([
        { left: getComputedStyle(cardCarousel).left },
        { left: `${-widScr * flagCarousel}px` },],
        { duration: 1000, },);
    cardCarousel.style.left = `${-widScr * flagCarousel}px`;
};


function sliderIndFunc() {
    clearTimeout(timerSlider);
    sliderInd[flagCarousel].classList.remove("checked");
    if (event.currentTarget.className === 'slider-arrow right')
        flagCarousel === 2 ? flagCarousel = 0 : flagCarousel++;
    else
        flagCarousel === 0 ? flagCarousel = 2 : flagCarousel--;
    sliderInd[flagCarousel].classList.add("checked");
    sliderMove();
    timerSlider = setInterval(sliderTimerFunc, 4000);
}











