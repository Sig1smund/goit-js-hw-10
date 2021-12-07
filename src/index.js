import coutriesToFetch from "./fetcher";
import { debounce } from "lodash";
import "./css/styles.css";

const DEBOUNCE_DELAY = 300;
const inputForm = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const countriesFetcher = new coutriesToFetch();
let country = "";

inputForm.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  country = event.target.value.trim();
  countryList.innerHTML = "";
  countryInfo.innerHTML = "";

  if (country !== "") {
    countriesFetcher.fetchCountries(country).then((data) => {
      createMarkup(data);
    });
  }
}

function getCountryList(data) {
  const markup = data
    .map((item) => {
      return `<li class="country-list-item">
        <img
          class="flag-list"
          src="${item.flags.svg}"
          alt="flag"
          width='250'
        />
        <h2 class="list-item-h2">${item.name.official}</h2>
      </li>`;
    })
    .join("");

  countryList.insertAdjacentHTML("beforeend", markup);
}

function addCountryInfo(data) {
  const markup = data
    .map((item) => {
      return `<div class="flag-country-block">
        <img
          class="flag"
          src="${item.flags.svg}"
          alt="flag"
          width='250'
        />
        <h1>${item.name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <p class="info-value">${item.capital}</p>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <p class="info-value">${item.population}</p
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <p class="info-value">${Object.values(item.languages)}</p>
        </li>
      </ul>`;
    })
    .join("");

  countryInfo.insertAdjacentHTML("beforeend", markup);
}

function createMarkup(data) {
  clearCountryInfo();
  clearCountryList();

  if (data.length >= 2 && data.length < 10) {
    getCountryList(data);
    return;
  }
  if (data.length === 1) {
    addCountryInfo(data);
    return;
  }
}

function clearCountryList() {
  countryList.innerHTML = "";
}

function clearCountryInfo() {
  countryInfo.innerHTML = "";
}
