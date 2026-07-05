const urlParams = new URLSearchParams(window.location.search);
const villaId = urlParams.get("id");

function desc(villa) {
  return window.currentLang === "sq" && villa.description_sq ? villa.description_sq : villa.description;
}

function g(key) {
  return typeof window.t === "function" ? window.t(key) : key;
}

async function loadVillaDetails() {
  try {
    const response = await fetch("../../js/vilas.json");
    const villas = await response.json();
    const villa = villas.find((v) => v.id === parseInt(villaId));

    if (villa) {
      displayVillaDetails(villa);
      const similarVillas = villas.filter(
        (v) => v.type === villa.type && v.id !== villa.id
      );
      displaySimilarVillas(similarVillas);
    } else {
      document.getElementById("villa-info").innerHTML = g("villa-not-found");
    }
  } catch (error) {
    console.error("Error fetching villa details:", error);
  }
}

function displaySimilarVillas(similarVillas) {
  const similarRoomsContainer = document.getElementById("similar-rooms");
  const shuffledVillas = similarVillas.sort(() => Math.random() - 0.5);
  const selectedVillas = shuffledVillas.slice(0, 3);

  selectedVillas.forEach((villa) => {
    const guestLabel = villa.guests > 1 ? g("guests") : g("guest");
    const bedLabel = villa.beds > 1 ? g("beds") : g("bed");
    const bathLabel = villa.baths > 1 ? g("baths") : g("bath");

    const villaCard = document.createElement("div");
    villaCard.className = "villa-card";
    villaCard.innerHTML = `
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
    `;
    similarRoomsContainer.appendChild(villaCard);
  });
}

function displayVillaDetails(villa) {
  const imageContainer = document.getElementById("carousel-images");
  imageContainer.innerHTML = "";

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
  const guestLabel = villa.guests > 1 ? g("guests") : g("guest");
  const bedLabel = villa.beds > 1 ? g("beds") : g("bed");
  const bathLabel = villa.baths > 1 ? g("baths") : g("bath");

  detailsContainer.innerHTML = `
  <div class="p">
  <div class="parent">
    <div class="villa-details-container">
      <div class="accommodation-info">
        <h1 id="villa-name">${villa.name}</h1>
        <div class="details">
          <span><i class="fas fa-ruler-combined"></i> 44m²</span>
          <span><i class="fas fa-user-friends"></i> ${villa.guests} ${guestLabel}</span>
          <span><i class="fas fa-bed"></i> ${villa.beds} ${bedLabel}</span>
          <span><i class="fas fa-bath"></i> ${villa.baths} ${bathLabel}</span>
        </div>
      </div>
      <div class="price-box">
        <p>${villa.price}</p>
      </div>
    </div>
      <div class="description"> 
      <h2 class="h2-description">${g("description-title")}</h2>
      ${desc(villa)}
      </div>
<div class="room-amenities">
    <h3>${g("amenities-title")}</h3>
    <div class="amenities-grid">
        <div class="amenity">
            <i class="fas fa-parking"></i>
            <span>${g("amenity-parking")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-baby-carriage"></i>
            <span>${g("amenity-baby-bed")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wind"></i>
            <span>${g("amenity-washing")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wifi"></i>
            <span>${g("amenity-wifi")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-wind"></i>
            <span>${g("amenity-ac")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-ice-cream"></i>
            <span>${g("amenity-fridge")}</span>
        </div>
         <div class="amenity">
            <i class="fas fa-tv"></i>
            <span>${g("amenity-tv")}</span>
        </div>
        <div class="amenity">
            <i class="fas fa-concierge-bell"></i>
            <span>${g("amenity-service")}</span>
        </div>
    </div>
</div>
</div>

<div class="booking-form">
    <h3>${g("book-title")}</h3>
    <form action="">
        <div class="form-group">
            <label for="name">${g("book-name")}</label>
            <input type="text" id="name" placeholder="${g("book-name")} *" required>
        </div>
        <div class="form-group">
            <label for="surname">${g("book-surname")}</label>
            <input type="text" id="surname" placeholder="${g("book-surname")} *" required>
        </div>
        <div class="form-group">
            <label for="phone">${g("book-phone")}</label>
            <input type="tel" id="phone" placeholder="${g("book-phone")}" required>
        </div>
        <div class="form-group">
            <label for="email">${g("book-email")}</label>
            <input type="email" id="email" placeholder="${g("book-email")} *" required>
        </div>
        <button onclick="sendToWhatsapp()" type="submit" class="submit-btn">${g("book-btn")}</button>
    </form>
</div>
 </div>
  `;
}

loadVillaDetails();

function sendToWhatsapp() {
  let number = "38345306260";
  let name = document.getElementById("name")?.value || "";
  let surname = document.getElementById("surname")?.value || "";
  let phone = document.getElementById("phone")?.value || "";
  let email = document.getElementById("email")?.value || "";
  let room = document.getElementById("villa-name")?.textContent || "N/A";

  if (!name || !surname || !phone || !email) {
    alert(g("error-fill"));
    return;
  }

  let message =
    `Pershendetje, jam ${name} ${surname}\n` +
    `dhe po interesohem per villen: ${room}\n` +
    "Kontakti im:\n" +
    `Phone: ${phone}\n` +
    `Email: ${email}`;

  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank").focus();
}
