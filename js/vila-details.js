// Get villa ID from URL
const urlParams = new URLSearchParams(window.location.search);
const villaId = urlParams.get("id");

// Fetch villa data
async function loadVillaDetails() {
  try {
    const response = await fetch("./../js/vilas.json"); // Update the path if needed
    const villas = await response.json();
    const villa = villas.find((v) => v.id === parseInt(villaId));

    if (villa) {
      displayVillaDetails(villa);

      // Filter similar villas of the same type
      const similarVillas = villas.filter(
        (v) => v.type === villa.type && v.id !== villa.id
      );
      displaySimilarVillas(similarVillas); // Display similar villas
    } else {
      document.getElementById("villa-info").innerHTML = "Villa not found.";
    }
  } catch (error) {
    console.error("Error fetching villa details:", error);
  }
}

function displaySimilarVillas(similarVillas) {
  const similarRoomsContainer = document.getElementById("similar-rooms"); // Make sure this container exists in HTML

  // Shuffle the array of similar villas to get a random selection
  const shuffledVillas = similarVillas.sort(() => Math.random() - 0.5);

  // Take only the first 3 villas from the shuffled list
  const selectedVillas = shuffledVillas.slice(0, 3);

  selectedVillas.forEach((villa) => {
    const villaCard = document.createElement("div");
    villaCard.className = "villa-card";

    villaCard.innerHTML = `
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
    `;

    similarRoomsContainer.appendChild(villaCard);
  });
}

// Display villa details and images
function displayVillaDetails(villa) {
  const imageContainer = document.getElementById("carousel-images");
  imageContainer.innerHTML = ""; // Clear previous images if any

  villa.images.forEach((imgSrc) => {
    const cardElement = document.createElement("div");
    cardElement.className = "cardd";

    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.alt = villa.name;

    cardElement.appendChild(imgElement);
    imageContainer.appendChild(cardElement);
  });

  const detailsContainer = document.getElementById("villa-info");

  detailsContainer.innerHTML = `
  <div class="p">
  <div class="parent">
    <div class="villa-details-container">
      <div class="accommodation-info">
        <h1 id="villa-name">${villa.name}</h1>
        <div class="details">
          <span><i class="fas fa-ruler-combined"></i> 44m²</span> <!-- Placeholder for room size -->
          <span><i class="fas fa-user-friends"></i> ${villa.guests} Guest${
    villa.guests > 1 ? "s" : ""
  }</span>
          <span><i class="fas fa-bed"></i> ${villa.beds} Bed${
    villa.beds > 1 ? "s" : ""
  }</span>
          <span><i class="fas fa-bath"></i> ${villa.baths} Bath${
    villa.baths > 1 ? "s" : ""
  }</span>
        </div>
      </div>
      <div class="price-box">
        <p>${villa.price}</p>
      </div>
    
    </div>
      <div class="description"> 
      <h2 class="h2-description">Description</h2>
      ${villa.description}
      </div>
<div class="room-amenities">
    <h3>Room Amenities</h3>
    <div class="amenities-grid">
        <div class="amenity">
            <i class="fas fa-parking"></i>
            <span>Free Private Parking</span>
        </div>
        <div class="amenity">
            <i class="fas fa-baby-carriage"></i>
            <span>Extra Baby Bed</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wind"></i>
            <span>Washing Machine</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wifi"></i>
            <span>Free Wi Fi</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wind"></i>
            <span>Air Conditioned</span>
        </div>
        <div class="amenity">
            <i class="fas fa-ice-cream"></i>
            <span>In-Room Refrigerator</span>
        </div>
         <div class="amenity">
            <i class="fas fa-tv"></i>
            <span>Flat Screen TV</span>
        </div>
        <div class="amenity">
            <i class="fas fa-concierge-bell"></i>
            <span>Room Service</span>
        </div>
    </div>
</div>
</div>

<div class="booking-form">
    <h3>Book This Vila</h3>
   
    <form action="">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Your Name *" required>
        </div>
        <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" id="surname" placeholder="Your Surname *" required>
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Your Phone" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Your Email *" required>
        </div>
        <button onclick="sendToWhatsapp()"  type="submit" class="submit-btn">Book Your Stay</button>
    </form>
</div>
 </div>
  `;
}

loadVillaDetails();

function sendToWhatsapp() {
  let number = "38345306260"; // WhatsApp URL expects the number without "+"

  // Retrieve input values
  let name = document.getElementById("name")?.value || "";
  let surname = document.getElementById("surname")?.value || "";
  let phone = document.getElementById("phone")?.value || "";
  let email = document.getElementById("email")?.value || "";
  let room = document.getElementById("villa-name")?.textContent || "N/A"; // Correctly fetch villa name

  // Check if required fields are empty
  if (!name || !surname || !phone || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  // Construct the message
  let message =
    `Pershendetje, jam ${name} ${surname}\n` +
    `dhe po interesohem per villen: ${room}\n` +
    "Kontakti im:\n" +
    `Phone: ${phone}\n` +
    `Email: ${email}`;

  // Encode the entire URL, including "https://wa.me/"
  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp link in a new tab
  window.open(url, "_blank").focus();
  console.log(message);
}
