import React, { useContext } from "react";
import "./CountryDetailShimmer.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function CountryDetailShimmer() {
  const [isDark] = useContext(ThemeContext);

  return (
    <div className="country-details">
      <div className="shimmer-card-img"></div>
      <div className="details-text-container">
        <div className="shimmer-card-name"></div>
        <div className="details-text">
          {Array.from({ length: 10 }).map((e, i) => {
            return <div key={i} className="shimmer-card-list"></div>;
          })}
        </div>
        <div className="border-countries">
          <b>Border Countries: </b>&nbsp;
          {Array.from({ length: 6 }).map((e, i) => {
            return <div key={i} className="shimmer-card-border"></div>;
          })}
        </div>
      </div>
    </div>
  );
}
