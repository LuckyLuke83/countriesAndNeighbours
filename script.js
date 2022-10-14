'use strict';

const countriesContainer = document.querySelector('.countries');
const neighbourContainer = document.querySelector('.neighbour_div');
const countriesDropdown = document.querySelector('#countries');

//neighbours 
let neighbours = [];

//Receiveing country list from api
const countriesList = async function () {
    try {
        const countriesAll = await fetch("https://restcountries.com/v3.1/all");

        // console.log(countriesAll);
        if (!countriesAll.ok) throw new Error('Problem getting location data');

        const data = await countriesAll.json();
        const countriesNames = data.map( country => country.name.common);

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
    
        //creating markup for dropdown
        const dropdownMarkup = `
        <option value="">---</option>
        ${countriesAll.map(el => `<option value="${el}">${el}</option>`).join('')}`

        countriesDropdown.innerHTML = dropdownMarkup;
        
    } catch (err) {
        throw err;
    }
}

countryDropdown();

countriesDropdown.addEventListener('change', function () {
const country = countriesDropdown.value;

//retrieving country data based on selected name
    const countryInfo = async function () {
        try {
            const countryData = await fetch(`https://restcountries.com/v3.1/name/${country}`);

            if (!countryData.ok) throw new Error('Problem getting data data');
            neighbours = [];
            const data = await countryData.json();
            const data1 = data[0];
            neighbours = data1.borders; 
            

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
            neighbourContainer.innerHTML = "";

            countriesContainer.insertAdjacentHTML('afterbegin', countrymarkup);
            countriesContainer.style.opacity = 1;

            //guard clause
            if (!neighbours) return;

            //rendering neighbours
            neighbours.forEach(async function (el) {
                const countryData = await fetch(`https://restcountries.com/v3.1/alpha/${el}`);
                
                const data = await countryData.json();
                const data1 = data[0];
                
                
                const neighbourMarkup = `<article class="country neighbour">
                <img class="neighbour__img" src="${data1.flags.png}" />
                <div class="neighbour__data">
                <h3 class="neighbour__name">${data1.name.common}</h3>
                <h4 class="neighbour__region">${data1.region}</h4>
                <p class="neighbour__row"><span>👫</span>${(
                    data1.population / 1000000
                ).toFixed(1)} mil</p>
                <p class="country__row"><span>🗣️</span>${
                    Object.values(data1.languages)[0]
                }</p>
                <p class="country__row"><span>💰</span>${[Object.keys(data1.currencies)]}</p>
                </div>
                </article>`

                neighbourContainer.insertAdjacentHTML('beforeend', neighbourMarkup);

            })


        } catch(err) {
            throw err;
        }
    }

    countryInfo();
})