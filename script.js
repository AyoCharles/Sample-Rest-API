const searchBar = document.getElementById('search-bar');
const cardContainer = document.getElementById('card-container');

async function getCountries() {
    const response = await fetch('https://restcountries.com/v3.1/independent?status=true', {method: 'get'});
    // console.log(response, 'response');
    const data = await response.json()
    return data
}

const displayCountryData = async () => {
    let queryNation = searchBar.value;
    console.log(queryNation);

    const countryData = await getCountries();
    
    let displayData = countryData.filter((nation) => {
        if(queryNation === '') {
            return nation;
        } else if(nation.name.common.toLowerCase().includes(queryNation.toLowerCase())) {
            return nation;
        }
    }).map((object) => {
        // console.log(object);
        return `
        <div class="each-card">
        <div class="card-image">
            <img src=${object.flags.png} alt="img" class="images">
        </div>
        <div class="card-texts">
            <p><span style="display: block; font-weight: bold; margin-bottom: 1rem;">${object.name.common}</span><span style="display: block; margin-bottom: 0.3rem;">Population: ${object.population}</span><span style="display: block; margin-bottom: 0.3rem;">Region: ${object.continents}</span><span style="display: block; ">Capital: ${object.capital}</span></p>
        </div>
    </div> 
        `
    }).join('');
    cardContainer.innerHTML = displayData;

}

displayCountryData();

searchBar.addEventListener('input', () => {
    displayCountryData();
})


