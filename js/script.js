// Skapa button och lägg som addeventlistener
const btn = document.querySelector('#button-enter');
btn.addEventListener('click', searchLanguage);

let populationarray = [];

//Ange function när man trycker på search
function searchLanguage(event) {
    event.preventDefault();

    const input = document.querySelector('#language-input');

    const language = input.value;
    input.value = '';
    console.log(language);

    fetchLanguage(language);
}

//hämta url språk med function fetchLanguage
function fetchLanguage(lingual) {
    const url = `https://restcountries.com/v3.1/lang/${lingual}`

    console.log(url);

    fetch(url)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(displayInfo)
        .catch(handleError);
}
function handleError(error) {
    console.log(error);
    const errorP = document.querySelector('#error-message');
    errorP.innerText = 'Spelled wrong, try again 💩!';
}
// Visa upp infon till websidan 

function displayInfo(countrydata) {
    console.log(countrydata);
    document.querySelector('#container').innerHTML = '';

    countrydata.sort((objA, objB) => objB.population - objA.population); // sorterar från största till minsta // (objA,objB) = först element A & första elemenet B  då sedan ändrar man de man söker efter på objB.population-objA.population

    console.log(countrydata)


    for (let i = 0; i < countrydata.length; i++) {
        populationarray.push(countrydata[i].population); // Pushar fram populationen till en global  array som finns längst uppe som "populationarray"

        console.log(populationarray);

        const countryName = document.createElement('h1');
        document.querySelector('#container').appendChild(countryName);
        countryName.src = countrydata[i].name.common;
        countryName.innerText = "Name: " + (countrydata[i].name.common);

        const countryCapital = document.createElement('h2');
        document.querySelector('#container').appendChild(countryCapital);
        countryCapital.src = countrydata[i].capital;
        countryCapital.innerText = "Capital: " + (countrydata[i].capital);

        const countrySubRegion = document.createElement('p');
        document.querySelector('#container').appendChild(countrySubRegion);
        countrySubRegion.src = countrydata[i].subregion;
        countrySubRegion.innerText = "Sub-region: " + (countrydata[i].subregion);


        const countryPopulation = document.createElement('h3');
        document.querySelector('#container').appendChild(countryPopulation);
        countryPopulation.src = countrydata[i].population;
        countryPopulation.innerText = "Population: " + (countrydata[i].population);
        // "+" = addition operator sätts kallas för template literals

        const countryFlag = document.createElement('img');
        document.querySelector('#container').appendChild(countryFlag);
        countryFlag.src = countrydata[i].flags.png;

        const max = Math.max(...populationarray);
        const popColor = populationarray.indexOf(max)
        console.log(max);
        const populationAll = document.querySelectorAll('h3');
        populationAll[popColor].style.color = '#64ffda'
    }

    document.querySelector('#error-message').innerText = '';


}


