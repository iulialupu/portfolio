// -------------- Bubbles from the Home section
const container = document.querySelector("#home");
const circlesContainer = document.querySelector(".circles-container");
const H = window.innerHeight;
const W = window.innerWidth;
let circlesPosition = [];

// generate a number from 0 to range
function getRandomNumber(range) {
  return Math.floor(Math.random() * range);
}

function generateRandomElem(num, smallestSize, largestSize) {
  let circles = "";

  for (let i = 0; i < num; i++) {
    const objPosition = {
      top: getRandomNumber(H),
      left: getRandomNumber(W),
      WH: getRandomNumber(largestSize - smallestSize) + smallestSize
    };
    /* object width and height */

    circles =
      circles +
      `<div class='dot' style=' top: ${objPosition.top}px; left: ${
        objPosition.left
      }px ; width: ${objPosition.WH}px; height:  ${objPosition.WH}px;' ></div>`;
    circlesPosition.push(objPosition);
  }
  circlesContainer.innerHTML = circles;
}

function handleMouseMove(e) {
  const cursorPosition = {
    x: e.clientX,
    y: e.clientY
  };

  for (let i = 0; i < circlesPosition.length; i++) {
    circlesPosition[i].centerX =
      circlesPosition[i].left + circlesPosition[i].WH / 2;
    circlesPosition[i].centerY =
      circlesPosition[i].top + circlesPosition[i].WH / 2;

    circlesPosition[i].diffX =
      ((cursorPosition.x - circlesPosition[i].centerX) / W) * 3;
    circlesPosition[i].diffY =
      ((cursorPosition.y - circlesPosition[i].centerY) / H) * 3;

    circlesContainer.children[i].style.transform = `rotateX(${-circlesPosition[
      i
    ].diffY}deg)  rotateY(${-circlesPosition[i]
      .diffX}deg) translateX(${-cursorPosition.x *
      circlesPosition[i].diffX}px) translateY(${-cursorPosition.y *
      circlesPosition[i].diffY}px)`;
  }
}

generateRandomElem(20, 10, 280);

container.addEventListener("mousemove", e => handleMouseMove(e));

// ####################################################################
// ####################################################################

// ------------- PAGE SCROLL

const menuLinks = document.querySelectorAll(".navigation a");
let currentSection = "#home";
const sectionsList = [];
for (let i = 0; i < menuLinks.length; i++) {
  sectionsList.push(menuLinks[i].getAttribute("href"));
}
let prevScrollYPos = null;
let currentScrollPos = null;
let isScrolling = false;

function addActiveClass(linksList, current, menuClassStr) {
  for (let i = 0; i < linksList.length; i++) {
    linksList[i].classList.remove("active");
  }
  document
    .querySelector(`.${menuClassStr} a[href='${current}']`)
    .classList.add("active");
}

function smoothScroll() {
  isScrolling = true;
  const left =
    currentSection === "#projects"
      ? document.querySelector(currentSlide).offsetLeft
      : document.querySelector(currentSection).offsetLeft;
  window.scrollTo({
    top: document.querySelector(currentSection).offsetTop,
    left: left,
    behavior: "smooth"
  });
  addActiveClass(menuLinks, currentSection, "navigation");
}

function smoothScrollOnClick(e) {
  e.preventDefault();
  currentSection = e.target.getAttribute("href");
  smoothScroll();
}

function prevSection() {
  if (sectionsList.indexOf(currentSection) === 0) {
    return;
  }
  currentSection = sectionsList[sectionsList.indexOf(currentSection) - 1];
  smoothScroll();
}
function nextSection() {
  if (sectionsList.indexOf(currentSection) === sectionsList.length - 1) {
    return;
  }
  currentSection = sectionsList[sectionsList.indexOf(currentSection) + 1];
  smoothScroll();
}

// add active class to home section nav-link as default;
addActiveClass(menuLinks, currentSection, "navigation");

// smooth scroll to section on nav-link click
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", e => smoothScrollOnClick(e));
}

// smooth scroll to section on ⬆ and ⬇ keys
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    prevSection();
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    nextSection();
  }
  return;
});

// smooth scroll to section on scroll event (see below)

// ####################################################################
// ####################################################################
// -----------  Slider

const slides = document.querySelectorAll(".project");
const sliderLinks = document.querySelectorAll(".slider-link");
const slider = document.querySelector(".slider");
let currentSlide = "#slide1";
const slidesList = Array.from(sliderLinks, link => link.getAttribute("href"));
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
let currentScrollXPos = null;

function slideScroll() {
  isScrolling = true;
  const width = document.querySelector(currentSlide).offsetLeft;
  window.scrollTo({
    top: document.querySelector("#projects").offsetTop,
    left: width,
    behavior: "smooth"
  });

  function addMarginToSections() {
    for (let section of sectionsList) {
      if (section !== "#projects") {
        document.querySelector(
          section
        ).style.marginLeft = `${window.innerWidth *
          slidesList.indexOf(currentSlide)}px`;
      }
    }
  }

  //function from smooth scroll (look up)
  addActiveClass(sliderLinks, currentSlide, "slider-nav");
  addMarginToSections();
}

function showSlideOnDotClick(e) {
  e.preventDefault();
  currentSlide =
    e.target.getAttribute("href") || e.path[1].getAttribute("href");
  slideScroll();
}

function prevSlide() {
  if (slidesList.indexOf(currentSlide) === 0) {
    return;
  }
  currentSlide = slidesList[slidesList.indexOf(currentSlide) - 1];
  slideScroll();
}
function nextSlide() {
  if (slidesList.indexOf(currentSlide) === slidesList.length - 1) {
    return;
  }
  currentSlide = slidesList[slidesList.indexOf(currentSlide) + 1];
  slideScroll();
}

//position the slides
for (let i = 0; i < slides.length; i++) {
  slides[i].style.left = `${100 * i}vw`;
}
// slider width;
slider.style.width = `${100 * slides.length}vw`;

// scroll to slide on dot click
for (let i = 0; i < sliderLinks.length; i++) {
  sliderLinks[i].addEventListener("click", e => showSlideOnDotClick(e));
}

// first slide as default
addActiveClass(sliderLinks, currentSlide, "slider-nav");

// scroll to slide on ⬅ and ➡ keys
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    nextSlide();
  }
  return;
});

// scroll to slide on left and right arrows (lines)
leftArrow.onclick = e => {
  prevSlide();
};
rightArrow.onclick = e => {
  nextSlide();
};

// SCROLL EVENT
// smooth scroll to section on scroll event
document.addEventListener("scroll", e => {
  currentScrollYPos = Math.round(window.scrollY);
  currentScrollXPos = Math.round(window.scrollX);

  if (isScrolling) {
    // isScrolling = true
    if (
      currentScrollYPos === document.querySelector(currentSection).offsetTop
    ) {
      // if in projects and scrolling return
      if (
        currentSection === "#projects" &&
        currentScrollXPos !== document.querySelector(currentSlide).offsetLeft
      ) {
        return;
      } else {
        isScrolling = false;
      }

      // animate section when it is for the first time in view
      document.querySelector(currentSection).classList.add("in-view");
    } else {
      return;
    }

    // isScrolling = false
  } else {
    e.preventDefault();
    if (currentScrollYPos > prevScrollYPos) {
      //👇 scroll down

      if (
        currentSection === "#projects" &&
        currentSlide !== slidesList[slidesList.length - 1]
      ) {
        nextSlide();
      } else {
        nextSection();
      }
    } else if (currentScrollYPos < prevScrollYPos) {
      //👆 scroll up

      if (currentSection === "#projects" && currentSlide !== slidesList[0]) {
        prevSlide();
      } else {
        prevSection();
      }
    }
  }
  prevScrollYPos = currentScrollYPos;

  // make the slider-dots visible on projects section
  // has nothing to do with the smooth scroll itself
  if (currentSection === "#projects") {
    document.querySelector(".slider-nav").classList.add("visible");
  } else {
    document.querySelector(".slider-nav").classList.remove("visible");
  }

  // change the color of active nav-link from pink to white when contacts section is in view
  // has nothing to do with the smooth scroll itself
  if (currentScrollYPos === document.getElementById("contacts").offsetTop) {
    document
      .querySelector(".navigation a[href='#contacts']")
      .classList.add("contacts-active");
  }
  if (currentScrollYPos < document.getElementById("contacts").offsetTop) {
    document
      .querySelector(".navigation a[href='#contacts']")
      .classList.remove("contacts-active");
  }
});
