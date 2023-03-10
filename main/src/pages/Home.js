import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Api from "../Api";
import CardCountry from "../components/CardCountry";
import { ThemeContext } from "../ThemeContext";
import "./Home.css";

export default function Home() {
  const [country, setCountry] = useState([]);
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);
  const ctx = useContext(ThemeContext);
  useEffect(() => {
    Api("https://restcountries.com/v3.1/all").then((data) => {
      setCountry(data);
      setInfo(data);
    });
  }, []);

  useEffect(() => {
    const Result = country?.map((item, index) => {
      return (
        <CardCountry
          key={index}
          imgSrc={item.flags.png}
          title={item.name.common}
          population={item.population}
          region={item.region}
          capital={item.capital}
          name={item.name.common}
        />
      );
    });
    setResult(Result);
  }, [country]);

  const selectCountryHandler = (e) => {
    const filterByRegion = country.filter((country) => {
      if (e.target.value === "All") {
        return true;
      } else {
        return country.region === e.target.value;
      }
    });

    const selectResult = filterByRegion.map((item, index) => {
      return (
        <CardCountry
          key={index}
          imgSrc={item.flags.png}
          title={item.name.common}
          population={item.population}
          region={item.region}
          capital={item.capital}
          name={item.name.common}
        />
      );
    });

    setInfo(filterByRegion);
    setResult(selectResult);
  };

  const liveSearchHandler = (text) => {
    const currentTerm = text.target.value.trim();

    const filterByName = info.filter((item) => {
      if (currentTerm === "") {
        return true;
      } else {
        return item.name.common.includes(currentTerm);
      }
    });
    const searchResult = filterByName.map((item, index) => {
      return (
        <CardCountry
          key={index}
          imgSrc={item.flags.png}
          title={item.name.common}
          population={item.population}
          region={item.region}
          capital={item.capital}
          name={item.name.common}
        />
      );
    });
    setResult(searchResult);
  };
  return (
    <>
      <section className="d-flex justify-content-center justify-content-md-between mt-4 flex-wrap">
        <form className="searchForm">
          <button type="submit" style={{height:50}} className={`px-3 border-0 ${ctx.theme ? " element-dark-mode" : ""}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="magnify" />
          </button>
          <input
            style={{height:50}}
            type="search"
            className={`border-0 ${ctx.theme ? " element-dark-mode" : ""}`}
            placeholder="search for a country..."
            onChange={liveSearchHandler}
          />
        </form>
        <select
          className={`p-3 border-0 filter ${ctx.theme ? " element-dark-mode" : ""}`}
          onChange={selectCountryHandler}
        >
          <option value="All">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </section>
      <section className="d-flex justify-content-center justify-content-sm-between mt-4 flex-wrap">
        {result}
      </section>
    </>
  );
}
