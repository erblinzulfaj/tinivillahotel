function desc(villa) {
  return window.currentLang === "sq" && villa.description_sq ? villa.description_sq : villa.description;
}

function g(key) {
  return typeof window.t === "function" ? window.t(key) : key;
}

async function loadVillas() {
  try {
    const response = await fetch("../../js/vilas.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayVillas(data);
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

function displayVillas(villas) {
  const villaList = document.getElementById("villa-list");
  villaList.innerHTML = "";

  villas.forEach((villa) => {
    const guestLabel = villa.guests > 1 ? g("guests") : g("guest");
    const bedLabel = villa.beds > 1 ? g("beds") : g("bed");
    const bathLabel = villa.baths > 1 ? g("baths") : g("bath");

    const villaCard = `
  <div class="col-md-4 mb-4">
    <div class="room-card">
      <img src="${villa.images[0]}" class="room-card-img" alt="${villa.name}" />
      <div class="room-card-body">
        <h5 class="room-card-title">${villa.name}</h5>
        <p class="room-card-text">${desc(villa)}</p>
        <div class="room-card-footer">
          <hr />
          <p>
            <i class="bi bi-person"></i> ${villa.guests} ${guestLabel}
            <i class="bi bi-house"></i> ${villa.beds} ${bedLabel}
            <i class="bi bi-droplet"></i> ${villa.baths} ${bathLabel}
          </p>
          <hr />
          <p class="room-price">${villa.price}</p>
          <a href="../vila-details/?id=${villa.id}" class="btn btn-room-details">${g("view-details")}</a>
        </div>
      </div>
    </div>
  </div>
`;

    villaList.insertAdjacentHTML("beforeend", villaCard);
  });
}

function filterVillas(type) {
  fetch("../../js/vilas.json")
    .then((response) => response.json())
    .then((villas) => {
      if (type === "All") {
        displayVillas(villas);
      } else {
        const filteredVillas = villas.filter((villa) => villa.type === type);
        displayVillas(filteredVillas);
      }
      updateActiveButton(type);
    });
}

function updateActiveButton(activeType) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((button) => {
    const btnType = button.getAttribute("data-type");
    button.classList.toggle("active", btnType === activeType);
  });
}

document.addEventListener("DOMContentLoaded", loadVillas);
