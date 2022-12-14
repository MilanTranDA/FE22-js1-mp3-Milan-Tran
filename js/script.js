// Skapa button och lägg som addeventlistener
const btn = document.querySelector('#button-enter');
btn.addEventListener('click', searchLanguage);


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
                console.log(response.status);
                return response.json();
            }
        )
        .then(displayInfo)
        .catch(handleError);
}
function handleError() {
    const errorP = document.querySelector('#error-message');
    errorP.innerText = 'Spelled wrong, try again 💩!';
}
// Visa upp infon till websidan 

function displayInfo(countrydata) {
    console.log(countrydata);
    document.querySelector('#container').innerHTML = '';

    countrydata.sort((objA, objB) => objB.population - objA.population); // sorterar från största till minsta // (objA,objB) = först element A & första elemenet B  då sedan ändrar man de man söker efter på objB.population-objA.population

    // console.log(countrydata)


    for (let i = 0; i < countrydata.length; i++) {

        // console.log(populationarray);

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

      
        if(i === 0){
            countryPopulation.style.color = '#64ffda';
        }
        else {};
    }


    document.querySelector('#error-message').innerHTML = '';

}


