import Notiflix from "notiflix";

export default class coutriesToFetch {
  constructor() {
    this.countryToFind = "";
  }

  fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`
    )
      .then((r) => {
        if (!r.ok) {
          Notiflix.Notify.failure("Oops, there is no country with that name");
          throw new Error(response.status);
        }

        return r.json();
      })
      .then((data) => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
        }
        return data;
      });
  }

  get name() {
    return this.countryToFind;
  }

  set name(newSearchName) {
    this.countryToFind = newSearchName;
  }
}
