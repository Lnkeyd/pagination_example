import React from 'react'
import { useState, useEffect } from 'react'
import './Pagination.css'

const Pagination = ({ pages, setCurrentPage, countriesPerPage, setCountriesPerPage, countries }) => {
    
    const [currentNumber, setCurrentNumber] = useState(1)
    const pageNumbers = []

    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i)
    }
    
    const [currentNumbers, setCurrentNumbers] = useState([])

    useEffect(() => {        
        let tempPages = [...currentNumbers]

        let dots = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (currentNumber >= 1 && currentNumber <= 3) {
            tempPages = [1, 2, 3, 4, 5, dots, pageNumbers.length]
        } 
        // else if (currentNumber === 4) {
        //     const sliced = pageNumbers.slice(0, 5)
        //     tempPages = [...sliced, dots, pageNumbers.length]
        // } 
        else if (currentNumber > 3 && currentNumber < pageNumbers.length - 2) {
            const sliced1 = pageNumbers.slice(currentNumber - 2, currentNumber)
            const sliced2 = pageNumbers.slice(currentNumber, currentNumber + 1)
            tempPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumbers.length])
        } else if (currentNumber > pageNumbers.length - 3) {
            const sliced = pageNumbers.slice(pageNumbers.length - 5)
            tempPages = ([1, dotsLeft, ...sliced])
        }  else if (currentNumber === dots) {
            setCurrentNumber(currentNumbers[currentNumbers.length - 3] + 1)
        } else if (currentNumber === dotsLeft) {
            setCurrentNumber(currentNumbers[3] - 2)
        } else if (currentNumber === dotsRight) {
            setCurrentNumber(currentNumbers[3] + 2)
        }
        setCurrentNumbers(tempPages)
        setCurrentPage(currentNumber)
    }, [currentNumber, countriesPerPage])

    return (
        <>
            <div className='pagination'>
                <div className="pagination__prev" onClick={() => setCurrentNumber(currentNumber === 1 ? currentNumber : currentNumber - 1)}>prev</div>
                {
                    currentNumbers.map((number, i) => (
                        <div className={`${currentNumber === number ? "pagination__active pagination__number" : "pagination__number"}`} key={i} onClick={() => setCurrentNumber(number)}>
                            {number}
                        </div>
                    ))
                }
                <div className="pagination__next" onClick={() => setCurrentNumber(currentNumber === pageNumbers.length ? currentNumber : currentNumber + 1)}>next</div>
            </div>

            <div className="per_page">
                <div className={`${countriesPerPage === 5 ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(5)} >5 per page</div>
                <div className={`${countriesPerPage === 10 ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(10)} >10 per page</div>
                <div className={`${countriesPerPage === 25 ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(25)} >25 per page</div>
                <div className={`${countriesPerPage === 50 ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(50)} >50 per page</div>
                <div className={`${countriesPerPage === 100 ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(100)}>100 per page</div>
                <div className={`${countriesPerPage === countries.length ? "show__active show" : "show"}`} onClick={() => setCountriesPerPage(countries.length)}>show all</div>
            </div>
        </>
  )
}

export default Pagination