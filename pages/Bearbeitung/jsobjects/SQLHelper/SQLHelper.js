export default {
	async updateDatabase(){
		Transformer.saveData();
		// update only
		if(CustomerExist.data[0].count === 1){
			UpdateExistingCustomer.run().then(() => {
				showAlert("Daten erfolgreich gespeichert", "success");
				navigateTo('Home', {}, 'SAME_WINDOW');
			}).catch(() => {
				showAlert('Fehler mit Datenbank Speicherung', 'error');
			});
			return
		} 
		// if(appsmith.store.currentCustomer.formular_id === "manual"){
			// // update only
			// UpdateExistingCustomer.run().then(() => {
				// showAlert("Daten erfolgreich gespeichert", "success");
				// navigateTo('Home', {}, 'SAME_WINDOW');
			// }).catch(() => {
				// showAlert('Fehler mit Datenbank Speicherung', 'error');
			// });
			// return
		// }
		// create a new entry and update in the original sitecore database
		InsertCustomer.run().then(() => {
			showAlert("Daten erfolgreich gespeichert", "success");
			updateContactFormData.run().then(() => {
				navigateTo('Home', {}, 'SAME_WINDOW');
			});
		}).catch(() => {
			showAlert('Fehler mit Datenbank Speicherung', 'error');
		});
	},
	async cacheUser(){
		Transformer.cacheUser(); // this line is the difference to updateDatabase()
		if(CustomerExist.data[0].count === 1){
			UpdateExistingCustomer.run().then(() => {
				showAlert("Daten erfolgreich gespeichert", "success");
				navigateTo('Home', {}, 'SAME_WINDOW');
			}).catch(() => {
				showAlert('Fehler mit Datenbank Speicherung', 'error');
			});
			return
		} 
		// create a new entry and update in the original sitecore database
		InsertCustomer.run().then(() => {
			showAlert("Daten erfolgreich gespeichert", "success");
			updateContactFormData.run().then(() => {
				navigateTo('Home', {}, 'SAME_WINDOW');
			});
		}).catch(() => {
			showAlert('Fehler mit Datenbank Speicherung', 'error');
		});
	},
	buildInsertQuery(){
		return `(${Object.keys(Transformer.transformedData).join(", ")}) VALUES (${Object.values(Transformer.transformedData).map(el => (typeof el === 'number' ? `${el}` : `'${el}'`)).join(", ")})`
	},
	buildUpdateQuery(){
		let transformedData = Object.entries(Transformer.transformedData)
		let res = transformedData.map(el =>  `${el[0]} = ${typeof el[1] === 'number' ? el[1] : `'${el[1]}'`}`).join(", ")
		return res
	}
}