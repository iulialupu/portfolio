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
      }px ; width: ${objPosition.WH}px; height: ${objPosition.WH}px;' ></div>`;
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

generateRandomElem(15, 10, 180);

container.addEventListener("mousemove", e => handleMouseMove(e));

// ####################################################################
// ####################################################################

// ------------- PAGE SCROLL

const menuLinks = document.querySelectorAll(".navigation a");
let currentSection = "#home";
const hash = window.location.hash;
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
  addActiveClass(menuLinks, currentSection, "navigation");
  isScrolling = true;
  const left = 0;
  window.scrollTo({
    top: document.querySelector(currentSection).offsetTop,
    left: left,
    behavior: "smooth"
  });
}

function smoothScrollOnClick(e) {
  e.preventDefault();
  if (e.target.classList.contains("menu-text")) {
    currentSection = e.path[1].getAttribute("href");
  } else {
    currentSection = e.target.getAttribute("href");
  }
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

// add active class to home section
addActiveClass(menuLinks, currentSection, "navigation");

// add active class
if (hash != "") {
  currentSection = hash;
  addActiveClass(menuLinks, currentSection, "navigation");
  smoothScroll();
  isScrolling = true;
}

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

// SCROLL EVENT
// smooth scroll to section on scroll event
document.addEventListener("scroll", e => {
  currentScrollYPos = Math.round(window.scrollY);

  if (isScrolling) {
    // isScrolling = true

    if (
      currentScrollYPos === document.querySelector(currentSection).offsetTop
    ) {
      isScrolling = false;
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
      nextSection();
    } else if (currentScrollYPos < prevScrollYPos) {
      //👆 scroll up
      prevSection();
    }
  }
  prevScrollYPos = currentScrollYPos;

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

// ####################################################################
// ####################################################################
// -----------  Menu

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".navigation");
const menuCircle = document.querySelector(".menu-btn-circle");

menuBtn.addEventListener("click", () => {
  if (menuBtn.classList.contains("open")) {
    menuBtn.classList.replace("open", "closed");
    menuCircle.classList.replace("open", "closed");
    nav.classList.replace("open", "closed");
  } else if (menuBtn.classList.contains("closed")) {
    menuBtn.classList.replace("closed", "open");
    menuCircle.classList.replace("closed", "open");
    nav.classList.replace("closed", "open");
  }
});

// ####################################################################
// ####################################################################
// -----------  Projects

const projectImg = document.querySelectorAll(".project-image .gif");

function replaceExtension(e, mouseIsIn) {
  let src = e.target.getAttribute("src");

  if (mouseIsIn) {
    src = src.replace("jpg", "gif");
  } else {
    src = src.replace("gif", "jpg");
  }
  e.target.setAttribute("src", src);
}

projectImg.forEach(item => {
  item.addEventListener("mouseenter", e => replaceExtension(e, true));
  item.addEventListener("mouseleave", e => replaceExtension(e, false));
});
