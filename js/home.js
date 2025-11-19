function toggleMenu() {
  const navbarUl = document.querySelector(".navbar-ul");
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger");

  navbarUl.classList.toggle("show");

  // Toggle expanded class for nav height change
  if (navbarUl.classList.contains("show")) {
    nav.classList.add("expanded");
    hamburger.classList.add("open"); // Add open class to change hamburger to 'X'
  } else {
    nav.classList.remove("expanded");
    hamburger.classList.remove("open"); // Remove open class to revert to hamburger
  }
}

document.addEventListener("click", (e) => {
  const nav = document.querySelector(".nav");
  const navbarUl = document.querySelector(".navbar-ul");
  const hamburger = document.querySelector(".hamburger");

  if (
    navbarUl.classList.contains("show") &&
    !nav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navbarUl.classList.remove("show");
    nav.classList.remove("expanded");
    hamburger.classList.remove("open"); // Reset hamburger icon when clicking outside
  }
});

// Content Data
const contentData = {
  1: {
    h3: "Enjoy your time in our Villas",
    h1: "WELCOME TO TINI VILLA HOTEL",
    backgroundImage: "./../images/bg1.jpg",
  },
  2: {
    h3: "Discover the elegance",
    h1: "UNFORGETTABLE EXPERIENCE AWAITS",
    backgroundImage: "./../images/bg2.jpg",
  },
  3: {
    h3: "Your perfect getaway",
    h1: "RELAX IN LUXURY AND COMFORT",
    backgroundImage: "./../images/bg3.jpg",
  },
};

let currentIndex = 1;

function updateContent() {
  const selectedContent = contentData[currentIndex];

  // Update the text content
  document.getElementById("message-h3").textContent = selectedContent.h3;
  document.getElementById("message-h1").textContent = selectedContent.h1;

  document.querySelector(
    ".firstpage"
  ).style.backgroundImage = `url('${selectedContent.backgroundImage}')`;

  document.querySelectorAll(".nav-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === currentIndex);
  });
}

function changeContent(index) {
  currentIndex = index;
  updateContent();
}

function nextContent() {
  currentIndex =
    currentIndex === Object.keys(contentData).length ? 1 : currentIndex + 1;
  updateContent();
}

function prevContent() {
  currentIndex =
    currentIndex === 1 ? Object.keys(contentData).length : currentIndex - 1;
  updateContent();
}

document.addEventListener("DOMContentLoaded", updateContent);
// Add this script to your existing home.js file
window.onscroll = function () {
  const navbar = document.querySelector(".nav");
  const sticky = navbar.offsetTop; // Get the offset position of the navbar

  if (window.pageYOffset > sticky) {
    navbar.classList.add("fixed"); // Add class to navbar when you reach its scroll position
  } else {
    navbar.classList.remove("fixed"); // Remove the class when you leave the scroll position
  }
};

const scrollContainer = document.querySelector(".photos");
const photos = scrollContainer.querySelectorAll(".photo");
const photoCount = photos.length;
const photoWidth = photos[0].offsetWidth;

let index = 0;
// Display cookie banner if consent is not set and the user has neither accepted nor declined cookies
window.onload = function () {
  if (!getCookie("cookies_accepted") && !getCookie("cookies_declined")) {
    document.getElementById("cookie-banner").style.display = "block";
  }
};

// Handle Accept button
document
  .getElementById("accept-cookies")
  .addEventListener("click", function () {
    setCookie("cookies_accepted", "true", 365); // Consent valid for 1 year
    document.getElementById("cookie-banner").style.display = "none";
  });

// Handle Decline (X) button
document
  .getElementById("decline-cookies")
  .addEventListener("click", function () {
    // Optionally, set a cookie to indicate that the user declined cookies
    setCookie("cookies_declined", "true", 365); // Consent valid for 1 year
    document.getElementById("cookie-banner").style.display = "none";
  });

// Set, Get, and Delete Cookies functions
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
