export default {
	fromQubicToKWh(quibicMeter){
		return quibicMeter*10
	},
	
	fromIToKWh (I){
		return I*9
	},

	//39 Durchschnitt Heizenergiemenge (in kWh/Jahr) Average amount of heating energy (in kWh)
	calculateAverageHeating(periods){
		const sum = periods.reduce((acc, num) => acc + num, 0);
		const average = sum / periods.length;
		return average
	},
}
