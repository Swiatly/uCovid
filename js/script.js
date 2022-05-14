const dailyConfirmedPL = document.querySelector('.daily-confirmed-pl');
const dailyDeathsPL = document.querySelector('.daily-deaths-pl');
const activeCasesPL = document.querySelector('.active-cases-pl');
const totalConfirmedPL = document.querySelector('.total-confirmed-pl');
const totalDeathsPL = document.querySelector('.total-deaths-pl');

const dailyConfirmedWorld = document.querySelector('.daily-confirmed-world');
const dailyDeathsWorld = document.querySelector('.daily-deaths-world');
const activeCasesWorld = document.querySelector('.active-cases-world');
const totalConfirmedWorld = document.querySelector('.total-confirmed-world');
const totalDeathsWorld = document.querySelector('.total-deaths-world');

const URL = 'https://api.coronatracker.com/v3/stats/worldometer/global';
const URL_PL =
	'https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=PL';

const getStatsForPoland = () => {
	axios.get(URL_PL).then((res) => {
		dailyConfirmedPL.textContent = res.data[0].dailyConfirmed;
		dailyDeathsPL.textContent = res.data[0].dailyDeaths;
		activeCasesPL.textContent = res.data[0].activeCases;
		totalConfirmedPL.textContent = res.data[0].totalConfirmed;
		totalDeathsPL.textContent = res.data[0].totalDeaths;
	});
};

const getStatsForWorld = () => {
	axios.get(URL).then((res) => {
		dailyConfirmedWorld.textContent = res.data.totalNewCases;
		dailyDeathsWorld.textContent = res.data.totalNewDeaths;
		activeCasesWorld.textContent = res.data.totalActiveCases;
		totalConfirmedWorld.textContent = res.data.totalConfirmed;
		totalDeathsWorld.textContent = res.data.totalDeaths;
	});
};

getStatsForPoland();
getStatsForWorld();
