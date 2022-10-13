'use strict';

const countriesContainer = document.querySelector('.countries');
const countriesDropdown = document.querySelector('.countries_dropdown');

//Receiveing country list from api

const countriesList = async function () {
    try {
        const countriesAll = await fetch("https://restcountries.com/v3.1/all");

        // console.log(countriesAll);
        if (!countriesAll.ok) throw new Error('Problem getting location data');

        const data = await countriesAll.json();
        // console.log(data);
        const countriesNames = data.map( country => country.name.common);
        // console.log(countriesNames);

        return countriesNames;
        
    } catch (err) {
        throw err;
    }
}

//create dropdown button with all countries 
const countryDropdown = async function () {
    try {
        //generating countries list
        const countriesAll = (await countriesList()).sort() 
        console.log(countriesAll)

        //creating options list 
        

        //creating markup for dropdown
        const dropdownMarkup = `<label for="countries">Choose a country:</label>
        <select name="countries" id="countries">
        ${countriesAll.map(el => `<option value="${el}">${el}</option>`).join('')}
        </select>`

        countriesDropdown.innerHTML = dropdownMarkup;


        
    } catch (err) {
        throw err;
    }
}


countryDropdown();

