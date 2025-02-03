import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryCardShimmer from "./CountryCardShimmer";
// import CountriesData from "../data";

export default function CountriesContainer({ query }) {
  const [CountriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  if (CountriesData.length === 0) {
    return <CountryCardShimmer />;
  }
  return (
    <div className="countries-container">
      {CountriesData.filter((country) =>
        country.name.common.toLowerCase().includes(query)  ||  country.region.toLowerCase().includes(query)
      ).map((country) => {
        return (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
            data={country}
          />
        );
      })}
    </div>
  );
}
