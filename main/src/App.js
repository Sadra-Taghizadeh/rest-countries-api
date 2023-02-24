import React from "react";
import Header from "./components/Header";
import { useState } from "react";
import Countries from "./components/Countries";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import useFetch from "./components/useFetch";
import Country from "./components/Country";

function App() {
  const [inputField, setInputField] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const [filtra, setFilter] = useState("All");
  const { data } = useFetch("https://restcountries.com/v2/all");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
  };
  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearch(undefined);
    setInputField("");
  };
  const getCountryName = (code) => {
    let countryName;
    const country = data.filter((element) => {
      return element.alpha3Code === code;
    });
    countryName = country[0].name;
    return countryName;
  };
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Routes>
      <div className="App">
        <Header />

        <Route exact path="/">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="inputField">
                <input
                  type="search"
                  placeholder="Search for a country..."
                  value={inputField}
                  onChange={(e) => {
                    setInputField(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
                <i className="fas fa-search"></i>
              </div>
              <select id="region" name="region" onChange={handleSelect}>
                <option value="All" defaultValue>
                  All
                </option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </form>
          </div>
          <Countries
            filtra={filtra}
            input={search}
            numberWithCommas={numberWithCommas}
          />
        </Route>
        <Route
          path="/:countryName"
          element={
            <Country
              numberWithCommas={numberWithCommas}
              getCountryName={getCountryName}
            />
          }
        />
      </div>
    </Routes>
  );
}

export default App;
