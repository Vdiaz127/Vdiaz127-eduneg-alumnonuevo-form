"use client"
import React, { useState, useEffect } from "react";

const API_BASE_URL = "https://api.countrystatecity.in/v1";
const API_KEY = process.env.NEXT_PUBLIC_CSC_API_KEY;

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    // Obtener lista de países
    const fetchCountries = async () => {
      try {
        console.log("API KEY")
        console.log(API_KEY);
        const response = await fetch(`${API_BASE_URL}/countries`, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState(""); // Reset estados y ciudades
    setStates([]);
    setCities([]);

    if (countryCode) {
      try {
        const response = await fetch(`${API_BASE_URL}/countries/${countryCode}/states`, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
  };

  const handleStateChange = async (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setCities([]);

    if (stateCode) {
      try {
        const response = await fetch(`${API_BASE_URL}/countries/${selectedCountry}/states/${stateCode}/cities`, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

  return (
    
    <div>
      <label>
        País:
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Estado:
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!states.length}
        >
          <option value="">Selecciona un estado</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>
              {state.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Ciudad:
        <select disabled={!cities.length}>
          <option value="">Selecciona una ciudad</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LocationSelector;