import './App.css';
import Pagination from './Pagination';
import Card from './Card';

import { useState, useEffect } from 'react'

function App() {

  const [countries, setCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage, setCountriesPerPage] = useState(10)

  const firstCountryIndex = (currentPage - 1) * countriesPerPage
  const lastCountryIndex = currentPage * countriesPerPage
  const currentCountries = countries.slice(firstCountryIndex, lastCountryIndex)
  const allPages = Math.ceil(countries.length / countriesPerPage )
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    setCountries(data)
    console.log(countries)
  }

  useEffect(() => {
    getCountries()
  }, [])


  return (
    <div className="main">
      <h1>Hello and welcome to my countries!</h1>


      <Pagination
        pages={allPages}
        setCurrentPage={setCurrentPage}
        countriesPerPage={countriesPerPage}
        setCountriesPerPage={setCountriesPerPage}
        countries={countries}
      />

      <div className="grid">
        {
          currentCountries.map((country) => (
            <Card 
              key={parseInt(country.ccn3)} 
              title={country.name.common}
              flag={country.flags.svg}
              capital={country.capital}
              cca3={country.cca3}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
