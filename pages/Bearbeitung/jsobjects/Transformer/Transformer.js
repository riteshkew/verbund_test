export default {
	processedData : null,
	transformedData : null,

	fromQubicMToKWh(quibicMeter){
		return quibicMeter*10
	},

	fromLToKWh (I){
		return I*9
	},

	calculateKWhM2(averageKWh, BeheizteFlaeche){
		if(averageKWh === 0 || averageKWh === null || averageKWh === undefined){
			return null
		}
		if(BeheizteFlaeche === 0 || BeheizteFlaeche === null ||  averageKWh === undefined){
			return null
		}
		return Math.round((averageKWh / BeheizteFlaeche) * 1000)/1000
	},

	//39 Durchschnitt Heizenergiemenge (in kWh/Jahr) Average amount of heating energy (in kWh)
	calculateAverageHeating(periods){
		let preProcessed = periods

		if(Form.formData.Einheiten === "l"){
			preProcessed = periods.map(el => this.fromLToKWh(el))
		}

		if(Form.formData.Einheiten === "m3"){
			preProcessed = periods.map(el => this.fromQubicMToKWh(el))
		}

		const normalized = preProcessed.filter((el) => el !== 0)
		if(normalized.length === 0){
			return 0
		}
		const sum = normalized.reduce((acc, num) => acc + num, 0);
		const average = sum / normalized.length;
		return (Math.round(average * 1000) / 1000)
	},

	replaceJaNein(obj, key){
		if(obj.hasOwnProperty(key)){
			if(obj[key] === "yes" || obj[key] === "ja"){
				obj[key] = "J"
				return
			}
			if(obj[key] === "no" || obj[key] === "nein"){
				obj[key] = "N"
				return
			}
		}
	},

	replaceKey(obj, oldKey, newKey) {
		// Check if the object has the oldKey
		if (obj.hasOwnProperty(oldKey)) {
			// Create a new property with the newKey and assign the value of the oldKey
			obj[newKey] = obj[oldKey];
			// Delete the oldKey if needed
			delete obj[oldKey];
		}
		return obj
	},

	preprocessCurrentUser(){
		let dataToProcess = {...appsmith.store.currentCustomer}
		
		if(appsmith.store.currentCustomer.Erstellt !== undefined){
			let formattedDate = new Date(dataToProcess.Erstellt).toISOString().replace('T', ' ').replace('Z', '');
			dataToProcess.Erstellt = formattedDate
			this.replaceKey(dataToProcess, 'Erstellt', 'beantragtAm')
		}
		
		if(appsmith.store.currentCustomer.beantragtAm !== undefined){
			let formattedDate = new Date(dataToProcess.beantragtAm).toISOString().replace('T', ' ').replace('Z', '');
			dataToProcess.beantragtAm = formattedDate
		}

		if(appsmith.store.currentCustomer.PLZ === undefined){
			this.replaceKey(dataToProcess, 'Postleitzahl', 'PLZ')
		}
		
		this.replaceJaNein(dataToProcess, "Newsletter")
		return dataToProcess
	},

	preprocessForm(){
		let dataToProcess = {...Form.formData}
		
		if(Form.formData.Baujahr !== undefined){
			dataToProcess['Baujahr'] = Number.parseInt(dataToProcess['Baujahr'])
		}
		
		if(Form.formData.SanierungJahr !== undefined){
			dataToProcess['SanierungJahr'] = Number.parseInt(dataToProcess['SanierungJahr'])
		}
		return dataToProcess
	},
	
	filterUnrelated(mergedObj){
		return Object.fromEntries(Object.entries(mergedObj).filter(([_,val])=>(val !== null && val !== "" && _ !== 'id' &&  _ !== 'Id' &&  _ !== 'Terminvorschlag' &&  _ !== 'Anmerkungen'  && val !== undefined)))
	},
	
	cacheUser () {
		let currentUser = this.preprocessCurrentUser();
		// when sending an E-Mail, no comment should be present
		if(Kommentar.text === "" || Rueckruf.selectedOptionValue === "Kein"){
			let KundeNichtErreichtAm = new Date().toISOString().replace('T', ' ').replace('Z', '');
			// console.log("CHANGING CACHE USER", currentUser)
			let updateData = {'BearbeitetVon':appsmith.user.email, 'KundeNichtErreichtAm':KundeNichtErreichtAm}
			this.transformedData  = this.filterUnrelated({ ...currentUser, ...updateData })
			return
		}
		let commentData = {'BearbeitetVon':appsmith.user.email, 'Kommentar':Kommentar.text, 'RueckrufAngefordert':Rueckruf.selectedOptionValue}
		let mergedObj = this.filterUnrelated({ ...currentUser, ...commentData })
		this.transformedData = mergedObj
		return
	},
	

	processData () {
		let currentUser = this.preprocessCurrentUser();
		let processedFormData =  this.preprocessForm();
		let mergedObj = { ...currentUser, ...processedFormData }
		
		let contactedOn = new Date().toISOString().replace('T', ' ').replace('Z', '');
		mergedObj['BearbeitetVon'] = appsmith.user.email
		mergedObj['kontaktiertAm'] = contactedOn
		
		if(EligibilityChecker.rejectionReasons.length !== 0){
				mergedObj['Anspruch'] = "N"
				return this.filterUnrelated(mergedObj)
		}
		
		const averageKWh = this.calculateAverageHeating([
			Form.formData.JahresHeizenergiemengeN,
			Form.formData.JahresHeizenergiemengeN_1,
			Form.formData.JahresHeizenergiemengeN_2
		]) 
		
		const KWhM2 = this.calculateKWhM2(averageKWh, Form.formData.BeheizteFlaeche)
		const eligible = EligibilityChecker.checkComputedValues(averageKWh, KWhM2) ? "J" : "N"

		mergedObj['DurchschnittsenergieKWh'] = averageKWh !== null ? averageKWh : 0
		mergedObj['HeizlastwertKWhM2'] = KWhM2
		mergedObj['Anspruch'] = eligible
		

		let processed = this.filterUnrelated(mergedObj)
		return processed
	},

	saveData(){
		const data = this.processData()
		this.transformedData = data
		return data
	}
}