'use strict';

const countriesContainer = document.querySelector('.countries');
const countriesDropdown = document.querySelector('#countries');


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
        // console.log(countriesAll)

        //creating options list 
        

        //creating markup for dropdown
        const dropdownMarkup = `
        ${countriesAll.map(el => `<option value="${el}">${el}</option>`).join('')}`

        countriesDropdown.innerHTML = dropdownMarkup;
        
    } catch (err) {
        throw err;
    }
}


countryDropdown();

countriesDropdown.addEventListener('change', function () {
const country = countriesDropdown.value;

//retriuving country data based on selected name
    const countryInfo = async function () {
        try {
            const countryData = await fetch(`https://restcountries.com/v3.1/name/${country}`);

            if (!countryData.ok) throw new Error('Problem getting data data');

            const data = await countryData.json();
            const data1 = data[0];
            console.log(data1);

            //generating country tab
            const countrymarkup = `<article class="country">
            <img class="country__img" src="${data1.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${country}</h3>
              <h4 class="country__region">${data1.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data1.population / 1000000
              ).toFixed(1)} mil</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data1.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${[Object.keys(data1.currencies)]}</p>
                </div>
            </article>`

            //clearing container 
            countriesContainer.innerHTML = "";

            countriesContainer.insertAdjacentHTML('afterbegin', countrymarkup);
            countriesContainer.style.opacity = 1;

        } catch(err) {
            throw err;
        }
    }

    countryInfo();
})