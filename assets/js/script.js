'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navbarLogo = document.querySelector(".navbar-logo-container"); // Select the logo inside the menu

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");

    // Ensure logo is only shown when the menu is open
    if (navbar.classList.contains("active")) {
        navbarLogo.style.display = "flex"; // Show logo when menu is open
    } else {
        navbarLogo.style.display = "none"; // Hide logo when menu is closed
    }
};

// Apply event listener to menu buttons
navTogglers.forEach(toggler => {
    toggler.addEventListener("click", toggleNavbar);
});


// Attach the function to the menu open/close buttons
navTogglers.forEach(toggler => {
    toggler.addEventListener("click", toggleNavbar);
});



addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  if (window.innerWidth >= 575) { // Only apply effect on desktop
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
  } else {
    header.classList.remove("hide"); // Keep header visible on mobile
  }
};

window.addEventListener("scroll", function () {
  if (window.innerWidth > 574) { // Desktop behavior remains
    if (window.scrollY >= 50) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  } else {
    header.classList.remove("active"); // Ensures navbar remains static on mobile
  }
});


const logo = document.querySelector(".header .logo");
const reserveBtn = document.querySelector(".header .btn");

window.addEventListener("scroll", function () {
  if (window.innerWidth <= 574) { // Apply only for mobile
    logo.style.display = "none"; // Hide logo permanently on mobile when scrolling
    reserveBtn.style.display = "none"; // Hide reserve button as well
  } else {
    if (window.scrollY === 0) {
      logo.style.display = "block"; // Show logo on desktop when at top
      reserveBtn.style.display = "block";
    } else {
      logo.style.display = "block"; // Keep it visible on desktop
      reserveBtn.style.display = "block";
    }
  }
});




const navButton = document.querySelector(".nav-open-btn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navButton.classList.add("scrolled");
  } else {
    navButton.classList.remove("scrolled");
  }
});


/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

window.addEventListener("load", function () {
  const heroSection = document.querySelector(".hero");

  if (window.innerWidth < 575) {
    heroSection.style.display = "flex";
  }
});
