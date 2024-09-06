export default {
	myVar1: [],
	myVar2: {},
	checkAgainstCriteria(el){

		switch(el.label){
			case "id":
				return false
				break;
			case "formular_id":
				return false
				break;
			case "JahresHeizenergiemengeN":
				return false
				break;
			case "JahresHeizenergiemengeN_1":
				return false
				break;
			case "JahresHeizenergiemengeN_2":
				return false
				break;
			case "JahresHeizenergiemengeN_2":
				return false
				break;
			case "HeizlastwertKWhM2":
				return false
				break;
			case "Einheiten":
				return false
				break;
			case "Rueckmeldung":
				return false
				break;
			case "beantragtAm":
				return false
				break;
			case "kontaktiertAm":
				return false
				break;
			case "anPartnerGesendetAm":
				return false
				break;
			case "EntscheidungGesendetAm":
				return false
				break;
			case "Anspruch":
				return false
				break;
			case "Vorlauftemperatur":
				return false
				break;
			case "BeheizteFlaeche":
				return false
				break;
			case "Heizkreise":
				return false
				break;
			case "DurchschnittsenergieKWh":
				return false
				break;
			default:
				return true
				break;
		}

	},
	filterData(){
		let recieved = Object.entries(getCustomer.data[0]).map( (el) =>{ return  {'label': el[0], 'value': el[1] } })
		let filtered = recieved.filter((el) =>  this.checkAgainstCriteria(el))
		return filtered
	}

}