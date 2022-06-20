const dailyConfirmedCountry = document.querySelector('.daily-confirmed-country');
const dailyDeathsCountry = document.querySelector('.daily-deaths-country');
const activeCasesCountry = document.querySelector('.active-cases-country');
const totalConfirmedCountry = document.querySelector('.total-confirmed-country');
const totalDeathsCountry = document.querySelector('.total-deaths-country');

const dailyConfirmedWorld = document.querySelector('.daily-confirmed-world');
const dailyDeathsWorld = document.querySelector('.daily-deaths-world');
const activeCasesWorld = document.querySelector('.active-cases-world');
const totalConfirmedWorld = document.querySelector('.total-confirmed-world');
const totalDeathsWorld = document.querySelector('.total-deaths-world');

const countrySelectforInfo = document.getElementById('countries-select');
const countryLabel = document.querySelector('.country-text');
const countryIcon = document.querySelector('.country-icon');

const getStatsForCountry = () => {
	const countryCode =
		countrySelectforInfo.options[countrySelectforInfo.selectedIndex].value;
	const countryText =
		countrySelectforInfo.options[countrySelectforInfo.selectedIndex].text;
	countryIcon.setAttribute('src', `./icons/${countryText}.png`);
	countryLabel.textContent = countryText;

	const URL = `https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${countryCode}`;

	axios.get(URL).then((res) => {
		dailyConfirmedCountry.textContent = res.data[0].dailyConfirmed;
		dailyDeathsCountry.textContent = res.data[0].dailyDeaths;
		activeCasesCountry.textContent = res.data[0].activeCases;
		totalConfirmedCountry.textContent = res.data[0].totalConfirmed;
		totalDeathsCountry.textContent = res.data[0].totalDeaths;
	});
};

const getStatsForWorld = () => {
	const URL = 'https://api.coronatracker.com/v3/stats/worldometer/global';

	axios.get(URL).then((res) => {
		dailyConfirmedWorld.textContent = res.data.totalNewCases;
		dailyDeathsWorld.textContent = res.data.totalNewDeaths;
		activeCasesWorld.textContent = res.data.totalActiveCases;
		totalConfirmedWorld.textContent = res.data.totalConfirmed;
		totalDeathsWorld.textContent = res.data.totalDeaths;
	});
};

getStatsForCountry();
getStatsForWorld();

countrySelectforInfo.addEventListener('change', getStatsForCountry);
