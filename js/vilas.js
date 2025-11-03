// Fetch and display villas from JSON
async function loadVillas() {
  try {
    const response = await fetch("./../js/vilas.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayVillas(data);
    console.log(data); // Check if data is correctly loaded
    // Proceed with rendering villas
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

// Display villas based on filter
function displayVillas(villas) {
  const villaList = document.getElementById("villa-list");
  villaList.innerHTML = "";

  villas.forEach((villa) => {
    const villaCard = `
  <div class="col-md-4 mb-4">
    <div class="room-card">
      <img src="${villa.images[0]}" class="room-card-img" alt="${villa.name}" />
      <div class="room-card-body">
        <h5 class="room-card-title">${villa.name}</h5>
        <p class="room-card-text">${villa.description}</p>
        <div class="room-card-footer">
          <hr />
          <p>
            <i class="bi bi-person"></i> ${villa.guests} Guest
            <i class="bi bi-house"></i> ${villa.beds} Bed
            <i class="bi bi-droplet"></i> ${villa.baths} Bath
          </p>
          <hr />
          <p class="room-price">${villa.price}</p>
          <a href="vila-details.html?id=${villa.id}" class="btn btn-room-details">View Details</a>
        </div>
      </div>
    </div>
  </div>
`;

    villaList.insertAdjacentHTML("beforeend", villaCard);
  });
}
// Filter villas based on type
function filterVillas(type) {
  fetch("./../js/vilas.json")
    .then((response) => response.json())
    .then((villas) => {
      if (type === "All") {
        displayVillas(villas);
      } else {
        const filteredVillas = villas.filter((villa) => villa.type === type);
        displayVillas(filteredVillas);
      }

      // Update active button
      updateActiveButton(type);
    });
}

function updateActiveButton(activeType) {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    if (
      button.textContent.trim() === activeType ||
      (activeType === "All" && button.textContent.trim() === "All")
    ) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Initialize the villa list on page load
document.addEventListener("DOMContentLoaded", loadVillas);
