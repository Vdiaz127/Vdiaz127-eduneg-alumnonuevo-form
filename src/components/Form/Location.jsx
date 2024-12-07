"use client";

import React, { useState, useEffect } from "react";
import SelectInput from "./SelectInput";

const API_BASE_URL = "https://api.countrystatecity.in/v1";
const API_KEY = process.env.NEXT_PUBLIC_CSC_API_KEY;

export default function LocationSelector({ handleChangeInput }) {
  const [countriesMap, setCountriesMap] = useState({});
  const [statesMap, setStatesMap] = useState({});
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/countries`, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        const countryMap = {};
        data.forEach((country) => {
          countryMap[country.name] = country.iso2;
        });
        setCountriesMap(countryMap);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/countries/${countryCode}/states`,
        { headers: { "X-CSCAPI-KEY": API_KEY } }
      );
      const data = await response.json();
      const stateMap = {};
      data.forEach((state) => {
        stateMap[state.name] = state.iso2;
      });
      setStatesMap(stateMap);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
        { headers: { "X-CSCAPI-KEY": API_KEY } }
      );
      const data = await response.json();
      setCities(data.map((city) => ({ value: city.name, label: city.name })));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);

    const countryCode = countriesMap[countryName];
    if (countryCode) fetchStates(countryCode);

    handleChangeInput("Pais", countryName ? "valid" : "invalid", countryName);
  };

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedCity("");
    setCities([]);

    const stateCode = statesMap[stateName];
    const countryCode = countriesMap[selectedCountry];
    if (countryCode && stateCode) fetchCities(countryCode, stateCode);

    handleChangeInput("Estado", stateName ? "valid" : "invalid", stateName);
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);

    handleChangeInput("Ciudad", cityName ? "valid" : "invalid", cityName);
  };

  return (
    <div>
      <SelectInput
        labelFor="Pais"
        options={Object.keys(countriesMap).map((name) => ({ value: name, label: name }))}
        handleChangeInput={(name, status, value) => handleCountryChange(value)}
      />
      <SelectInput
        labelFor="Estado"
        options={Object.keys(statesMap).map((name) => ({ value: name, label: name }))}
        handleChangeInput={(name, status, value) => handleStateChange(value)}
        disabled={!Object.keys(statesMap).length}
      />
      <SelectInput
        labelFor="Ciudad"
        options={cities}
        handleChangeInput={(name, status, value) => handleCityChange(value)}
        disabled={!cities.length}
      />
    </div>
  );
}
