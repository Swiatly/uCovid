const setDefualtDate = () => {
	document.getElementById('endDate').valueAsDate = new Date();
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);
	document.getElementById('startDate').valueAsDate = startDate;
};

const createChart = () => {
	const startDate = document.getElementById('startDate').value;
	const endDate = document.getElementById('endDate').value;
	const URL = `https://api.coronatracker.com/v5/analytics/newcases/country?countryCode=PL&startDate=${startDate}&endDate=${endDate}`;

	axios.get(URL).then((res) => {
		console.log(res.data);
	});
};

setDefualtDate();
