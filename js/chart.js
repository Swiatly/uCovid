// let startDate
// let endDate = new

const setDefualtDate = () => {
	const todayDate = new Date();
	const yesterdayDate = new Date(todayDate);
	yesterdayDate.setDate(yesterdayDate.getDate() + 1);
	document.getElementById('endDate').valueAsDate = new Date(yesterdayDate);
	const startDate = new Date(yesterdayDate);
	startDate.setMonth(startDate.getMonth() - 1);
	document.getElementById('startDate').valueAsDate = startDate;
};

const createChartForPoland = () => {
	const startDate = document.getElementById('startDate').value;
	const endDate = document.getElementById('endDate').value;
	const URL = `https://api.coronatracker.com/v5/analytics/newcases/country?countryCode=PL&startDate=${startDate}&endDate=${endDate}`;

	axios.get(URL).then((res) => {
		const ctx = document.querySelector('#chartPL').getContext('2d');

		const labels = res.data.map((el) => el.last_updated.slice(0, 10));

		const newInfections = res.data.map((el) => el.new_infections);
		const newDeaths = res.data.map((el) => el.new_deaths);
		const newRecovered = res.data.map((el) => el.new_recovered);

		const data = {
			labels,
			datasets: [
				{
					data: newInfections,
					label: 'Nowe przypadki',
					backgroundColor: 'rgb(0, 119, 255)',
					borderColor: 'rgb(0, 191, 255)',
				},
				{
					data: newDeaths,
					label: 'Zgony',
					backgroundColor: 'rgb(255, 0, 0)',
					borderColor: 'rgb(247, 149, 149)',
				},
				{
					data: newRecovered,
					label: 'Uzdrowienia',
					backgroundColor: 'rgb(0, 133, 29)',
					borderColor: 'rgb(0, 189, 41)',
				},
			],
		};

		const config = {
			type: 'line',
			data: data,
			options: {
				responsive: true,
			},
		};

		const myChart = new Chart(ctx, config);
	});
};

const createChartForWorld = () => {
	const startDate = new Date(document.getElementById('startDate').value);
	const endDate = new Date(document.getElementById('endDate').value);
	const URL = `https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases`;

	axios.get(URL).then((res) => {
		const filteredData = res.data
			.filter((el) => {
				const date = new Date(el.lastUpdated);
				return date < endDate && date > startDate;
			})
			.reverse();
		const ctx = document.querySelector('#chartWorld').getContext('2d');

		const labels = filteredData.map((el) => el.lastUpdated.slice(0, 10));

		const totalInfections = filteredData.map((el) => el.totalConfirmed);
		const totalDeaths = filteredData.map((el) => el.totalDeaths);
		const totalRecovered = filteredData.map((el) => el.totalRecovered);

		let newInfections = [];
		let newDeaths = [];
		let newRecovered = [];

		totalInfections.forEach((el, index, array) => {
			newInfections.push(el - array[index - 1]);
		});

		totalDeaths.forEach((el, index, array) => {
			newDeaths.push(el - array[index - 1]);
		});

		totalRecovered.forEach((el, index, array) => {
			newRecovered.push(el - array[index - 1]);
		});

		const data = {
			labels,
			datasets: [
				{
					data: newInfections,
					label: 'Nowe przypadki',
					backgroundColor: 'rgb(0, 119, 255)',
					borderColor: 'rgb(0, 191, 255)',
				},
				{
					data: newDeaths,
					label: 'Zgony',
					backgroundColor: 'rgb(255, 0, 0)',
					borderColor: 'rgb(247, 149, 149)',
				},
				{
					data: newRecovered,
					label: 'Uzdrowienia',
					backgroundColor: 'rgb(0, 133, 29)',
					borderColor: 'rgb(0, 189, 41)',
				},
			],
		};

		const config = {
			type: 'line',
			data: data,
			options: {
				responsive: true,
			},
		};

		const myChart = new Chart(ctx, config);
	});
};

setDefualtDate();
createChartForPoland();
createChartForWorld();
