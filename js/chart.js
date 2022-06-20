const startDateInputPL = document.querySelector('#startDateCountry');
const endDateInputPL = document.querySelector('#endDateCountry');
const startDateInputWorld = document.querySelector('#startDateWorld');
const endDateInputWorld = document.querySelector('#endDateWorld');
const countrySelectforChart = document.getElementById('countries-select');

const setDefualtDate = (end, start) => {
	document.getElementById(end).valueAsDate = new Date();
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);
	document.getElementById(start).valueAsDate = startDate;
};

const createChartForSelectedCountry = () => {
	const getEndDate = document.getElementById('endDateCountry').value;
	const endDate = new Date(getEndDate);
	endDate.setDate(endDate.getDate() + 1);
	const finalEndDate = endDate.toISOString().slice(0, 10);

	const getStartDate = document.getElementById('startDateCountry').value;
	const startDate = new Date(getStartDate);
	startDate.setDate(startDate.getDate() - 1);
	const finalStartDate = startDate.toISOString().slice(0, 10);

	const countryCode =
		countrySelectforChart.options[countrySelectforChart.selectedIndex].value;
	const countryText =
		countrySelectforChart.options[countrySelectforChart.selectedIndex].text;

	const URL = `https://api.coronatracker.com/v5/analytics/newcases/country?countryCode=${countryCode}&startDate=${finalStartDate}&endDate=${finalEndDate}`;

	axios.get(URL).then((res) => {
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
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: `Wykres danych dla ${countryText}`,
					},
				},
			},
		};

		const chartBox = document.querySelector('.chart');
		let chart = document.getElementById('chartCountry');
		let newChart = document.createElement('canvas');
		newChart.setAttribute('id', 'chartCountry');
		chartBox.replaceChild(newChart, chart);

		const ctx = document.querySelector('#chartCountry').getContext('2d');
		const myChart = new Chart(ctx, config);
	});
};

const createChartForWorld = () => {
	const getStartDate = new Date(
		document.getElementById('startDateWorld').value
	);
	const startDate = new Date(getStartDate);
	startDate.setDate(startDate.getDate() - 2);
	const finalStartDate = new Date(startDate);

	const getEndDate = new Date(document.getElementById('endDateWorld').value);
	const endDate = new Date(getEndDate);
	endDate.setDate(endDate.getDate() + 1);
	const finalEndDate = new Date(endDate);

	const URL = `https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases`;

	axios.get(URL).then((res) => {
		const filteredData = res.data
			.filter((el) => {
				const date = new Date(el.lastUpdated);
				return date < finalEndDate && date > finalStartDate;
			})
			.reverse();

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

		const deleteFirstElement = (x) => {
			return x.shift();
		};

		deleteFirstElement(labels);
		deleteFirstElement(newInfections);
		deleteFirstElement(newDeaths);
		deleteFirstElement(newRecovered);

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
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Wykres danych dla Świata',
					},
				},
			},
		};

		const chartBox = document.querySelector('.chart-world');
		let chart = document.getElementById('chartWorld');
		let newChart = document.createElement('canvas');
		newChart.setAttribute('id', 'chartWorld');
		chartBox.replaceChild(newChart, chart);

		const ctx = document.querySelector('#chartWorld').getContext('2d');
		const myChart = new Chart(ctx, config);
	});
};

setDefualtDate('endDateCountry', 'startDateCountry');
setDefualtDate('endDateWorld', 'startDateWorld');
createChartForSelectedCountry();
createChartForWorld();

startDateInputPL.addEventListener('change', createChartForSelectedCountry);
endDateInputPL.addEventListener('change', createChartForSelectedCountry);
countrySelectforChart.addEventListener('change', createChartForSelectedCountry);
startDateInputWorld.addEventListener('change', createChartForWorld);
endDateInputWorld.addEventListener('change', createChartForWorld);
