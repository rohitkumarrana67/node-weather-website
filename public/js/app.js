const forecastForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#errorMessage");
const place = document.querySelector("#place");
const temperature = document.querySelector("#temperature");
const summary = document.querySelector("#summary");
const icon = document.querySelector("#icon");
const precipitation = document.querySelector("#precipitation");

forecastForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = "Loading...";
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          var skycons = new Skycons({ color: "#2222222" });
          skycons.set("icon", data.forecastData.icon);
          skycons.play();
          place.style.display = "block";
          summary.style.display = "block";
          icon.style.display = "block";
          message1.textContent = "";
          place.textContent = data.place;
          summary.textContent = data.forecastData.summary;
          precipitation.textContent = data.forecastData.precip;
          temperature.textContent = (
            (data.forecastData.temperature - 32) *
            (5 / 9)
          ).toPrecision(4);
        }
      });
    }
  );
});
