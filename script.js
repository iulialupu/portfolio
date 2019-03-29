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

// slider
const projects = document.querySelectorAll(".project");

for (let i = 0; i < projects.length; i++) {
  projects[i].style.left = `${100 * i}vw`;
}

// ------------- PAGE SCROLL

const menuLinks = document.querySelectorAll(".navigation a");
let currentSection = "#home";
const sectionsList = [];
for (let i = 0; i < menuLinks.length; i++) {
  sectionsList.push(menuLinks[i].getAttribute("href"));
}

function addActiveClass() {
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].classList.remove("active");
  }
  document
    .querySelector(`.navigation a[href='${currentSection}']`)
    .classList.add("active");
}

// function smoothScrollOnClick(e) {
//     e.preventDefault();
//     window.scrollTo({
//       top: i * window.innerHeight,
//       left: 0,
//       behavior: "smooth"
//     });

//     currentSection = menuLinks[i];
//     console.log(currentSection);
//     addActiveClass();
//   }

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
  console.log(e);
  e.preventDefault();
  currentSection = e.target.getAttribute("href");
  console.log("ssonCL", currentSection);
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

// smooth scroll to section on scroll
// document.addEventListener("wheel", e => {
//   console.log(
//     e,
//     window.pageYOffset,
//     window.scrollY,
//     document.querySelector(currentSection).offsetTop
//   );
//   if (window.scrollY > document.querySelector(currentSection).offsetTop) {
//     console.log("scroll down");
//     // nextSection();

//     if (sectionsList.indexOf(currentSection) === sectionsList.length - 1) {
//       return;
//     }

//     const height =
//       document.querySelector(currentSection).offsetTop + window.innerHeight;
//     window.scrollTo({
//       top: height,
//       left: 0,
//       behavior: "smooth"
//     });

//     if (
//       window.scrollY ===
//       document.querySelector(currentSection).offsetTop + window.innerHeight
//     ) {
//       currentSection = sectionsList[sectionsList.indexOf(currentSection) + 1];
//       addActiveClass();
//       console.log("at next");
//     }
//   } else if (
//     window.scrollY < document.querySelector(currentSection).offsetTop
//   ) {
//     console.log("scroll up");
//     prevSection();

//     if (sectionsList.indexOf(currentSection) === 0) {
//       return;
//     }
//     const height =
//       document.querySelector(currentSection).offsetTop - window.innerHeight;
//     window.scrollTo({
//       top: height,
//       left: 0,
//       behavior: "smooth"
//     });

//     if (
//       window.scrollY ===
//       document.querySelector(currentSection).offsetTop - window.innerHeight
//     ) {
//       currentSection = sectionsList[sectionsList.indexOf(currentSection) - 1];
//       addActiveClass();
//       console.log("at prev");
//     }
//   } else {
//     return;
//   }
// });

const logText = document.getElementById("log-text");
const logText2 = document.getElementById("log-text2");
// document.querySelector(".page-content").addEventListener("wheel", e => {
//   e.preventDefault();

//   logText.innerHTML = `wheel:
//   ${e}
//   window.pageYOffset: ${window.pageYOffset};
//   window.scrollY: ${Math.round(window.scrollY)};
//   window.innerHeight: ${window.innerHeight};
//   offsetY: ${e.offsetY};
//   pageY: ${e.pageY};
//   clientY: ${e.clientY};
//   screenY: ${e.screenY};
//   pageY-screenY: ${e.pageY - e.screenY}
//   wheelDeltaY: ${e.wheelDeltaY};
//   -------------------------------
//   currentSection: ${currentSection};
//   (currentSection).offsetTop: ${
//     document.querySelector(currentSection).offsetTop
//   };
// `;
//   if (e.wheelDeltaY > 0) {
//     prevSection();
//     console.log("scroll up");
//   } else if (e.wheelDeltaY < 0) {
//     nextSection();
//     console.log("scroll down");
//   }

//   logText2.innerHTML = `wheel:
//   ${e}
//   window.pageYOffset: ${window.pageYOffset};
//   window.scrollY: ${Math.round(window.scrollY)};
//   window.innerHeight: ${window.innerHeight};
//   offsetY: ${e.offsetY};
//   pageY: ${e.pageY};
//   clientY: ${e.clientY};
//   screenY: ${e.screenY};
//   pageY-screenY: ${e.pageY - e.screenY}
//   wheelDeltaY: ${e.wheelDeltaY};
//   -------------------------------
//   currentSection: ${currentSection};
//   (currentSection).offsetTop: ${
//     document.querySelector(currentSection).offsetTop
//   };
// `;
// });

let prevScrollPos = null;
let currentScrollPos = null;
let isScrolling = false;

document.addEventListener("scroll", e => {
  console.log("| current scroll", currentScrollPos);
  console.log("prev scroll", prevScrollPos);
  console.log(isScrolling);
  currentScrollPos = Math.round(window.scrollY);

  if (isScrolling) {
    // isScrolling = true
    if (currentScrollPos === document.querySelector(currentSection).offsetTop) {
      isScrolling = false;
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
});

// document.addEventListener("scroll", e => {
//   currentScrollPos = Math.round(window.scrollY);

//   //   logText.innerHTML = `scroll:
//   //   ${e}
//   //   window.scrollY: ${Math.round(window.scrollY)};
//   //   window.innerHeight: ${window.innerHeight};
//   //   previous Scroll: ${prevScollPos};
//   //   -------------------------------
//   //   currentSection: ${currentSection};
//   //   (currentSection).offsetTop: ${
//   //     document.querySelector(currentSection).offsetTop
//   //   };
//   // `;

//   if (!isScrolling) {
//     e.preventDefault();
//     // scroll down to next section
//     if (currentScrollPos > document.querySelector(currentSection).offsetTop) {
//       const height =
//         document.querySelector(currentSection).offsetTop + window.innerHeight;
//       window.scrollTo({
//         top: height,
//         left: 0,
//         behavior: "smooth"
//       });
//       // isScrolling = true;
//       console.log("scrolling down");
//       // scroll up to prev section
//     } else if (
//       currentScrollPos < document.querySelector(currentSection).offsetTop
//     ) {
//       const height =
//         document.querySelector(currentSection).offsetTop - window.innerHeight;
//       window.scrollTo({
//         top: height,
//         left: 0,
//         behavior: "smooth"
//       });
//       // isScrolling = true;
//       console.log("scrolling up");
//       // Scroll stop and add active class;
//     } else {
//       for (let menuLink in menuLinks) {
//         if ((document.querySelector(menuLink).offsetTop = currentScrollPos)) {
//           currentSection = menuLink;
//         }
//       }
//       console.log("Hey! current section is ", currentSection);
//       addActiveClass();
//       // isScrolling = false;
//     }
//   }
//   prevScollPos = currentScrollPos;
// });
