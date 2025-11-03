const countdown = () => {
  const countDate = new Date("DEC 5, 2024 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
};

setInterval(countdown, 1000);

function sendMail() {
  var email = document.getElementById("email").value;

  // Extract the name part before the '@' symbol and remove any numbers
  var name = email.substring(0, email.indexOf("@")).replace(/[0-9]/g, "");

  var params = {
    name: name,
    email: email,
  };
  emailjs
    .send("service_ub8316i", "template_h9zhv6x", params)
    .then(function (res) {
      alert("U regjistruat me sukses!");
      window.location.reload();
    });

  console.log(params);
}
