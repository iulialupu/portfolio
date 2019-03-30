// -------------- Bubles from the Home section
const container = document.querySelector("#home");
const circlesContainer = document.querySelector(".circles-container");
const H = window.innerHeight;
const W = window.innerWidth;
let circlesPosition = [];

// generate a number from 0 to range
function getRandomNumber(range) {
  return Math.floor(Math.random() * range);
}

function generateRandomElem(num) {
  let circles = "";

  for (let i = 0; i < num; i++) {
    const objPosition = {
      top: getRandomNumber(H),
      left: getRandomNumber(W),
      WH: getRandomNumber(270) + 10
    };
    /* object width and height, from 10px to 310px 👆 */

    circles =
      circles +
      `<div class='dot' style=' top: ${objPosition.top}px; left: ${
        objPosition.left
      }px ; width: ${objPosition.WH}px; height:  ${objPosition.WH}px;' ></div>`;
    circlesPosition.push(objPosition);
  }
  circlesContainer.innerHTML = circles;
}

generateRandomElem(20);

container.addEventListener("mousemove", e => handleMouseMove(e));

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

// ------------- PAGE SCROLL

const menuLinks = document.querySelectorAll(".navigation a");
let currentSection = "#home";
const sectionsList = [];
for (let i = 0; i < menuLinks.length; i++) {
  sectionsList.push(menuLinks[i].getAttribute("href"));
}
let prevScrollPos = null;
let currentScrollPos = null;
let isScrolling = false;

function addActiveClass() {
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].classList.remove("active");
  }
  document
    .querySelector(`.navigation a[href='${currentSection}']`)
    .classList.add("active");
}

function smoothScroll() {
  isScrolling = true;
  const height = document.querySelector(currentSection).offsetTop;
  window.scrollTo({
    top: height,
    left: 0,
    behavior: "smooth"
  });
  addActiveClass();
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
addActiveClass();

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

// smooth scroll to section on scroll event
document.addEventListener("scroll", e => {
  currentScrollPos = Math.round(window.scrollY);

  if (isScrolling) {
    // isScrolling = true
    if (currentScrollPos === document.querySelector(currentSection).offsetTop) {
      isScrolling = false;
      // animate section when it is for the first time in view
      document.querySelector(currentSection).classList.add("in-view");
    } else {
      return;
    }

    // isScrolling = false
  } else {
    if (currentScrollPos > prevScrollPos) {
      //scroll down
      nextSection();
    } else if (currentScrollPos < prevScrollPos) {
      //scroll up
      prevSection();
    }
  }
  prevScrollPos = currentScrollPos;

  // change the color of active nav-link from pink to white when contacts section is in view
  // has nothing to do with the smooth scroll
  if (currentScrollPos === document.getElementById("contacts").offsetTop) {
    document
      .querySelector(".navigation a[href='#contacts']")
      .classList.add("contacts-active");
  }
  if (currentScrollPos < document.getElementById("contacts").offsetTop) {
    document
      .querySelector(".navigation a[href='#contacts']")
      .classList.remove("contacts-active");
  }
});
