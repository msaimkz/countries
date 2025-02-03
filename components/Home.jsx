import Search from "./Search";
import Select from "./Select";
import CountriesContainer from "./CountriesContainer";
import {useState } from "react";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
      const [query , setQuery] = useState('');
      const [isDark] = useTheme();
    
  return (
    <main className={isDark ? 'dark' : ''}>
        <div className="search-filter-container">
          <Search setQuery={setQuery} />
          <Select setQuery={setQuery} />
        </div>
        <CountriesContainer query={query} />
      </main>
  )
}
