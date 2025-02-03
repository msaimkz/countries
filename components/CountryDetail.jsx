import React, {useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetail() {
  const params = useParams();
  const countryName = params.country;

  const { state } = useLocation();

  const [countryData, setCountryData] = useState(null);
  const [NotFound, setNotFound] = useState(false);
  const [isDark] = useTheme();

  function updateCountryData(data) {
    console.log(data);
    setCountryData({
      name: data.name.common || data.name,
      flag: data.flags.svg,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      curriences: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      capital: data.capital,
      languages: Object.values(data.languages || {}).join(", "),
      tld: data.tld.join(", "),
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, [countryName]);

  if (NotFound) {
    return (
      <div className="not-found">
        <h1>Country Not Found</h1>
      </div>
    );
  }

  return (
    countryData && (
      <main className={isDark ? "dark" : ""}>
        <div className="country-details-container">
          <Link className="back-button" to="/">
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </Link>
          
          {countryData === null ? (
            <CountryDetailShimmer />
          ) : (
            <div className="country-details">
              <img src={countryData.flag} alt={countryData.name + " Flag"} />
              <div className="details-text-container">
                <h1>{countryData.name}</h1>
                <div className="details-text">
                  <p>
                    <b>Native Name: </b>
                    <span className="native-name">
                      {countryData.nativeName || countryData.name}
                    </span>
                  </p>
                  <p>
                    <b>Population: </b>
                    <span className="population">
                      {countryData.population.toLocaleString("en-PK")}
                    </span>
                  </p>
                  <p>
                    <b>Region: </b>
                    <span className="region">{countryData.region}</span>
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    <span className="sub-region">{countryData.subRegion}</span>
                  </p>
                  <p>
                    <b>Capital: </b>
                    <span className="capital">
                      {countryData.capital?.join(", ")}
                    </span>
                  </p>
                  <p>
                    <b>Top Level Domain: </b>
                    <span className="top-level-domain">{countryData.tld}</span>
                  </p>
                  <p>
                    <b>Currencies: </b>
                    <span className="currencies">{countryData.curriences}</span>
                  </p>
                  <p>
                    <b>Languages: </b>
                    <span className="languages">{countryData.languages}</span>
                  </p>
                </div>
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((country) => (
                    <Link key={country} to={`/${country}`}>
                      {country}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    )
  );
}
